import React, { useState, createContext, useContext } from "react";
import "firebase/auth";
import { UserProfileContext } from "./UserProfileProvider";
import { useHistory } from "react-router-dom";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const { getToken } = useContext(UserProfileContext);
  const history = useHistory();

  const getAllPosts = () => {
    getToken().then((token) =>
      fetch("/api/post", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setPosts)
    );
  };

  //adding a new post
  const addPost = (post) => {
    return getToken().then((token) => {
      return fetch(`/api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post), //this stringifies our post object meaning it changes our object into string object
      })
        .then((res) => {
          const response = res.json();
          console.log(response);
          return response;
        }) //then send the stringified object(res), and we will use this in our PostForm after we add new object
        .then((postObject) => history.push(`/post/${postObject.id}`));
    });
  };

  const getPostById = (postId) => {
    return getToken().then((token) =>
      fetch(`/api/post/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };

  const getPostsByUser = () => {
    getToken().then((token) =>
      fetch("/api/post/user-posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setPosts)
    );
  };

  const deletePost = (postId) =>
    getToken().then((token) =>
      fetch(`/api/post/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(history.push("/my-posts"))
    );

  return (
    <PostContext.Provider
      value={{
        posts,
        getPostById,
        getAllPosts,
        addPost,
        getPostsByUser,
        deletePost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
