import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { TagContext } from "../providers/TagProvider";

import { useHistory, useParams } from "react-router-dom";

export const PostTagForm = () => {
  const { addPostTag, getAllTags } = useContext(TagContext);

  const [tag, setTag] = useState({
    id: 0,
    Name: "",
  });

 

  const history = useHistory();
  const { postId } = useParams();

  const handleControlledInputChange = (event) => {
    const newTag = { ...tag };
    let selectedVal = event.target.value;
    if (event.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal);
    }

    newTag[event.target.id] = selectedVal;

    setTag(newTag);
  };

  // handleChange = (e) => {
  //   let value = Array.from(e.target.selectedOptions, option => option.value);
  //   this.setState({values: value});
  // }

  const handleClickSavePostTag = () => {
   

      if (tagId) {
        updateTag({
          id: tagId,
          Name: tag.Name,
        }).then(() => history.push(`/`));
      } else {
        addPostTag({
          PostId : postId
          TagId : tag.id,
        }).then(() => history.push(`/`));
      }
    }
  };

  useEffect(() => {
    getAllTags()
      
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
       
          onClick={(event) => {
            event.preventDefault();
            handleClickSaveTag();
          }}
        >
        Add Tags
        </Button>
      </div>
    </form>
  );
};
