import React, { useEffect, useContext } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";

const MyPosts = () => {
  const { posts, getPostsByUser } = useContext(PostContext);

  useEffect(() => {
    let user = JSON.parse(sessionStorage.userProfile);
    getPostsByUser(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
        {posts.map((p) => (
        <Post key={p.id} post={p} />
        ))}
    </section>
  );
};

export default MyPosts;