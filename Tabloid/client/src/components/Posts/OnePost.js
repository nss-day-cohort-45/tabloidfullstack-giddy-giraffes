import React, { useContext } from "react";
import { Card, CardBody, CardHeader, CardText, CardImg, Button} from "reactstrap";
import { PostContext } from "../../providers/PostProvider";

const OnePost = ({ post }) => {
    let date = new Date (post.publishDateTime);
    const { deletePost } = useContext(PostContext);

    // Handles showing the delete button if the current user is viewing a post that they wrote. 
    const deleteButton = (post) => {
        let currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
        if(post.userProfile.id === currentUser.id){
            return <Button variant="secondary" onClick={() => {
                const confirmBox = window.confirm(
                    "Do you really want to delete this Post?"
                )
                if (confirmBox === true) {
                    deletePost(post.id);
                }
            }} className="delete-button">
                Delete
            </Button>
        }
    }

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
            {deleteButton(post)}
        </CardBody>
    </Card>
  );
};

export default OnePost;