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
INSERT INTO events (name, description, agenda, host_id) VALUES
  ('Annual Sales Conference', 'Join us for our annual sales conference to learn about the latest industry trends and techniques.', '1. Keynote presentation by industry experts\n2. Panel discussion with sales leaders\n3. Breakout sessions on sales strategies\n4. Networking opportunities', 1),
  ('Product Launch Party', 'Celebrate the launch of our latest product with food, drinks, and music!', '1. Product demo and presentation\n2. Live music from local band\n3. Open bar and oeuvres\n4. Networking and mingling', 2),
  ('Charity Auction', 'Support a good cause and bid on unique items donated by our generous sponsors.', '1. Silent auction with one-of-a-kind items\n2. Live auction with luxury packages\n3. Raffle drawing with prizes\n4. Dinner and drinks', 3),
  ('Industry Mixer', 'Connect with other professionals in your industry and expand your network.', '1. Introductions and icebreakers\n2. Speed networking sessions\n3. Roundtable discussions on industry topics\n4. Happy hour with drinks and appetizers', 4),
  ('Company Picnic', 'Bring your family and join us for a day of fun and games in the sun!', '1. BBQ lunch with all the fixings\n2. Games and activities for all ages\n3. Team-building exercises and competitions\n4. Prizes and giveaways', 5),
  ('Holiday Party', 'Celebrate the end of the year with your colleagues and enjoy a festive evening!', '1. Cocktail hour with holiday-themed drinks\n2. Dinner and dessert buffet\n3. DJ and dancing\n4. Photo booth and props', 1),
  ('Startup Pitch Night', 'Watch up-and-coming startups pitch their ideas to a panel of expert judges.', '1. Pitch presentations by startup founders\n2. Q&A session with judges\n3. Networking with entrepreneurs and investors\n4. After-party with drinks and snacks', 2),
  ('Women in Business Luncheon', 'Celebrate and empower women in business with a networking luncheon.', '1. Keynote speech by prominent female business leader\n2. Panel discussion with successful women in various industries\n3. Lunch and dessert buffet\n4. Networking and mentoring', 3),
  ('Summer Beach Bash', 'Escape the office and head to the beach for a day of fun in the sun!', '1. Bus transportation to the beach\n2. Beach games and activities\n3. Picnic lunch with sandwiches and snacks\n4. Beach volleyball tournament', 4),
  ('Leadership Retreat', 'Join us for a weekend of reflection, learning, and team-building in a scenic location.', '1. Workshops on leadership and management\n2. Team-building exercises and challenges\n3. Outdoor activities like hiking and kayaking\n4. Campfire and smores', 5);

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
  (3, 1),
  (2, 3),
  (3, 2),
  (1, 4),
  (4, 1),
  (2, 4),
  (4, 2);

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
