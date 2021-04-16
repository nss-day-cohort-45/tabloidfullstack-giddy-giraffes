import React, { useContext, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { TagContext } from "../providers/TagProvider";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const Tag = ({ tag }) => {
  const { deleteTag } = useContext(TagContext);

  const history = useHistory();

  const tagDelete = () => {
    deleteTag(tag.id);
  };

  return (
    <Card className="m-4">
      <CardBody>
        <p>
          <strong>{tag.name}</strong>
        </p>
        <Button variant="secondary" onClick={tagDelete} className="btn-primary">
          Delete Expense
        </Button>
      </CardBody>
    </Card>
  );
};

export default Tag;
