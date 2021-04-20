import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostTagContext = React.createContext();

export const PostTagProvider = (props) => {
  const addPostTag = (posttag) => {
    return fetch("/api/posttag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posttag),
    });
  };

  return (
    <TagContext.Provider value={{ addPostTag }}>
      {props.children}
    </TagContext.Provider>
  );
};
