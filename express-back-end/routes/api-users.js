const express = require('express');
const bcrypt = require("bcryptjs");
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

const router = express.Router();

const userQueries = require('../db/queries/users');


// Check if file extension is allowed
const isValid = (file) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'];
  const originalExt = path.extname(file.originalname).toLowerCase();
  return allowedExtensions.includes(originalExt);
};

// Configure storage and customize filename 
const storage = multer.diskStorage({
  destination: 'public/images'
  , filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalExt = path.extname(file.originalname);
    const newFileName = uniqueSuffix + originalExt;
    cb(null, newFileName);
  }
}
);

// Configure Multer upload storage and filter
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (isValid(file)) {
      cb(null, true);
    } else {
      cb(null, false);
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


router.patch('/:id/update-photo', upload.single('image'), (req, res) => {
  const { id } = req.params;

  if (!req.file) {
    return res.status(400).json({ message: 'Violation of file upload rules' });
  }

  sharp(req.file.path, { failOnError: false })
    .resize(200, 200)
    .withMetadata()
    .toFile(
      path.resolve('public/thumbs', req.file.filename)
    )
    .then(() => {
      userQueries
        .updateAvatar(id, req.file.filename)
        .then(() => {
          res.status(200).json({ message: 'Image uploaded successfully' });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: 'Could not update user image', error: err.message });
        });
    });
});

module.exports = router;