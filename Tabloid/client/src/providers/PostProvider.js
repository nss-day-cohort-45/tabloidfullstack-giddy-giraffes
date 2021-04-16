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

  //adding a new post
  const addPost = (post) => {
    return fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  };

  return (
    <PostContext.Provider value={{ posts, getPostById, getAllPosts, addPost }}>
      {props.children}
    </PostContext.Provider>
  );
};