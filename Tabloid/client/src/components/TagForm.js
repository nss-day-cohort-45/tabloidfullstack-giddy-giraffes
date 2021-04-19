import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { TagContext } from "../providers/TagProvider";

import { useHistory, useParams } from "react-router-dom";

export const TagForm = () => {
  const { addTag, getTagById, updateTag, getAllTags } = useContext(TagContext);

  const [tag, setTag] = useState({
    Name: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const { tagId } = useParams();

  const handleControlledInputChange = (event) => {
    const newTag = { ...tag };
    let selectedVal = event.target.value;
    if (event.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal);
    }

    newTag[event.target.id] = selectedVal;

    setTag(newTag);
  };

  const handleClickSaveTag = () => {
    if (tag.name === "") {
      window.alert("Please enter a name");
    } else {
      setIsLoading(true);

      if (tagId) {
        updateTag({
          id: tagId,
          Name: tag.Name,
        }).then(() => history.push(`/tag`));
      } else {
        addTag({
          Name: tag.Name,
        }).then(() => history.push(`/tag`));
      }
    }
  };

  useEffect(() => {
    getAllTags().then(() => {
      if (tagId) {
        getTagById(tagId).then((t) => {
          setTag(t);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <form className="tagForm">
      <h2 className="tagForm__title">{tagId ? "Save Tag" : "Add Tag"}</h2>

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
        <fieldset>
          <div className="form-group">
            <label htmlFor="Name">Tag name:</label>
            <input
              type="text"
              id="Name"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Tag name"
              value={tag.Name}
            />
          </div>
        </fieldset>

        <Button
          variant="secondary"
          style={{
            color: "black",
          }}
          className="add_button"
          disabled={isLoading}
          onClick={(event) => {
            event.preventDefault();
            handleClickSaveTag();
          }}
        >
          {tagId ? "Save Tag" : "Add Tag"}
        </Button>
      </div>
    </form>
  );
};
