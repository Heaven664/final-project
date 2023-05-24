-- Users table
INSERT INTO users (first_name, last_name, email, password_digest, country, city, birthday, photo, about)
VALUES
  ('John', 'Doe', 'john.doe@example.com', 'password123', 'United States', 'New York', '1990-01-01', 'user-image-1.jpg', 'I am a software engineer.'),
  ('Jane', 'Doe', 'jane.doe2@example.com', 'password456', 'United States', 'Los Angeles', '1992-05-20', 'user-image-2.jpg', 'I am a graphic designer.'),
  ('Alice', 'Johnson', 'alice@example.com', 'password123', 'United States', 'New York', '1990-05-01', 'user-image-3.jpg', 'I love hiking and trying new restaurants!'),
  ('Bob', 'Smith', 'bob@example.com', 'password456', 'Canada', 'Toronto', '1985-11-18', 'user-image-4.jpg', 'I''m a software engineer and I enjoy playing basketball.'),
  ('Charlie', 'Brown', 'charlie@example.com', 'password789', 'United Kingdom', 'London', '1995-02-14', 'user-image-5.jpg', 'I''m a student and I love traveling.'),
  ('David', 'Lee', 'david@example.com', 'password123', 'Australia', 'Sydney', '1987-07-10', 'user-image-6.jpg', 'I''m a chef and I love experimenting with new recipes.'),
  ('Emma', 'Davis', 'emma@example.com', 'password456', 'United States', 'San Francisco', '1992-09-03', 'user-image-7.jpg', 'I''m a writer and I love reading books.'),
  ('Frank', 'Johnson', 'frank@example.com', 'password789', 'Australia', 'Melbourne', '1998-04-22', 'boy5.jpg', 'I''m a photographer and I love taking pictures of nature.'),
  ('Grace', 'Chen', 'grace@example.com', 'password123', 'China', 'Beijing', '1991-01-08', 'girl1.jpg', 'I''m a teacher and I love spending time with my students.'),
  ('Henry', 'Kim', 'henry@example.com', 'password456', 'South Korea', 'Seoul', '1989-06-15', 'girl2.jpg', 'I''m a musician and I love playing the piano.'),
  ('Isabel', 'Garcia', 'isabel@example.com', 'password789', 'Spain', 'Madrid', '1993-12-11', 'girl3.jpg', 'I''m a graphic designer and I love creating visual designs.'),
  ('Jack', 'Wang', 'jack@example.com', 'password123', 'China', 'Shanghai', '1988-03-27', 'boy2.jpg', 'I''m a businessman and I love exploring new markets.'),
  ('Sakura', 'Tanaka', 'sakura.tanaka@example.com', 'password123', 'Japan', 'Tokyo', '1990-03-15', 'girl4.jpg', 'I love photography and traveling.'),
  ('Yuki', 'Kim', 'yuki.kim@example.com', 'password456', 'South Korea', 'Seoul', '1985-08-22', 'girl5.jpg', 'I enjoy playing the piano and cooking Korean food.'),
  ('Raj', 'Patel', 'raj.patel@example.com', 'password789', 'India', 'Mumbai', '1992-11-10', 'boy3.jpg', 'I am a software developer and love coding in my free time.'),
  ('Li', 'Chen', 'li.chen@example.com', 'password123', 'China', 'Beijing', '1993-06-18', 'girl6.jpg', 'I am a tea enthusiast and enjoy traditional Chinese music.'),
  ('Haruki', 'Nakamura', 'haruki.nakamura@example.com', 'password456', 'Japan', 'Osaka', '1988-02-05', 'boy4.jpg', 'I am a bookworm and love reading mystery novels.'),
  ('Ji-hye', 'Lee', 'ji-hye.lee@example.com', 'password789', 'South Korea', 'Busan', '1995-09-30', 'girl7.jpg', 'I am a professional dancer and teach dance classes in my free time.'),
  ('Wei', 'Liu', 'wei.liu@example.com', 'password123', 'China', 'Shanghai', '1991-07-20', 'boy1.jpg', 'I am a basketball player and play for my university team.'),
  ('Rina', 'Takahashi', 'rina.takahashi@example.com', 'password456', 'Japan', 'Kyoto', '1987-04-12', 'girl8.jpg', 'I am a nature lover and enjoy hiking in the mountains.'),
  ('Aarav', 'Sharma', 'aarav.sharma@example.com', 'password789', 'India', 'New Delhi', '1994-12-08', 'boy6.jpg', 'I am a music producer and compose electronic music.'),
  ('Mei', 'Wong', 'mei.wong@example.com', 'password123', 'China', 'Guangzhou', '1990-01-25', 'girl9.jpg', 'I am a fashion designer and have my own clothing line.');

-- Events table
INSERT INTO events (name, description, agenda, event_date, event_location, host_id) 
VALUES 
('Annual Sales Conference', 'Join us for a day of learning and networking with industry experts', '8:00am - Registration and Breakfast, 9:00am - Keynote Speaker, 10:00am - Breakout Sessions, 12:00pm - Lunch, 1:00pm - Roundtable Discussions, 3:00pm - Closing Remarks', '2023-05-15 09:00:00', 'Grand Hotel', 1),
('Light House Web Development Demo Day', 'Join us for an exciting web development demo day!', '10:00 AM - Registration and Networking, 11:00 AM - Keynote Speech, 12:00 PM - Lunch Break, 1:00 PM - Project Presentations, 3:00 PM - Q&A Session', '2023-05-25 12:00:00-07:00', 'Vancouver, BC', 1),
('Light House Web Development Demo Day', 'Join us for an exciting web development demo day!', '10:00 AM - Registration and Networking, 11:00 AM - Keynote Speech, 12:00 PM - Lunch Break, 1:00 PM - Project Presentations, 3:00 PM - Q&A Session', '2023-05-25 12:00:00-07:00', 'Calgary, AB', 2),
('Company Retreat', 'We are taking some time to bond and recharge with a weekend of team building and relaxation', 'Friday - Welcome Reception, Saturday - Hiking and Activities, Sunday - Brunch and Departure', '2023-05-25 21:45:00', 'Mountain Lodge', 1),
('Sales Training Workshop', 'Join us for a day of hands-on training and best practices for successful sales', '8:00am - Registration and Breakfast, 9:00am - Product Overview, 10:00am - Prospecting Strategies, 12:00pm - Lunch, 1:00pm - Closing Deals, 3:00pm - Role Playing Exercises', '2023-05-26 18:45:00', 'Training Center', 1),
('Sales Conference', 'Annual Sales Conference for the company', 'Review sales performance, set goals for next year', '2023-05-27 15:45:00', 'New York City', 1),
('Product Launch', 'Launch of new product line', 'Presentation of new products, Q&A with product experts', '2023-06-10 18:45:00', 'San Francisco', 1),
('Marketing Workshop', 'Marketing workshop for small business owners', 'Learn how to create effective marketing campaigns', '2023-06-12 18:45:00', 'Chicago', 2),
('Charity Fundraiser', 'Annual fundraiser for local charity', 'Dinner, auction, and entertainment to raise money for charity', '2023-05-15 18:45:00', 'Los Angeles', 2),
('Team Building Retreat', 'Team building retreat for company employees', 'Team-building exercises and workshops', '2023-05-21 18:45:00', 'Aspen, Colorado', 2),
('Tech Conference', 'Conference for technology enthusiasts', 'Keynote speeches and panel discussions on emerging technologies', '2023-06-25 18:45:00', 'Seattle', 2),
('Lighthouse Labs Workshop', 'Join us for an interactive workshop on web development.', '10:00 AM - Introduction to HTML, 11:30 AM - CSS Basics, 1:00 PM - JavaScript Fundamentals', '2023-05-16 10:00:00-07:00', 'Anywhere in Canada', 3),
('Lighthouse Labs Hackathon', 'Participate in an exciting hackathon and showcase your coding skills.', '9:00 AM - Team Registration, 10:00 AM - Project Kickoff, 12:00 PM - Lunch Break, 6:00 PM - Project Presentations', '2023-05-18 09:00:00-07:00', 'Anywhere in Canada', 3),
('Lighthouse Labs Networking Event', 'Network with industry professionals and expand your connections.', '6:00 PM - Registration and Networking, 7:00 PM - Guest Speaker, 8:00 PM - Socializing', '2023-05-20 18:00:00-07:00', 'Anywhere in Canada', 3),
('Lighthouse Labs Career Fair', 'Connect with top tech companies and explore job opportunities.', '1:00 PM - Registration, 2:00 PM - Company Booths, 4:00 PM - Resume Reviews', '2023-05-22 13:00:00-07:00', 'Anywhere in Canada', 3),
('Lighthouse Labs Webinar Series', 'Attend informative webinars on the latest trends in web development.', '12:00 PM - Web Accessibility, 2:00 PM - Responsive Design, 4:00 PM - SEO Basics', '2023-05-24 12:00:00-07:00', 'Anywhere in Canada', 2),
('Lighthouse Labs Coding Competition', 'Participate in a coding competition and win exciting prizes.', '9:00 AM - Contest Begins, 12:00 PM - Lunch Break, 3:00 PM - Final Round', '2023-05-26 09:00:00-07:00', 'Anywhere in Canada', 2),
('Lighthouse Labs Tech Talk', 'Join us for a tech talk on emerging technologies.', '6:00 PM - Registration, 7:00 PM - Speaker Session, 8:00 PM - Q&A', '2023-05-28 18:00:00-07:00', 'Anywhere in Canada', 2),
('Lighthouse Labs Workshop', 'Learn advanced coding techniques in this hands-on workshop.', '10:00 AM - Git and Version Control, 11:30 AM - Advanced JavaScript, 1:00 PM - Backend Development', '2023-05-30 10:00:00-07:00', 'Anywhere in Canada', 3),
('Product Launch Party', 'Come celebrate the launch of our new product line with food, drinks, and giveaways', '6:00pm - Doors Open, 7:00pm - Presentation, 8:00pm - Raffle Drawing, 9:00pm - Live Music', '2023-05-17 16:00:00', 'City Hall Plaza', 4),
('Charity Fundraiser', 'Join us for an evening of entertainment and giving to benefit the local children hospital', '7:00pm - Cocktail Reception, 8:00pm - Silent Auction, 9:00pm - Live Auction, 10:00pm - Dancing', '2023-05-20 16:00:00', 'Country Club', 4),
('Employee Appreciation Day', 'We are taking the day to celebrate our hardworking staff with food, games, and prizes', '11:00am - Lunch, 12:00pm - Cornhole Tournament, 2:00pm - Office Trivia, 3:00pm - Raffle Drawing', '2023-05-21 17:30:00', 'Office Park', 4),
('Industry Conference', 'Join us for three days of learning, networking, and innovation with industry leaders', '8:00am - Registration and Breakfast, 9:00am - Keynote Speaker, 10:00am - Breakout Sessions, 12:00pm - Lunch, 1:00pm - Roundtable Discussions, 3:00pm - Closing Remarks', '2023-05-24 17:30:00', 'Convention Center', 4),
('Customer Appreciation Week', 'We are showing our customers some love with daily giveaways, discounts, and events', 'Monday - Free Coffee, Tuesday - Pop-up Shop, Wednesday - Customer Roundtable, Thursday - Free Lunch, Friday - Raffle Drawing', '2023-05-25 18:45:00', 'Multiple Locations', 4),
('Lighthouse Labs Demo Day', 'Showcase your web development projects in this interactive event.', '9:00 AM - Registration, 10:00 AM - Project Presentations, 12:00 PM - Lunch Break, 2:00 PM - Awards Ceremony', '2023-05-31 09:00:00-07:00', 'Anywhere in Canada', 5),
('Startup Pitch Day', 'Pitch day for startup founders', 'Startup founders pitch their ideas to investors', '2023-06-28 18:45:00', 'Austin, Texas', 5),
('Design Thinking Workshop', 'Workshop on design thinking for product development', 'Learn how to apply design thinking to create better products', '2023-07-01 18:45:00', 'Boston', 5),
('Leadership Summit', 'Leadership summit for senior executives', 'Keynote speeches and panel discussions on leadership strategies', '2023-07-05 18:45:00', 'New York City', 1),
('Environmental Conference', 'Conference on environmental sustainability', 'Panel discussions and presentations on sustainability practices', '2023-07-10 18:45:00', 'San Francisco', 2),
  ('Tech Conference', 'Conference about the latest technology trends', '9:00 AM - Registration, 10:00 AM - Keynote Speech, 11:00 AM - Panel Discussion', '2023-01-01 09:00:00', 'Conference Center', 3),
  ('Marketing Workshop', 'Workshop on effective marketing strategies', '9:30 AM - Introduction, 10:00 AM - Social Media Marketing, 11:30 AM - Email Marketing', '2023-01-15 09:30:00', 'Marketing Hub', 4),
  ('Networking Event', 'Opportunity to connect with professionals', '6:00 PM - Welcome Drinks, 6:30 PM - Networking Session, 8:00 PM - Closing Remarks', '2023-02-05 18:00:00', 'Grand Ballroom', 9),
  ('Product Launch', 'Introduction of new product line', '10:00 AM - Product Presentation, 11:00 AM - Q&A Session, 12:00 PM - Product Demonstration', '2023-03-10 10:00:00', 'Exhibition Hall', 4),
  ('Training Seminar', 'Training session for professional development', '9:00 AM - Registration, 9:30 AM - Training Session 1, 11:00 AM - Training Session 2', '2023-03-25 09:00:00', 'Training Center', 7),
  ('Industry Conference', 'Conference for industry professionals', '9:30 AM - Opening Keynote, 11:00 AM - Panel Discussion, 2:00 PM - Breakout Sessions', '2023-04-15 09:30:00', 'Convention Center', 8),
  ('Charity Fundraiser', 'Fundraising event for a charitable cause', '6:30 PM - Cocktail Reception, 7:00 PM - Silent Auction, 8:30 PM - Dinner', '2023-05-05 18:30:00', 'Luxury Hotel', 5),
  ('Work-Life Balance Workshop', 'Learn techniques for maintaining work-life balance', '10:00 AM - Introduction, 11:00 AM - Stress Management, 12:30 PM - Time Management', '2023-06-10 10:00:00', 'Community Center', 6),
  ('Art Exhibition', 'Showcasing local artists and their artwork', '3:00 PM - Opening Ceremony, 3:30 PM - Artist Talks, 5:00 PM - Networking', '2023-06-25 15:00:00', 'Art Gallery', 9),
  ('Leadership Conference', 'Conference on leadership skills development', '9:00 AM - Registration, 10:00 AM - Keynote Speaker, 11:30 AM - Workshop Sessions', '2023-07-15 09:00:00', 'Conference Center', 3);

-- Fundraisers table
INSERT INTO fundraisers (title, event_id, target_amount)
VALUES
  ('Children''s Education Fundraiser', 1, 1500),
  ('Community Food Drive', 2, 2000),
  ('Animal Shelter Renovation Project', 4, 1800),
  ('Support for Homeless Veterans', 6, 1300),
  ('Art Scholarship Program', 7, 600),
  ('Disaster Relief Fund', 8, 2500),
  ('Youth Sports Equipment Drive', 9, 400),
  ('Cancer Treatment Support', 10, 2000),
  ('New Camera', 11, 800),
  ('New Bike', 12, 600),
  ('New LV Bag', 13, 900),
  ('Gourmet Dinner', 14, 500),
  ('Weekend Getaway', 15, 700),
  ('Spa Retreat', 26, 800),
  ('Concert Tickets', 27, 400),
  ('Fitness Equipment', 28, 600),
  ('Kitchen Appliances', 29, 900),
  ('Fashion Accessories', 30, 500),
  ('Book Collection', 39, 600),
  ('Home Decor', 17, 800),
  ('Gaming Console', 18, 500),
  ('Artwork', 18, 700),
  ('Music Lessons', 19, 400),
  ('Hiking Gear', 20, 800),
  ('Culinary Classes', 22, 600),
  ('Pet Adoption', 21, 900),
  ('Photography Workshop', 26, 500),
  ('Outdoor Adventure', 24, 700),
  ('Home Theater System', 31, 800),
  ('Wine Tasting Experience', 33, 400),
  ('Luxury Spa Day', 35, 600),
  ('Fashion Makeover', 36, 900),
  ('Charity Donation', 37, 500);



-- Event_user table
INSERT INTO event_user (user_id, event_id) VALUES
  (1, 1),(2, 1),(3, 1),(4, 1),(5, 1),(6, 1),(7, 1),(8, 1),(9, 1),(10, 1),
  (1, 2),(2, 2),(3, 2),(4, 2),(5, 2),(6, 2),(7, 6),(8, 6),(9, 6),(10, 6),
  (1, 3),(2, 3),(3, 3),(4, 3),(5, 3),(6, 3),(7, 7),(8, 7),(9, 7),(10, 7),
  (1, 4),(2, 4),(3, 4),(4, 4),(5, 4),(6, 4),(7, 4),(8, 8),(9, 8),(10, 8),
  (1, 5),(2, 5),(3, 9),(4, 5),(5, 5),(6, 5),(7, 5),(8, 9),(9, 5),(10, 9),
  (1, 10), (2, 11), (3, 12), (4, 13), (5, 14),
  (6, 15), (7, 16), (8, 17), (9, 18), (1, 19),
  (2, 20), (3, 21), (4, 22), (5, 23), (6, 24),
  (7, 25), (8, 26), (9, 27), (1, 28), (2, 10),
  (3, 11), (4, 12), (5, 13), (6, 14), (7, 15),
  (8, 16), (9, 17), (1, 18), (2, 19), (3, 20),
  (4, 21), (5, 22), (6, 23), (7, 24), (8, 25),
  (9, 26), (1, 27), (2, 28), (3, 10), (4, 11),
  (5, 12), (6, 13), (7, 14), (8, 15), (9, 16),
  (1, 17), (2, 18), (3, 19), (4, 20), (5, 21);

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


INSERT INTO fundraiser_user (user_id, fundraiser_id, amount, payment_anonymous, payment_method, payment_status, message)
VALUES
  (1, 1, 100, true, 'VISA', 'Pending', 'Thank you for your support!'),
  (2, 1, 50, false, 'AMEX', 'Completed', 'Keep up the good work!'),
  (3, 1, 200, true, 'MASTERCARD', 'Pending', 'Happy to contribute!'),
  (4, 1, 75, false, 'VISA', 'Completed', 'Wishing you success with the fundraiser.'),
  (5, 1, 150, false, 'AMEX', 'Pending', 'Proud to be part of this cause.'),
  (6, 1, 80, true, 'VISA', 'Completed', 'You are doing an amazing job!'),
  (7, 1, 250, true, 'MASTERCARD', 'Pending', 'Supporting your cause wholeheartedly.'),
  (8, 1, 120, false, 'AMEX', 'Completed', 'Best wishes for the fundraiser.'),
  (9, 1, 300, true, 'VISA', 'Pending', 'Your work inspires us!'),
  (1, 10, 90, false, 'MASTERCARD', 'Completed', 'Keep making a difference.'),
  (2, 1, 175, true, 'AMEX', 'Pending', 'Contributing to a great cause.'),
  (3, 2, 60, false, 'VISA', 'Completed', 'Happy to support your mission.'),
  (4, 3, 180, true, 'MASTERCARD', 'Pending', 'You have our full support!'),
  (5, 4, 110, false, 'AMEX', 'Completed', 'Good luck with the fundraiser.'),
  (6, 5, 225, true, 'VISA', 'Pending', 'We believe in your cause.'),
  (7, 6, 95, true, 'MASTERCARD', 'Completed', 'Supporting you all the way.'),
  (8, 7, 210, false, 'VISA', 'Pending', 'Thank you for making a difference.'),
  (9, 8, 130, true, 'AMEX', 'Completed', 'Your work is truly inspiring.'),
  (10, 1, 250, false, 'VISA', 'Pending', 'We are with you in this journey.'),
    (1, 10, 100, true, 'VISA', 'Pending', 'Thank you for your support!'),
  (2, 11, 50, false, 'AMEX', 'Completed', 'Keep up the good work!'),
  (3, 12, 200, true, 'MASTERCARD', 'Pending', 'Happy to contribute!'),
  (4, 13, 75, false, 'VISA', 'Completed', 'Wishing you success with the fundraiser.'),
  (5, 14, 150, false, 'AMEX', 'Pending', 'Proud to be part of this cause.'),
  (6, 15, 80, true, 'VISA', 'Completed', 'You are doing an amazing job!'),
  (7, 16, 250, true, 'MASTERCARD', 'Pending', 'Supporting your cause wholeheartedly.'),
  (8, 17, 120, false, 'AMEX', 'Completed', 'Best wishes for the fundraiser.'),
  (9, 18, 300, true, 'VISA', 'Pending', 'Your work inspires us!'),
  (1, 19, 90, false, 'MASTERCARD', 'Completed', 'Keep making a difference.'),
  (2, 20, 175, true, 'AMEX', 'Pending', 'Contributing to a great cause.'),
  (3, 21, 60, false, 'VISA', 'Completed', 'Happy to support your mission.'),
  (4, 22, 180, true, 'MASTERCARD', 'Pending', 'You have our full support!'),
  (5, 23, 110, false, 'AMEX', 'Completed', 'Good luck with the fundraiser.'),
  (6, 24, 225, true, 'VISA', 'Pending', 'We believe in your cause.'),
  (7, 25, 95, true, 'MASTERCARD', 'Completed', 'Supporting you all the way.'),
  (8, 10, 210, false, 'VISA', 'Pending', 'Thank you for making a difference.'),
  (9, 11, 130, true, 'AMEX', 'Completed', 'Your work is truly inspiring.'),
  (10, 12, 250, false, 'VISA', 'Pending', 'We are with you in this journey.'),
  (1, 13, 70, true, 'VISA', 'Completed', 'Supporting a worthy cause.'),
  (2, 14, 120, false, 'AMEX', 'Pending', 'You make a difference.'),
  (3, 15, 190, true, 'MASTERCARD', 'Completed', 'Proud to contribute.'),
  (4, 16, 85, false, 'VISA', 'Pending', 'Best of luck with the fundraiser!'),
  (5, 17, 140, false, 'AMEX', 'Completed', 'Your cause is important.'),
  (6, 18, 220, true, 'VISA', 'Pending', 'Keep up the great work!'),
  (7, 19, 105, true, 'MASTERCARD', 'Completed', 'You are making a positive impact.'),
  (8, 20, 230, false, 'VISA', 'Pending', 'Thank you for your dedication.'),
  (9, 21, 160, true, 'AMEX', 'Completed', 'Supporting your mission.'),
  (10, 22, 270, false, 'VISA', 'Pending', 'Happy to be part of this cause.');

UPDATE fundraiser_user
SET payment_status = 'Completed'
WHERE payment_status = 'Pending';

UPDATE fundraisers
SET current_amount = subquery.sumamount
FROM (
  SELECT fundraiser_id, SUM(amount) as sumamount
  FROM fundraiser_user
  WHERE payment_status = 'Completed'
  GROUP BY fundraiser_id
) as subquery
WHERE fundraisers.id = subquery.fundraiser_id;


