import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";

const PostList = () => {
  const { posts, getAllPosts } = useContext(PostContext);

  // When the user arrives at localhost:3000/post, request all posts
  // that have been approved and that have a published date before this moment.
  // Posts are already sorted by published dates descending
  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Maps through each PostCategoryUser object, sending 
  // them to be converted to HTML then prints them all out.
  return (
    <Container>
        <Link to="/post/add" className="nav-link">
            New Post
        </Link> 
        <Row>
            {posts.map((p) => (
                <Col key={p.id} md="4"><Post post={p} /></Col>
            ))}
        </Row>
    </Container>
  );
};

export default PostList;
