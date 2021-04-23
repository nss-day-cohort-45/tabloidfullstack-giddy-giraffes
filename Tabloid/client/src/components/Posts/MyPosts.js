import React, { useEffect, useContext } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const MyPosts = () => {
  const { posts, getPostsByUser } = useContext(PostContext);

  useEffect(() => {
    getPostsByUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
        <Link to="/post/add" className="nav-link">
            New Post
        </Link> 
        <Row>
            {posts.map((p) => (
                <Col border="primary" md="4"><Post key={p.id} post={p} /></Col>
            ))}
        </Row>
    </Container>
  );
};

export default MyPosts;