-- Users table
INSERT INTO users (first_name, last_name, email, password_digest, country, city, birthday, photo, about)
VALUES
  ('John', 'Doe', 'john.doe@example.com', 'password123', 'United States', 'New York', '1990-01-01', '/path/to/photo.jpg', 'I am a software engineer.'),
  ('Jane', 'Doe', 'jane.doe2@example.com', 'password456', 'United States', 'Los Angeles', '1992-05-20', '/path/to/another_photo.jpg', 'I am a graphic designer.'),
  ('Alice', 'Johnson', 'alice@example.com', 'password123', 'United States', 'New York', '1990-05-01', 'https://example.com/alice.jpg', 'I love hiking and trying new restaurants!'),
  ('Bob', 'Smith', 'bob@example.com', 'password456', 'Canada', 'Toronto', '1985-11-18', 'https://example.com/bob.jpg', 'I''m a software engineer and I enjoy playing basketball.'),
  ('Charlie', 'Brown', 'charlie@example.com', 'password789', 'United Kingdom', 'London', '1995-02-14', 'https://example.com/charlie.jpg', 'I''m a student and I love traveling.'),
  ('David', 'Lee', 'david@example.com', 'password123', 'Australia', 'Sydney', '1987-07-10', 'https://example.com/david.jpg', 'I''m a chef and I love experimenting with new recipes.'),
  ('Emma', 'Davis', 'emma@example.com', 'password456', 'United States', 'San Francisco', '1992-09-03', 'https://example.com/emma.jpg', 'I''m a writer and I love reading books.'),
  ('Frank', 'Johnson', 'frank@example.com', 'password789', 'Australia', 'Melbourne', '1998-04-22', 'https://example.com/frank.jpg', 'I''m a photographer and I love taking pictures of nature.'),
  ('Grace', 'Chen', 'grace@example.com', 'password123', 'China', 'Beijing', '1991-01-08', 'https://example.com/grace.jpg', 'I''m a teacher and I love spending time with my students.'),
  ('Henry', 'Kim', 'henry@example.com', 'password456', 'South Korea', 'Seoul', '1989-06-15', 'https://example.com/henry.jpg', 'I''m a musician and I love playing the piano.'),
  ('Isabel', 'Garcia', 'isabel@example.com', 'password789', 'Spain', 'Madrid', '1993-12-11', 'https://example.com/isabel.jpg', 'I''m a graphic designer and I love creating visual designs.'),
  ('Jack', 'Wang', 'jack@example.com', 'password123', 'China', 'Shanghai', '1988-03-27', 'https://example.com/jack.jpg', 'I''m a businessman and I love exploring new markets.');

-- Events table
INSERT INTO events (name, description, agenda, host_id)
VALUES
  ('Charity Auction', 'An auction to raise funds for a local charity','123', 1),
  ('Networking Event', 'A networking event for professionals in the tech industry','123', 2),
  ('Charity Run', 'Raise money for a good cause and enjoy a scenic run!','123', 3),
  ('Hiking Trip', 'Explore the great outdoors and challenge yourself with a hike!','123', 4),
  ('Movie Night', 'Watch a classic movie on the big screen with friends!','123', 1),
  ('Karaoke Party', 'Sing your heart out and have a blast with friends!','123', 5),
  ('Wine Tasting', 'Sample a variety of delicious wines and learn about the production process!','123', 6),
  ('Art Exhibition', 'Admire beautiful artworks and meet the talented artists!','123', 7),
  ('Book Club Meeting', 'Discuss the latest best-seller with fellow book lovers!','123', 8),
  ('Cooking Class', 'Learn how to cook a gourmet meal and impress your friends!','123', 9);
-- Fundraisers table
INSERT INTO fundraisers (event_id, target_amount, current_amount)
VALUES
  (1, 10000, 5000),
  (2, 5000, 2000),
  (3, 7500, 3000),
  (4, 2000, 1000),
  (5, 15000, 12500),
  (6, 5000, 1500),
  (7, 3000, 2000),
  (8, 8000, 5500),
  (9, 10000, 8500),
  (10, 500, 0);

-- Event_user table
INSERT INTO event_user (user_id, event_id)
VALUES
  (1, 1),
  (2, 1),
  (2, 2),
  (3, 1),
  (4, 2),
  (5, 2),
  (6, 2),
  (7, 3),
  (8, 3),
  (9, 4),
  (10, 5);

-- Friendlists table
INSERT INTO friendlists (user_id, friend_id)
VALUES
  (1, 2),
  (2, 1),
  (1, 3),
  (2, 4),
  (3, 5),
  (4, 6),
  (5, 6),
  (6, 7),
  (7, 8),
  (9, 10),
  (10, 1);

-- Private_messages table
INSERT INTO private_messages (sender_id, receiver_id, text, time)
VALUES
  (1, 2, 'Hey Jane, how are you doing?', '2023-05-12 10:00:00'),
  (2, 1, 'I am good, thanks for asking!', '2023-05-12 10:05:00'),
  (1, 2, 'I am doing well too. What are you up to today?', '2022-01-01 12:10:00'),
  (2, 1, 'Not much, just working on some programming projects. How about you?', '2022-01-01 12:15:00'),
  (1, 2, 'Same here! What kind of projects are you working on?', '2022-01-01 12:20:00'),
  (2, 1, 'I am working on a machine learning model for predicting stock prices. How about you?', '2022-01-01 12:25:00'),
  (1, 3, 'Hey, how is the event going?', '2022-01-02 13:00:00'),
  (3, 1, 'It is going great, thanks for asking! We have a lot of attendees and everything is running smoothly. How about you?', '2022-01-02 13:05:00'),
  (1, 3, 'That is good to hear! What kind of activities do you have planned?', '2022-01-02 13:10:00'),
  (3, 1, 'We have a variety of activities, including workshops, panels, and networking events. It should be a fun and productive day!', '2022-01-02 13:15:00'),
  (2, 4, 'Hey, did you get a chance to look at the code I sent you?', '2022-01-03 14:00:00'),
  (4, 2, 'Yes, I did! I think it looks good overall, but there are a few small issues that we should fix before we deploy it. I can send you some feedback later today.', '2022-01-03 14:05:00'),
  (2, 4, 'Great, thanks! Let me know if you need any help addressing those issues.', '2022-01-03 14:10:00'),
  (4, 2, 'Will do, thanks for offering! I will send you an updated version of the code once I have made the changes.', '2022-01-03 14:15:00'),
  (5, 6, 'Hey, do you have any recommendations for a good book to read?', '2022-01-04 15:00:00'),
  (6, 5, 'Yes, I just finished reading "The Power of Now" by Eckhart Tolle and I highly recommend it. What kind of book are you in the mood for?', '2022-01-04 15:05:00'),
  (5, 6, 'I am in the mood for something inspiring and thought-provoking. "The Power of Now" sounds great, I will check it out. Thanks for the recommendation!', '2022-01-04 15:10:00');




-- Group_messages table
INSERT INTO group_messages (sender_id, event_id, text, time)
VALUES
  (1, 1, 'Dont forget to bring your wallets for the charity auction!', '2023-05-15 12:00:00'),
  (2, 2, 'Looking forward to meeting everyone at the networking event!', '2023-05-20 18:00:00'),
  (1, 2, 'Hey, is everyone excited for the event next week?', '2023-05-10 12:00:00'),
  (2, 2, 'Yes, can''t wait!', '2023-05-10 12:01:00'),
  (3, 2, 'I''m not sure if I can make it :(', '2023-05-10 12:02:00'),
  (4, 2, 'We''ll miss you if you can''t come!', '2023-05-10 12:03:00'),
  (5, 1, 'What do you think of the new venue?', '2023-05-09 15:00:00'),
  (6, 1, 'It looks great, but I heard there might be issues with parking.', '2023-05-09 15:01:00'),
  (7, 1, 'I can help shuttle people from the parking lot if needed.', '2023-05-09 15:02:00'),
  (8, 1, 'That would be awesome, thanks!', '2023-05-09 15:03:00'),
  (9, 3, 'Who wants to grab drinks after the event tonight?', '2023-05-11 20:00:00'),
  (10, 3, 'I''m in!', '2023-05-11 20:01:00'),
  (1, 3, 'Me too!', '2023-05-11 20:02:00'),
  (2, 3, 'I have another commitment, sorry!', '2023-05-11 20:03:00'),
  (3, 4, 'Has anyone seen my jacket?', '2023-05-12 08:00:00'),
  (4, 4, 'I haven''t seen it, sorry.', '2023-05-12 08:01:00'),
  (5, 4, 'I think I saw it by the coat rack earlier.', '2023-05-12 08:02:00'),
  (6, 4, 'Found it! Thanks.', '2023-05-12 08:03:00'),
  (7, 5, 'Just a reminder that our meeting is at 2pm tomorrow.', '2023-05-13 10:00:00'),
  (8, 5, 'Thanks for the reminder.', '2023-05-13 10:01:00'),
  (9, 5, 'See you all there!', '2023-05-13 10:02:00'),
  (10, 5, 'I might be a few minutes late, but I''ll try to be there on time.', '2023-05-13 10:03:00');
