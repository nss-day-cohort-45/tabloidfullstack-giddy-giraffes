import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { PostTagContext } from "../../providers/PostTagProvider";
import { TagContext } from "../../providers/TagProvider";

import { useHistory, useParams } from "react-router-dom";
import PostTagDelete from "./PostTagDelete";

export const PostTagForm = () => {
  const { addPostTags } = useContext(PostTagContext);
  const { getAllTags, tags, setTags, GetTagsByPostId, tagsOnPost } = useContext(
    TagContext
  );

  const [postTags, setPostTags] = useState("");

  const [availableTags, setAvailableTags] = useState([]);
  const history = useHistory();
  const { postId } = useParams();

  const handleControlledInputChange = (event) => {
    console.log(postId);
    const newPostTag = { ...postTags };
    newPostTag.tagId = postTags;
    newPostTag.postId = postId;

    addPostTags(newPostTag).then(() => {
      history.go(0);
    });
  };

  // useEffect(() => {
  //   getAllTags()
  //     .then(setTags)
  //     .then(GetTagsByPostId(postId))
  //     .then((response) => {
  //       setTagsOnPost(response);
  //     })
  //     .then(() => {
  //       const taco = tags.filter((t) => !tagsOnPost.includes(t));
  //       setAvailableTags(taco);
  //     });
  // }, []);

  useEffect(() => {
    getAllTags();
  }, []);

  useEffect(() => {
    GetTagsByPostId(postId);
  }, [tags]);

  useEffect(() => {
    console.log(tags, "string");
    const taco = tags.filter((t) => tagsOnPost.forEach((tg) => tg.id != t.id));
    setAvailableTags(taco);
    console.log(taco, "flavor");
  }, [tagsOnPost]);

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
            {availableTags.map((t) => (
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

      <div>
        {tagsOnPost.map((t) => (
          <PostTagDelete key={t.id} postTag={t} />
        ))}
      </div>
    </form>
  );
};

export default PostTagForm;
