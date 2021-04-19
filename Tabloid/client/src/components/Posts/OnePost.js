import React from "react";
import { Card, CardBody, CardHeader, CardText, CardImg} from "reactstrap";

const OnePost = ({ post }) => {
    let date = new Date (post.publishDateTime);

  return (
    <Card className = "m-4">
        <CardHeader tag="h3">{post.title}</CardHeader>
        {post.imageLocation != null} 
            <CardImg src={post.imageLocation} alt="Card image"/>        
        
        <CardBody>
            <CardText>
                {post.content}
            </CardText>
            <CardText>
                <small>
                    Published: {date.toLocaleDateString('en-US')}
                </small>
            </CardText>
            <CardText>
                <small>
                    By: {post.userProfile.displayName}           
                </small>
            </CardText>
        </CardBody>
    </Card>
  );
};

export default OnePost;
