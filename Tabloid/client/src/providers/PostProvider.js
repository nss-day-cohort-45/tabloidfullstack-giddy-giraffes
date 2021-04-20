import React, { useState, createContext, useContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserProfileContext } from "./UserProfileProvider"
import { useHistory } from 'react-router-dom';

export const PostContext = createContext();


export const PostProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    return fetch("/api/post")
      .then(res => res.json())
      .then(setPosts);
  };

  const getPostById = (postId) => {
    return fetch(`/api/post/${postId}`)
      .then(res => res.json())
  };

  const history = useHistory();

  //adding a new post
  const addPost = (post) => {
    return getToken().then(token => {
      return fetch(`/api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post), //this stringifies our post object meaning it changes our object into string object
      })
        .then(res => {
          const response = res.json()
          console.log(response)
          return response;
        }) //then send the stringified object(res), and we will use this in our PostForm after we add new object
        .then((postObject) => history.push(`/post/${postObject.id}`))
    });
  }
  return (
    <PostContext.Provider value={{ posts, getPostById, getAllPosts, addPost }}>
      {props.children}
    </PostContext.Provider>
  );
};