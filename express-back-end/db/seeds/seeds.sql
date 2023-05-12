I-- Users table
INSERT INTO users (first_name, last_name, email, password_digest, counrty, city, birthday, photo, about)
VALUES
  ('John', 'Doe', 'john.doe@email.com', 'password123', 'Canada', 'Richmond', '1990-01-01', 'https://i.imgur.com/3tVgsra.jpg', 'I am a software engineer.'),
  ('Jane', 'Doe', 'jane.doe@email.com', 'password456', 'United States', 'Los Angeles', '1992-05-20', 'https://i.imgur.com/Nmx0Qxo.png', 'I am a graphic designer.'),
  ('Sylvia', 'Palmer', 'Sylvia@email.com', 'password246', 'Canada', 'Vancouver', '1994-11-24', 'https://i.imgur.com/LpaY82x.png', 'Love to hiking with my dog');

-- Events table
INSERT INTO events (name, description, host_id)
VALUES
  ('Birthday Party at beach', 'We gonna have a dinner at Cactus club then play poker at English bay!', 1),
  ('Pool party', 'Summer is coming! Have a cool and nice party at pool 🥳', 2),
  ('Potluck party', 'Bring your own dish, we gonna share the foods 🤩', 3);

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
  (1, 1, "Don't forget to bring your wallets for the charity auction!", '2023-05-15 12:00:00'),
  (2, 1, "Thank you for remind it", '2023-05-15 12:00:00'),
  (2, 2, 'Looking forward to meeting everyone at the party!', '2023-05-20 18:00:00');
