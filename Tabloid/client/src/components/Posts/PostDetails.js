import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";
import OnePost from "./OnePost";

const PostDetails = () => {
  const [post, setPost] = useState();
  const { getPostById } = useContext(PostContext);
  const { id } = useParams();

  useEffect(() => {
    getPostById(id)
    .then(setPost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!post) {
    return null;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <OnePost post={post} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;