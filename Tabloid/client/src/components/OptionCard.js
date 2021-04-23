import React from "react";
import { Card, CardBody, CardHeader, CardText } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ tag }) => {
  return <option value="{tag.id}">{tag.name}</option>;
};

export default Post;
