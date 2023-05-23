
-- SELECT 
--   e.id AS event_id,
--   e.name AS event_name,
--   e.description,
--   e.agenda,
--   e.event_date,
--   e.event_location,
--   h.first_name AS host_first_name,
--   h.last_name AS host_last_name,
--   h.photo AS host_photo,
--   u.first_name AS user_first_name,
--   u.last_name AS user_last_name,
--   u.photo AS user_photo
-- FROM 
--   events AS e
-- LEFT JOIN 
--   users AS h ON e.host_id = h.id
-- INNER JOIN (
--   SELECT 
--     eu.event_id
--   FROM 
--     event_user AS eu
--   WHERE 
--     eu.user_id = 1
-- ) AS subquery ON e.id = subquery.event_id
-- LEFT JOIN 
--   users AS u ON u.id = 1
-- WHERE 
--   e.host_id <> 1
-- ORDER BY e.event_date ASC;


-- SELECT 
--   e.id AS event_id,
--   e.name AS event_name,
--   e.event_date AS event_date,
--   e.event_location AS event_location,
--   h.first_name AS host_first_name,
--   h.last_name AS host_last_name,
--   h.photo AS host_photo
-- FROM 
--   events AS e
-- LEFT JOIN 
--   users AS h ON e.host_id = h.id
-- WHERE 
--   e.host_id = 1;

-- SELECT 
--   e.id AS event_id,
--   e.name AS event_name,
--   e.description,
--   e.agenda,
--   e.event_date,
--   e.event_location,
--   h.id AS host_id,
--   h.first_name AS host_first_name,
--   h.last_name AS host_last_name,
--   h.photo AS host_photo
-- FROM 
--   events AS e
-- LEFT JOIN 
--   users AS h ON e.host_id = h.id
-- WHERE e.id = 1;

-- UPDATE fundraisers
-- SET current_amount = (
--   SELECT SUM(amount)
--   FROM fundraiser_user
--   WHERE fundraiser_id = 1 
--   AND payment_status = 'Completed'
-- ) 
-- WHERE id = 1;




-- UPDATE fundraisers
-- SET current_amount = subquery.sumamount
-- FROM (
--   SELECT fundraiser_id, SUM(amount) as sumamount
--   FROM fundraiser_user
--   WHERE payment_status = 'Completed'
--   GROUP BY fundraiser_id
-- ) as subquery
-- WHERE fundraisers.id = subquery.fundraiser_id;

  -- UPDATE fundraisers
  -- SET collected = true, collected_date = CURRENT_TIMESTAMP
  -- WHERE id = 1
  -- RETURNING *;

        SELECT
        fundraiser_user.id, time, user_id, fundraiser_id, amount, payment_anonymous, message, users.first_name, users.last_name, users.photo
      FROM fundraiser_user
      INNER JOIN users
      ON user_id = users.id
      WHERE fundraiser_id = 2
      AND payment_status = 'Completed';