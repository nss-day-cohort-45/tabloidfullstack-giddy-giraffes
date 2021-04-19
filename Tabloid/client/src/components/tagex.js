import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { TagContext } from "../providers/TagProvider";

export default function TagAddForm() {
  const history = useHistory();
  const { addTag } = useContext(TagContext);
  const [Name, setName] = useState("");

  const Save = (e) => {
    const tag = {
      Name,
    };

    addTag(tag).then((t) => {
      history.push("/tag");
    });
  };

  return (
    <Form>
      <FormGroup>
        <Label for="tagText">Tag</Label>
        <Input
          id="tagText"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Button onClick={Save}>Save</Button>
      </FormGroup>
    </Form>
  );
}
