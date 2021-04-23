import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { PostTagContext } from "../providers/PostTagProvider";
import { TagContext } from "../providers/TagProvider";
import OptionCard from "./OptionCard";
import { useHistory, useParams } from "react-router-dom";

export const PostTagForm = () => {
  const { addPostTags } = useContext(PostTagContext);
  const { getAllTags, tags, setTags } = useContext(TagContext);
  const [postTags, setPostTags] = useState("");

  const history = useHistory();
  const { postId } = useParams();
  const handleControlledInputChange = (event) => {
    // let selectedVal = event.target.value;
    // let selectedVals = [...selectedVal.options].filter(
    //   (option) => option.selectedVals
    // );
    // arrsetTags(selectedVals);
    // let selected = [];
    // for (let option of event.target.options) {
    //   if (option.selected) {
    //     selected.push(option.value);
    //   }
    // }
    // arrsetTags(selected);

    console.log(postId);
    const newPostTag = { ...postTags };
    newPostTag.tagId = postTags;
    newPostTag.postId = postId;

    addPostTags(newPostTag).then(history.push(`/post/${postId}`));
  };

  useEffect(() => {
    getAllTags().then(setTags);
  }, []);

  return (
    <form className="postTagForm">
      <Button
        className="back_button"
        onClick={() => {
          history.goBack();
        }}
      >
        Back
      </Button>

      <div className="form_background">
        <FormGroup>
          <Label for="postTag">Add a Tag </Label>
          <select id="postTag" onChange={(e) => setPostTags(e.target.value)}>
            <option value="0">Select a tag </option>
            {tags.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </FormGroup>

        <Button
          variant="secondary"
          style={{
            color: "black",
          }}
          className="add_button"
          onClick={handleControlledInputChange}
        >
          Add Tags
        </Button>
      </div>
    </form>
  );
};

export default PostTagForm;
