import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { PostTagContext } from "../providers/PostTagProvider";
import { TagContext } from "../providers/TagProvider";
import OptionCard from "./OptionCard";
import { useHistory, useParams } from "react-router-dom";

export const PostTagForm = () => {
  const { addPostTags } = useContext(PostTagContext);
  const { getAllTags, tags } = useContext(TagContext);
  const [arrtags, arrsetTags] = useState([]);

  const [tag, setTag] = useState({
    id: 0,
    Name: "",
  });

  const history = useHistory();
  const { id } = useParams();

  const handleControlledInputChange = (event) => {
    // let selectedVal = event.target.value;
    // let selectedVals = [...selectedVal.options].filter(
    //   (option) => option.selectedVals
    // );

    // arrsetTags(selectedVals);

    let selected = [];
    for (let option of event.target.options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    arrsetTags(selected);
  };

  const handleClickSavePostTag = () => {
    arrtags.map((t) =>
      addPostTags({
        PostId: id,
        TagId: t.id,
      }).then(() => history.push(`/post/${id}`))
    );
  };

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <form className="postTagForm">
      <Button
        variant
        className="back_button"
        onClick={() => {
          history.goBack();
        }}
      >
        Back
      </Button>

      <div className="form_background">
        <FormGroup>
          <div className="form-group">
            <Label htmlFor="Name">Tag name:</Label>
            <Input
              type="select"
              name="Tags"
              className="form-control"
              autoFocus
              required
              onChange={handleControlledInputChange}
              id="Tag"
              multiple
            >
              {tags.map((t) => (
                <OptionCard key={t.id} tag={t} />
              ))}
            </Input>
          </div>
        </FormGroup>

        <Button
          variant="secondary"
          style={{
            color: "black",
          }}
          className="add_button"
          onClick={(event) => {
            event.preventDefault();
            handleClickSavePostTag();
          }}
        >
          Add Tags
        </Button>
      </div>
    </form>
  );
};

export default PostTagForm;
