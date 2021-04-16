import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
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

  return (
    <PostContext.Provider value={{ posts, getPostById, getAllPosts }}>
      {props.children}
    </PostContext.Provider>
  );
};