import React from "react";
import { Card, CardBody, CardHeader, CardText } from "reactstrap";
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
    return (
        <Card className="m-4">
            <CardBody>
                <CardText>
                    <small>
                        DisplayName: {comment.userProfile.displayName}
                    </small>
                </CardText>
                <CardText>
                    <small>
                        Subject: {comment.subject}
                    </small>
                </CardText>
                <CardText>
                    <small>
                        Content: {comment.Content}
                    </small>
                </CardText>
                <CardText>
                    <small>
                        CreateDateTime: {comment.createDateTime}
                    </small>
                </CardText>
            </CardBody>
        </Card>
    );
};

export default Comment;
