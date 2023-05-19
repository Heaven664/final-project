const express = require('express');
const multer = require('multer');
const bcrypt = require("bcryptjs");
const path = require('path');

const router = express.Router();

const userQueries = require('../db/queries/users');

// Error handling middleware for Multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer error occurred (e.g., file size exceeded)
    return res.status(400).json({ error: err.message });
  }

  next(err);
});

// Configure multer storage
const storage = multer.diskStorage({
  destination: 'public/images',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalExt = path.extname(file.originalname);
    const filename = uniqueSuffix + originalExt;
    cb(null, filename);
  }
});

// Function to check if a file is an image
const isImage = (file) => {
  const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const fileExt = path.extname(file.originalname).toLowerCase();
  return acceptedExtensions.includes(fileExt);
};

// Configure Multer upload with file filter
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (isImage(file)) {
      cb(null, true); // Accept the file
    } else {
      cb(new multer.MulterError('Invalid file type. Only image files are allowed.')); // Reject the file with a MulterError
    }
  }
});

// Create user
router.post('/', (req, res) => {
  // Get data from request
  const { first_name, last_name, email, password, country, city, birthday, photo, about } = req.body;
  // Hash password
  const hashed_password = bcrypt.hashSync(password, 10);
  // Create User
  userQueries
    .create(first_name, last_name, email, hashed_password, country, city, birthday, photo, about)
    .then((user) => res.json(user))
    .catch(error => {
      res
        .status(500)
        .json({ message: 'Error creating user', error: error.message });
    });
});

// Read all users
router.get('/', (req, res) => {
  userQueries
    .getAll()
    .then(users => res.json(users))
    .catch(error => {
      res
        .status(500)
        .json({ message: 'Error reading users', error: error.message });
    });
});

// Read one user
router.get('/:id', (req, res) => {
  userQueries
    .getById(req.params.id)
    .then(user => {
      // If  user not found
      if (!user) {
        return res.json("User not found");
      }
      return res.json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'Error reading user', error: error.message });
    });
});

// Update user
router.patch('/:id/edit', (req, res) => {
  // Get data from request
  const { first_name, last_name, country, city, birthday, about } = req.body;

  // Update user
  const id = req.params.id;
  userQueries
    .update(id, first_name, last_name, country, city, birthday, about)
    .then(user => res.json(user))
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .json({ message: 'Error updating user', error: error.message });
    });
});

// Delete user
router.delete('/:id/delete', (req, res) => {
  const { id } = req.params;
  // Search for the user
  userQueries
    .getById(id)
    .then(user => {
      // If users not found
      if (!user) {
        return res.status(404).json("User not found");
      }
      // Remove user
      return userQueries.remove(id);
    })
    .then(() => res.status(204).json())
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error deleting user', error: err.message });
    });
});


router.put('/:id/update-photo', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const baseURL = 'http://localhost:8080/images/';

  // If Multer encountered an error during file upload, handle it
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError.message });
  }

  // Handle other errors related to file upload or processing
  if (req.file === undefined) {
    return res.status(400).json({ error: 'No file received' });
  }

  const newImagePath = baseURL + req.file.filename;
  userQueries
    .updateAvatar(id, newImagePath)
    .then(() => {
      res.status(200).json({ message: 'Image uploaded successfully' });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Could not update user image', error: err.message });
    });
});

module.exports = router;