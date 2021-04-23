import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import "firebase/auth";
export const PostTagContext = createContext();

export const PostTagProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const [postTags, setPostTags] = useState([]);

  const addPostTags = (posttag) => {
    return getToken().then((token) => {
      return fetch("/api/posttag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(posttag), //this stringifies our post object meaning it changes our object into string object
      });
    });
  };

  // const addPostTags = (posttag) => {
  //   return fetch(`/api/posttag`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(posttag), //this stringifies our post object meaning it changes our object into string object
  //   });
  // };

  return (
    <PostTagContext.Provider value={{ addPostTags, postTags, setPostTags }}>
      {props.children}
    </PostTagContext.Provider>
  );
};
