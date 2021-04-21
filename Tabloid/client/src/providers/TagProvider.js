import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import "firebase/auth";
export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const [tags, setTags] = useState([]);

  const getAllTags = () => {
    return getToken().then((token) =>
      fetch("/api/tag", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setTags)
    );
  };

  const getTagById = (id) => {
    return getToken().then((token) =>
      fetch(`/api/tag/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };

  const addTag = (tag) => {
    return getToken().then((token) => {
      fetch(`/api/tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tag), //this stringifies our post object meaning it changes our object into string object
      });
    });
  };

  const deleteTag = (tagId) =>
    getToken().then((token) =>
      fetch(`/api/tag/${tagId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(getAllTags)
    );

  const updateTag = (tag) => {
    return getToken().then((token) =>
      fetch(`/api/tag/${tag.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
      })
    );
  };

  const GetTagsByPostId = (postId) => {
    return getToken().then((token) =>
      fetch(`/api/tag/GetTagsByPostId${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
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
