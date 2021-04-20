import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { TagContext } from "../../providers/TagProvider";
import { useParams } from "react-router-dom";
import OnePost from "./OnePost";
import PostTag from "../PostTag";
import { Link } from "react-router-dom";

const PostDetails = () => {
  const [post, setPost] = useState({
    userProfile: {},
  });
  const [tags, setTag] = useState([]);
  const { getPostById } = useContext(PostContext);
  const { GetTagsByPostId } = useContext(TagContext);
  const { id } = useParams();

  useEffect(() => {
    getPostById(id).then((response) => {
      setPost(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    GetTagsByPostId(id).then((response) => {
      setTag(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!post) {
    return null;
  }

  return (
    <div className="container">
      <Link to="" className="nav-link">
        Manage Tags
      </Link>
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <OnePost post={post} />
        </div>
      </div>
      {tags.map((t) => (
        <PostTag key={t.id} postTag={t} />
      ))}
    </div>
  );
};

export default PostDetails;
