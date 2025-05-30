DROP VIEW IF EXISTS community_post_list_view;

CREATE VIEW community_post_list_view AS
SELECT
    p.post_id,
    p.title,
    p.content,
    p.created_at,
    p.updated_at,
    p.viewpoint_id,
    p.created_by,
    p.photos,
    pr.username,
    pr.profile_id,
    pr.photos as profile_photos,
    v.title AS viewpoint_title,
    COUNT(pu.profile_id) AS upvote_count
FROM posts p
JOIN profiles pr ON p.created_by = pr.profile_id
LEFT JOIN viewpoints v ON p.viewpoint_id = v.id
LEFT JOIN post_upvotes pu ON p.post_id = pu.post_id
GROUP BY 
    p.post_id,
    p.title,
    p.content,
    p.created_at,
    p.updated_at,
    p.viewpoint_id,
    p.created_by,
    p.photos,
    pr.username,
    pr.profile_id,
    pr.photos,
    v.title;