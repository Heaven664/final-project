
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

SELECT 
  e.id AS event_id,
  e.name AS event_name,
  e.description,
  e.agenda,
  e.event_date,
  e.event_location,
  h.id AS host_id,
  h.first_name AS host_first_name,
  h.last_name AS host_last_name,
  h.photo AS host_photo
FROM 
  events AS e
LEFT JOIN 
  users AS h ON e.host_id = h.id
WHERE e.id = 1;











