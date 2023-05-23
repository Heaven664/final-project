DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS fundraisers CASCADE;
DROP TABLE IF EXISTS event_user CASCADE;
DROP TABLE IF EXISTS friendlists CASCADE;
DROP TABLE IF EXISTS private_messages CASCADE;
DROP TABLE IF EXISTS group_messages CASCADE;
DROP TABLE IF EXISTS fundraiser_user CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_digest VARCHAR(255) NOT NULL,
  country VARCHAR(255),
  city VARCHAR(255),
  birthday DATE,
  photo VARCHAR(255),
  about TEXT
  -- upcoming INTEGER DEFAULT 30 NOT NULL
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  agenda VARCHAR(255) NOT NULL,
  event_date timestamptz NOT NULL,
  event_location VARCHAR(255) NOT NULL,
  host_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE fundraisers (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  target_amount INTEGER NOT NULL,
  current_amount INTEGER DEFAULT 0 NOT NULL,
  collected BOOLEAN DEFAULT false NOT NULL,
  collected_date TIMESTAMP
);

CREATE TABLE event_user (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE friendlists (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  friend_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE private_messages (
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE group_messages (
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE fundraiser_user (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  fundraiser_id INTEGER REFERENCES fundraisers(id) ON DELETE CASCADE,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  amount INTEGER NOT NULL,
  payment_anonymous BOOLEAN NOT NULL,
  payment_method VARCHAR(255) NOT NULL,
  payment_status VARCHAR(255) NOT NULL,
  message VARCHAR(255) NOT NULL,
);
