import React, { useContext, useEffect } from "react";
import { Card, CardBody } from "reactstrap";

const PostTag = ({ postTag }) => {
  return (
    <Card className="m-4">
      <CardBody>
        <p>
          <strong>Tags:{postTag.name}</strong>
        </p>
      </CardBody>
    </Card>
  );
};

export default PostTag;
