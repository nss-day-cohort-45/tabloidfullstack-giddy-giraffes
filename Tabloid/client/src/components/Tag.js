import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";

const Tag = ({ tag }) => {
  return (
    <Card className="m-4">
      <CardBody>
        <p>
          <strong>{tag.name}</strong>
        </p>
      </CardBody>
    </Card>
  );
};

export default Tag;
