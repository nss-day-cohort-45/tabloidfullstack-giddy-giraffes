import React, { useContext, useEffect } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";
import { useHistory } from "react-router-dom";
import { PostTagContext } from "../../providers/PostTagProvider";

const PostTag = ({ postTag }) => {
  const { deletePostTag } = useContext(PostTagContext);
  const history = useHistory();

  const postTagDelete = () => {
    deletePostTag(postTag.postTag.id).then(() => {
      history.go(0);
    });
  };

  return (
    <Card className="m-4">
      <CardBody>
        <p id={postTag.postTag.id}>
          <strong>Tags:{postTag.name}</strong>
        </p>
        <Button
          variant="secondary"
          onClick={postTagDelete}
          className="btn-primary"
        >
          Remove
        </Button>
      </CardBody>
    </Card>
  );
};

export default PostTag;
