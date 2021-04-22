import React from "react";
import { Card, CardBody, CardHeader, CardText, Button} from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const Post = ({ post }) => {
    const history = useHistory();

    // Handles showing the delete button if the current user is viewing a post that they wrote. 
    const editButton = (postId) => {
        let currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
        if(post.userProfile.id === currentUser.id){
            return <Button type="button" onClick={() => {
                history.push(`/post/edit/${postId}`)
            }} className="delete-button">
                Edit
            </Button>
        }
    }

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
            {editButton(post.id)}       
        </CardBody>
    </Card>
  );
};

export default Post;
