import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";

const MyPosts = () => {
  const [post, setPost] = useState();
  const { getPostsByUser } = useContext(PostContext);

  useEffect(() => {
    let userId = localStorage.getItem('id');
    getPostsByUser(userId)
    .then(setPost)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!post) {
    return null;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <Post post={post} />
        </div>
      </div>
    </div>
  );
};

export default MyPosts;