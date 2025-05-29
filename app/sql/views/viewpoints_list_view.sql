DROP VIEW IF EXISTS viewpoints_list_view;

CREATE VIEW viewpoints_list_view AS
SELECT
    v.*,
    pr.username,
    pr.profile_id,
    pr.photos as profile_photos
FROM viewpoints v
LEFT JOIN profiles pr ON v.created_by = pr.profile_id
GROUP BY 
    v.id,
    v.title,
    v.description,
    v.latitude,
    v.longitude,
    v.location_name,
    v.rating,
    v.rating_count,
    v.created_at,
    v.created_by,
    v.updated_at,
    v.photos,
    pr.username,
    pr.profile_id,
    pr.photos;