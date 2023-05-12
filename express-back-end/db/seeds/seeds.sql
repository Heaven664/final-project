-- Users table
INSERT INTO users (first_name, last_name, email, password_digest, counrty, city, birthday, photo, about)
VALUES
  ('John', 'Doe', 'john.doe@example.com', 'password123', 'United States', 'New York', '1990-01-01', '/path/to/photo.jpg', 'I am a software engineer.'),
  ('Jane', 'Doe', 'jane.doe@example.com', 'password456', 'United States', 'Los Angeles', '1992-05-20', '/path/to/another_photo.jpg', 'I am a graphic designer.');

-- Events table
INSERT INTO events (name, description, host_id)
VALUES
  ('Charity Auction', 'An auction to raise funds for a local charity', 1),
  ('Networking Event', 'A networking event for professionals in the tech industry', 2);

-- Fundraisers table
INSERT INTO fundraisers (event_id, target_amount, current_amount)
VALUES
  (1, 10000, 5000),
  (2, 5000, 2000);

-- Event_user table
INSERT INTO event_user (user_id, event_id)
VALUES
  (1, 1),
  (2, 1),
  (2, 2);

-- Friendlists table
INSERT INTO friendlists (user_id, friend_id)
VALUES
  (1, 2),
  (2, 1);

-- Private_messages table
INSERT INTO private_messages (sender_id, receiver_id, text, time)
VALUES
  (1, 2, 'Hey Jane, how are you doing?', '2023-05-12 10:00:00'),
  (2, 1, 'I am good, thanks for asking!', '2023-05-12 10:05:00');

-- Group_messages table
INSERT INTO group_messages (sender_id, event_id, text, time)
VALUES
  (1, 1, 'Dont forget to bring your wallets for the charity auction!', '2023-05-15 12:00:00'),
  (2, 2, 'Looking forward to meeting everyone at the networking event!', '2023-05-20 18:00:00');
