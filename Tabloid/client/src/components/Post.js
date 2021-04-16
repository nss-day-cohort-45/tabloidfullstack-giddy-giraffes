import React from "react";
import { Card, CardBody, CardHeader, CardText} from "reactstrap";

const Post = ({ post }) => {
  return (
    <Card className = "m-4">
        <CardHeader>{post.title}</CardHeader>
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
