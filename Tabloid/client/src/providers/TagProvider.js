import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const [tags, setTags] = useState([]);

  const getAllTags = () => {
    return fetch("/api/tag")
      .then((res) => res.json())
      .then(setTags);
  };

  const getTagById = (id) => {
    return fetch(`/api/tag/${id}`).then((res) => res.json());
  };

  const addTag = (tag) => {
    return fetch("/api/tag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });
  };

  const deleteTag = (tagId) => {
    return fetch(`/api/tag/${tagId}`, {
      method: "DELETE",
    }).then(getAllTags);
  };

  const updateTag = (tag) => {
    return fetch(`/api/tag/${tag.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });
  };

  const GetTagsByPostId = (postId) => {
    return fetch(`/api/tag/GetTagsByPostId${postId}`).then((res) => res.json());
  };

  return (
    <TagContext.Provider
      value={{
        tags,
        getAllTags,
        addTag,
        deleteTag,
        updateTag,
        getTagById,
        GetTagsByPostId,
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
