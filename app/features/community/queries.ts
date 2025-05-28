import { asc, count, eq } from "drizzle-orm";
import { postUpvotes, posts } from "./schema";

import db from "~/db";
import { profiles } from "../users/schema";
import { viewpoints } from "../viewpoints/schema";

export const useGetCommunityPosts = async () => {
  const allPosts = await db
    .select({
      id: posts.post_id,
      title: posts.title,
      content: posts.content,
      createdAt: posts.created_at,
      updatedAt: posts.updated_at,
      viewpoint: viewpoints.title,
      author: profiles.name,
      username: profiles.username,
      upvotes: count(postUpvotes.post_id),
    })
    .from(posts)
    .innerJoin(viewpoints, eq(posts.viewpoint_id, viewpoints.id))
    .innerJoin(profiles, eq(posts.created_by, profiles.profile_id))
    .leftJoin(postUpvotes, eq(posts.post_id, postUpvotes.post_id))
    .groupBy(posts.post_id, profiles.name, profiles.username, viewpoints.title)
    .orderBy(asc(posts.post_id));
  return allPosts;
};
