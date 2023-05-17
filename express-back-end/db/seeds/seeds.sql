-- Users table
INSERT INTO users (first_name, last_name, email, password_digest, country, city, birthday, photo, about)
VALUES
  ('John', 'Doe', 'john.doe@example.com', 'password123', 'United States', 'New York', '1990-01-01', 'http://localhost:8080/images/user-image-1.jpg', 'I am a software engineer.'),
  ('Jane', 'Doe', 'jane.doe2@example.com', 'password456', 'United States', 'Los Angeles', '1992-05-20', 'http://localhost:8080/images/user-image-2.jpg', 'I am a graphic designer.'),
  ('Alice', 'Johnson', 'alice@example.com', 'password123', 'United States', 'New York', '1990-05-01', 'http://localhost:8080/images/user-image-3.jpg', 'I love hiking and trying new restaurants!'),
  ('Bob', 'Smith', 'bob@example.com', 'password456', 'Canada', 'Toronto', '1985-11-18', 'http://localhost:8080/images/user-image-4.jpg', 'I''m a software engineer and I enjoy playing basketball.'),
  ('Charlie', 'Brown', 'charlie@example.com', 'password789', 'United Kingdom', 'London', '1995-02-14', 'http://localhost:8080/images/user-image-5.jpg', 'I''m a student and I love traveling.'),
  ('David', 'Lee', 'david@example.com', 'password123', 'Australia', 'Sydney', '1987-07-10', 'http://localhost:8080/images/user-image-6.jpg', 'I''m a chef and I love experimenting with new recipes.'),
  ('Emma', 'Davis', 'emma@example.com', 'password456', 'United States', 'San Francisco', '1992-09-03', 'http://localhost:8080/images/user-image-7.jpg', 'I''m a writer and I love reading books.'),
  ('Frank', 'Johnson', 'frank@example.com', 'password789', 'Australia', 'Melbourne', '1998-04-22', 'http://localhost:8080/images/user-image-1.jpg', 'I''m a photographer and I love taking pictures of nature.'),
  ('Grace', 'Chen', 'grace@example.com', 'password123', 'China', 'Beijing', '1991-01-08', 'http://localhost:8080/images/user-image-1.jpg', 'I''m a teacher and I love spending time with my students.'),
  ('Henry', 'Kim', 'henry@example.com', 'password456', 'South Korea', 'Seoul', '1989-06-15', 'http://localhost:8080/images/user-image-1.jpg', 'I''m a musician and I love playing the piano.'),
  ('Isabel', 'Garcia', 'isabel@example.com', 'password789', 'Spain', 'Madrid', '1993-12-11', 'http://localhost:8080/images/user-image-1.jpg', 'I''m a graphic designer and I love creating visual designs.'),
  ('Jack', 'Wang', 'jack@example.com', 'password123', 'China', 'Shanghai', '1988-03-27', 'http://localhost:8080/images/user-image-1.jpg', 'I''m a businessman and I love exploring new markets.');

-- Events table
INSERT INTO events (name, description, agenda, event_date, event_location, host_id) 
VALUES 
('Annual Sales Conference', 'Join us for a day of learning and networking with industry experts', '8:00am - Registration and Breakfast, 9:00am - Keynote Speaker, 10:00am - Breakout Sessions, 12:00pm - Lunch, 1:00pm - Roundtable Discussions, 3:00pm - Closing Remarks', '2023-06-15', 'Grand Hotel', 1),
('Product Launch Party', 'Come celebrate the launch of our new product line with food, drinks, and giveaways', '6:00pm - Doors Open, 7:00pm - Presentation, 8:00pm - Raffle Drawing, 9:00pm - Live Music', '2023-06-21', 'City Hall Plaza', 2),
('Charity Fundraiser', 'Join us for an evening of entertainment and giving to benefit the local children hospital', '7:00pm - Cocktail Reception, 8:00pm - Silent Auction, 9:00pm - Live Auction, 10:00pm - Dancing', '2023-06-28', 'Country Club', 3),
('Employee Appreciation Day', 'We are taking the day to celebrate our hardworking staff with food, games, and prizes', '11:00am - Lunch, 12:00pm - Cornhole Tournament, 2:00pm - Office Trivia, 3:00pm - Raffle Drawing', '2023-07-06', 'Office Park', 1),
('Industry Conference', 'Join us for three days of learning, networking, and innovation with industry leaders', '8:00am - Registration and Breakfast, 9:00am - Keynote Speaker, 10:00am - Breakout Sessions, 12:00pm - Lunch, 1:00pm - Roundtable Discussions, 3:00pm - Closing Remarks', '2023-07-11', 'Convention Center', 2),
('Customer Appreciation Week', 'We are showing our customers some love with daily giveaways, discounts, and events', 'Monday - Free Coffee, Tuesday - Pop-up Shop, Wednesday - Customer Roundtable, Thursday - Free Lunch, Friday - Raffle Drawing', '2023-07-22', 'Multiple Locations', 3),
('Company Retreat', 'We are taking some time to bond and recharge with a weekend of team building and relaxation', 'Friday - Welcome Reception, Saturday - Hiking and Activities, Sunday - Brunch and Departure', '2023-08-04', 'Mountain Lodge', 1),
('Sales Training Workshop', 'Join us for a day of hands-on training and best practices for successful sales', '8:00am - Registration and Breakfast, 9:00am - Product Overview, 10:00am - Prospecting Strategies, 12:00pm - Lunch, 1:00pm - Closing Deals, 3:00pm - Role Playing Exercises', '2023-08-15', 'Training Center', 2),
('Sales Conference', 'Annual Sales Conference for the company', 'Review sales performance, set goals for next year', '2023-06-05', 'New York City', 1),
('Product Launch', 'Launch of new product line', 'Presentation of new products, Q&A with product experts', '2023-06-10', 'San Francisco', 2),
('Marketing Workshop', 'Marketing workshop for small business owners', 'Learn how to create effective marketing campaigns', '2023-06-12', 'Chicago', 3),
('Charity Fundraiser', 'Annual fundraiser for local charity', 'Dinner, auction, and entertainment to raise money for charity', '2023-06-15', 'Los Angeles', 4),
('Team Building Retreat', 'Team building retreat for company employees', 'Team-building exercises and workshops', '2023-06-20', 'Aspen, Colorado', 1),
('Tech Conference', 'Conference for technology enthusiasts', 'Keynote speeches and panel discussions on emerging technologies', '2023-06-25', 'Seattle', 2),
('Startup Pitch Day', 'Pitch day for startup founders', 'Startup founders pitch their ideas to investors', '2023-06-28', 'Austin, Texas', 3),
('Design Thinking Workshop', 'Workshop on design thinking for product development', 'Learn how to apply design thinking to create better products', '2023-07-01', 'Boston', 4),
('Leadership Summit', 'Leadership summit for senior executives', 'Keynote speeches and panel discussions on leadership strategies', '2023-07-05', 'New York City', 1),
('Environmental Conference', 'Conference on environmental sustainability', 'Panel discussions and presentations on sustainability practices', '2023-07-10', 'San Francisco', 2);

-- Fundraisers table
INSERT INTO fundraisers (title, event_id, target_amount, current_amount) VALUES
  ('Children''s Education Fundraiser', 1, 5000, 2500),
  ('Community Food Drive', 2, 10000, 750),
  ('Medical Research Campaign', 3, 15000, 0),
  ('Animal Shelter Renovation Project', 4, 8000, 400),
  ('Environmental Conservation Initiative', 5, 20000, 10000),
  ('Support for Homeless Veterans', 6, 3000, 500),
  ('Art Scholarship Program', 7, 6000, 2000),
  ('Disaster Relief Fund', 8, 25000, 15000),
  ('Youth Sports Equipment Drive', 9, 4000, 3000),
  ('Cancer Treatment Support', 10, 20000, 12000);

-- Event_user table
INSERT INTO event_user (user_id, event_id) VALUES
  (1, 1),(2, 1),(3, 1),(4, 1),(5, 1),(6, 1),(7, 1),(8, 1),(9, 1),(10, 1),
  (1, 2),(2, 2),(3, 2),(4, 2),(5, 2),(6, 2),(7, 6),(8, 6),(9, 6),(10, 6),
  (1, 3),(2, 3),(3, 3),(4, 3),(5, 3),(6, 3),(7, 7),(8, 7),(9, 7),(10, 7),
  (1, 4),(2, 4),(3, 4),(4, 4),(5, 4),(6, 4),(7, 4),(8, 8),(9, 8),(10, 8),
  (1, 5),(2, 5),(3, 9),(4, 5),(5, 5),(6, 5),(7, 5),(8, 9),(9, 5),(10, 9);

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
