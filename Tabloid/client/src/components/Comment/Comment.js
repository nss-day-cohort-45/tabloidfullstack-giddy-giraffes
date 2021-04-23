import { Card, CardBody, CardText } from "reactstrap";
import React from "react";

const Comment = ({ comment }) => {

    if (comment.createDateTime != "") {
        const event = new Date(comment.createDateTime)
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        comment.createDateTime = event.toLocaleDateString(options)
    }
    return (
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
            </CardBody>
        </Card>
    );
};

export default Comment;
