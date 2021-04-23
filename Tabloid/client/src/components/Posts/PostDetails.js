import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";
import OnePost from "./OnePost";
import { Link } from "react-router-dom";
import { CardHeader } from "reactstrap";

const PostDetails = () => {
  const [post, setPost] = useState({
    userProfile: {},
  });
  const { getPostById } = useContext(PostContext);
  const { id } = useParams();


  useEffect(() => {
    getPostById(id).then((response) => {
      setPost(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (!post) {
    return null;
  }

  return (
    <div className="container">
      <CardHeader><Link to={`/comment/getCommentByPostId/${id}`}>View Comments</Link></CardHeader>
      <Link to={`/posttag/${id}`} className="nav-link">
        Manage Tag
      </Link>
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <OnePost post={post} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;