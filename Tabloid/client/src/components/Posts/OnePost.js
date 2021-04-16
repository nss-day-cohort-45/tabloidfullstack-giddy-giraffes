import React from "react";
import { Card, CardBody, CardHeader, CardText, CardImg} from "reactstrap";

const Post = ({ post }) => {
  return (
    <Card className = "m-4">
        <CardHeader>{post.title}</CardHeader>
        {post.imageLocation != null(
            <CardImg>
                {post.imageLocation}
            </CardImg>
        )};
        <CardBody>
            <CardText>
                {post.content}
                <small>
                    Publication Date: {post.publishedDateTime}
                </small>
                <small>
                    By: {post.userProfile.displayName}           
                </small>
            </CardText>
        </CardBody>
    </Card>
  );
};

export default Post;
