import React from "react";
import { Card, CardBody, CardHeader, CardText} from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <Card className = "m-4">
        <CardHeader><Link to={`post/${post.id}`}>{post.title}</Link></CardHeader>
        <CardBody>
            <CardText>
                <small>
                    By: {post.userProfile.fullName}           
                </small>
            </CardText>
            <CardText>
                <small>
                 Category: {post.category.name}
                </small>
            </CardText>
        </CardBody>
    </Card>
  );
};

export default Post;
