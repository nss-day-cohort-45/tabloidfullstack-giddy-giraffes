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

  const addTag = (tag) => {
    return fetch("/api/tag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });
  };

  return (
    <TagContext.Provider value={{ tags, getAllTags, addTag }}>
      {props.children}
    </TagContext.Provider>
  );
};
