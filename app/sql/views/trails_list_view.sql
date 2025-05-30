DROP VIEW IF EXISTS trails_list_view;

CREATE OR REPLACE VIEW trails_list_view AS
SELECT
  t.id,
  t.title,
  t.description,
  t.start_location,
  t.end_location,
  t.distance,
  t.elevation_gain,
  t.estimated_time,
  LOWER(t.difficulty) as difficulty,
  LOWER(t.season) as season,
  t.rating,
  t.rating_count,
  t.posts_count,
  t.created_at,
  t.updated_at,
  t.photos,
  t.gpx,
  p.profile_id as created_by_id,
  p.username as created_by_username,
  p.photos as created_by_photos,
  v.id as viewpoint_id,
  v.title as viewpoint_title,
  v.location_name as viewpoint_location_name,
  (SELECT photos->0->>'url' FROM trails WHERE id = t.id) as thumbnail_photo_url
FROM trails t
LEFT JOIN profiles p ON t.created_by = p.profile_id
LEFT JOIN viewpoints v ON t.viewpoint_id = v.id;
