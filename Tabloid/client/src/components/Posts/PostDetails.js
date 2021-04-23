import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";
import OnePost from "./OnePost";
import { CommentContext } from "../../providers/CommentProvider"
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";
import { CardHeader } from "reactstrap";

const PostDetails = () => {
  const [post, setPost] = useState({
    userProfile: {},
  });
  const { getPostById } = useContext(PostContext);
  const { comments, getAllComments } = useContext(CommentContext);
  const { id } = useParams();

  useEffect(() => {
    getPostById(id).then((response) => {
      setPost(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAllComments(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  if (!post) {
    return null;
  }

  return (
    <div className="container">
      <CardHeader><Link to={`comment/getCommentByPostId/${postId}`}>View Comments</Link></CardHeader>
      <Link to={`/posttag/${id}`} className="nav-link">
        Manage Comment
      </Link>
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <OnePost post={post} />
        </div>
      </div>
      {comments.map((c) => (
        <Comment key={c.id} comment={c} />
      ))}
    </div>
  );
};

export default PostDetails;