-- Viewpoints
INSERT INTO viewpoints (id, title, description, location_name, latitude, longitude, created_by, rating, rating_count)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'N Seoul Tower Observatory', 'Beautiful night view of Seoul', 'N Seoul Tower', 37.5512, 126.9882, 'xxxxxxxxxxxxxx', 4.5, 120),
  ('550e8400-e29b-41d4-a716-446655440001', 'Bugaksan Observatory', 'Panoramic view of northern Seoul', 'Bugaksan', 37.5923, 126.9654, 'xxxxxxxxxxxxxx', 4.2, 85),
  ('550e8400-e29b-41d4-a716-446655440002', 'Inwangsan Observatory', 'Stunning view of Seoul city center', 'Inwangsan', 37.5823, 126.9554, 'xxxxxxxxxxxxxx', 4.0, 65),
  ('550e8400-e29b-41d4-a716-446655440003', 'Gwanaksan Observatory', 'Panoramic view of southern Seoul', 'Gwanaksan', 37.4523, 126.9454, 'xxxxxxxxxxxxxx', 4.3, 95),
  ('550e8400-e29b-41d4-a716-446655440004', 'Bukhansan Observatory', 'Panoramic view of northern Seoul', 'Bukhansan', 37.6623, 126.9754, 'xxxxxxxxxxxxxx', 4.7, 150);

-- Trails
INSERT INTO trails (id, title, description, start_location, end_location, distance, elevation_gain, estimated_time, difficulty, season, created_by, viewpoint_id, rating, rating_count)
VALUES
  ('660e8400-e29b-41d4-a716-446655440000', 'N Seoul Tower Trail', 'Beautiful walking path around N Seoul Tower', 'N Seoul Tower', 'N Seoul Tower', 3.5, 150, 60, 'Easy', 'All Seasons', 'xxxxxxxxxxxxxx', '550e8400-e29b-41d4-a716-446655440000', 4.5, 80),
  ('660e8400-e29b-41d4-a716-446655440001', 'Bugaksan Trail', 'Hiking trail to Bugaksan summit', 'Bugaksan Entrance', 'Bugaksan Summit', 4.2, 300, 120, 'Moderate', 'Spring,Fall', 'xxxxxxxxxxxxxx', '550e8400-e29b-41d4-a716-446655440001', 4.3, 65),
  ('660e8400-e29b-41d4-a716-446655440002', 'Inwangsan Trail', 'Scenic walking path around Inwangsan', 'Inwangsan Entrance', 'Inwangsan Entrance', 2.8, 100, 45, 'Easy', 'All Seasons', 'xxxxxxxxxxxxxx', '550e8400-e29b-41d4-a716-446655440002', 4.0, 50),
  ('660e8400-e29b-41d4-a716-446655440003', 'Gwanaksan Trail', 'Hiking trail to Gwanaksan summit', 'Gwanaksan Entrance', 'Gwanaksan Summit', 5.5, 400, 180, 'Hard', 'Spring,Fall', 'xxxxxxxxxxxxxx', '550e8400-e29b-41d4-a716-446655440003', 4.6, 90),
  ('660e8400-e29b-41d4-a716-446655440004', 'Bukhansan Trail', 'Hiking trail to Bukhansan summit', 'Bukhansan Entrance', 'Bukhansan Summit', 6.0, 450, 240, 'Hard', 'Spring,Fall', 'xxxxxxxxxxxxxx', '550e8400-e29b-41d4-a716-446655440004', 4.8, 120);

-- Posts
INSERT INTO posts (title, content, viewpoint_id, created_by)
VALUES
  ('Beautiful Sunrise at N Seoul Tower', 'The sunrise I saw this morning at N Seoul Tower was absolutely beautiful.', '550e8400-e29b-41d4-a716-446655440000', 'xxxxxxxxxxxxxx'),
  ('Bugaksan Hiking Review', 'The Bugaksan trail was steeper than expected.', '550e8400-e29b-41d4-a716-446655440001', 'xxxxxxxxxxxxxx'),
  ('Inwangsan Trail Recommendation', 'The Inwangsan trail was really enjoyable.', '550e8400-e29b-41d4-a716-446655440002', 'xxxxxxxxxxxxxx'),
  ('Gwanaksan Hiking Tips', 'Important points to consider when hiking Gwanaksan', '550e8400-e29b-41d4-a716-446655440003', 'xxxxxxxxxxxxxx'),
  ('Bukhansan Hiking Review', 'The view from Bukhansan summit was spectacular.', '550e8400-e29b-41d4-a716-446655440004', 'xxxxxxxxxxxxxx');

-- Post Replies
INSERT INTO post_replies (post_id, profile_id, reply)
VALUES
  (1, 'xxxxxxxxxxxxxx', 'What a beautiful photo!'),
  (2, 'xxxxxxxxxxxxxx', 'I want to visit there next time.'),
  (3, 'xxxxxxxxxxxxxx', 'Thanks for the great information.'),
  (4, 'xxxxxxxxxxxxxx', 'This was very helpful.'),
  (5, 'xxxxxxxxxxxxxx', 'What an amazing view!');

-- Photos
INSERT INTO photos (id, profile_id, viewpoint_id, trail_id, post_id, url, description, is_thumbnail)
VALUES
  ('770e8400-e29b-41d4-a716-446655440000', 'xxxxxxxxxxxxxx', '550e8400-e29b-41d4-a716-446655440000', NULL, NULL, 'https://example.com/photo1.jpg', 'N Seoul Tower View', true),
  ('770e8400-e29b-41d4-a716-446655440001', 'xxxxxxxxxxxxxx', '550e8400-e29b-41d4-a716-446655440001', NULL, NULL, 'https://example.com/photo2.jpg', 'Bugaksan View', true),
  ('770e8400-e29b-41d4-a716-446655440002', 'xxxxxxxxxxxxxx', '550e8400-e29b-41d4-a716-446655440002', NULL, NULL, 'https://example.com/photo3.jpg', 'Inwangsan View', true),
  ('770e8400-e29b-41d4-a716-446655440003', 'xxxxxxxxxxxxxx', '550e8400-e29b-41d4-a716-446655440003', NULL, NULL, 'https://example.com/photo4.jpg', 'Gwanaksan View', true),
  ('770e8400-e29b-41d4-a716-446655440004', 'xxxxxxxxxxxxxx', '550e8400-e29b-41d4-a716-446655440004', NULL, NULL, 'https://example.com/photo5.jpg', 'Bukhansan View', true);

-- Notifications
INSERT INTO notifications (id, recipient_id, sender_id, type, content, reference_id, is_read)
VALUES
  ('880e8400-e29b-41d4-a716-446655440000', 'xxxxxxxxxxxxxx', 'xxxxxxxxxxxxxx', 'like', 'Your post received a like.', '550e8400-e29b-41d4-a716-446655440000', false),
  ('880e8400-e29b-41d4-a716-446655440001', 'xxxxxxxxxxxxxx', 'xxxxxxxxxxxxxx', 'comment', 'Your post received a comment.', '550e8400-e29b-41d4-a716-446655440001', false),
  ('880e8400-e29b-41d4-a716-446655440002', 'xxxxxxxxxxxxxx', 'xxxxxxxxxxxxxx', 'follow', 'You have a new follower.', '550e8400-e29b-41d4-a716-446655440002', false),
  ('880e8400-e29b-41d4-a716-446655440003', 'xxxxxxxxxxxxxx', 'xxxxxxxxxxxxxx', 'mention', 'You were mentioned in a post.', '550e8400-e29b-41d4-a716-446655440003', false),
  ('880e8400-e29b-41d4-a716-446655440004', 'xxxxxxxxxxxxxx', 'xxxxxxxxxxxxxx', 'system', 'System notification.', '550e8400-e29b-41d4-a716-446655440004', false);

-- Post Upvotes (Composite Primary Key)
INSERT INTO post_upvotes (post_id, profile_id)
VALUES
  (1, 'xxxxxxxxxxxxxx');

-- Post Reply Upvotes (Composite Primary Key)
INSERT INTO post_reply_upvotes (post_reply_id, profile_id)
VALUES
  (1, 'xxxxxxxxxxxxxx');

-- Follows (Composite Primary Key)
INSERT INTO follows (follower_id, following_id)
VALUES
  ('xxxxxxxxxxxxxx', 'xxxxxxxxxxxxxx'); 