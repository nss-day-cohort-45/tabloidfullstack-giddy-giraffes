import { Card, CardBody, CardText, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import React, { useContext } from "react";


const Comment = ({ comment }) => {
    const history = useHistory();

    const { deleteComment } = useContext(CommentContext);


    const comDelete = () => {
        let currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
        if (comment.userProfileId === currentUser.id) {
            return <Button type="button" onClick={() => {
                const confirmBox = window.confirm(
                    "Do you really want to delete this Comment?"
                )
                if (confirmBox === true) {
                    deleteComment(comment.id);
                    //use a history.push to send it back to the list of comments

                }
            }} className="delete-button">
                Delete
            </Button>
        }
    }



    if (comment.createDateTime != "") {
        const event = new Date(comment.createDateTime)
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        comment.createDateTime = event.toLocaleDateString(options)
    }
    return (
        <div>
            <Link to={`/post/${comment.postId}`}>
                <h3>
                    <small>
                        Title: {comment.title.title}
                    </small>
                </h3>
            </Link>
            <Card className="m-4">
                <CardBody>
                    <CardText>
                        <small>
                            DisplayName: {comment.displayName.displayName}
                        </small>
                    </CardText>
                    <CardText>
                        <small>
                            Subject: {comment.subject}
                        </small>
                    </CardText>
                    <CardText>
                        <small>
                            Content: {comment.content}
                        </small>
                    </CardText>
                    <CardText>
                        <small>
                            CreateDateTime: {comment.createDateTime}
                        </small>
                    </CardText>
                    {comDelete(comment.id)}
                </CardBody>
            </Card>
        </div >
    );
};

export default Comment;
