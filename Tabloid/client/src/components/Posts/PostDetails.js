import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { TagContext } from "../../providers/TagProvider";
import { useParams } from "react-router-dom";
import OnePost from "./OnePost";
import { Link } from "react-router-dom";
import { CardHeader } from "reactstrap";
import PostTag from "./PostTag";

const PostDetails = () => {
  const [post, setPost] = useState({
    userProfile: {},
  });

  const { getPostById } = useContext(PostContext);
  const { GetTagsByPostId, tagsOnPost } = useContext(TagContext);
  const { id } = useParams();

  useEffect(() => {
    getPostById(id).then((response) => {
      setPost(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const manageTags = (post) => {
    let currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    if (post.userProfile.id === currentUser.id) {
      return (
        <Link to={`/posttag/${id}`} className="nav-link">
          Manage Tags
        </Link>
      );
    }
  };

  useEffect(() => {
    GetTagsByPostId(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!post) {
    return null;
  }

  return (
    <div className="container">
      <CardHeader>
        <Link to={`/comment/getCommentByPostId/${id}`}>View Comments</Link>
      </CardHeader>

      {manageTags(post)}
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <OnePost post={post} />
        </div>
      </div>
      {tagsOnPost.map((t) => (
        <PostTag key={t.id} postTag={t} />
      ))}
    </div>
  );
};

export default PostDetails;
