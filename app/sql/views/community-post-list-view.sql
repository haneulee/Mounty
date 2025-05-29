CREATE VIEW community_post_list_view AS
SELECT
    p.*,
    pr.username,
    pr.profile_id,
    v.title AS viewpoint_title,
    COUNT(pu.profile_id) AS upvote_count,
    ph.url AS avatar_url,
FROM posts p
JOIN profiles pr ON p.created_by = pr.profile_id
LEFT JOIN viewpoints v ON p.viewpoint_id = v.id
LEFT JOIN post_upvotes pu ON p.post_id = pu.post_id
LEFT JOIN photos ph ON pr.profile_id = ph.profile_id AND ph.is_thumbnail = true
GROUP BY 
    p.post_id,
    pr.username,
    pr.profile_id,
    v.title,
    ph.url;