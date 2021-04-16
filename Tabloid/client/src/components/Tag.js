import React, { useContext, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { TagContext } from "../providers/TagProvider";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const Tag = ({ tag }) => {
  const { deleteTag } = useContext(TagContext);

  const tagDelete = () => {
    deleteTag(tag.id);
  };

  return (
    <Card className="m-4">
      <CardBody>
        <p>
          <strong>{tag.name}</strong>
        </p>
        <Link to={`/tag/edit/${tag.id}`}>
          <Button type="button">Edit</Button>
        </Link>
        <Button variant="secondary" onClick={tagDelete} className="btn-primary">
          Delete
        </Button>
      </CardBody>
    </Card>
  );
};

export default Tag;
