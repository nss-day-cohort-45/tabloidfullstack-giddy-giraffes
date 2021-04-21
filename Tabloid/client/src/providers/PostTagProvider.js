import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostTagContext = React.createContext();

export const PostTagProvider = (props) => {
  const addPostTags = (posttag) => {
    return fetch("/api/posttag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posttag),
    });
  };

  return (
    <PostTagContext.Provider value={{ addPostTags }}>
      {props.children}
    </PostTagContext.Provider>
  );
};
