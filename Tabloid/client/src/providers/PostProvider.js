import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const getAllPosts = () => {
    getToken()
    .then(token => fetch("/api/post",{
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(setPosts));
  };

  const getPostById = (postId) => {
<<<<<<< HEAD
    return fetch(`/api/post/${postId}`)
      .then(res => res.json())
=======
    return getToken()
    .then(token => fetch(`/api/post/${postId}`,{
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json()))
>>>>>>> 0ad723b22c31d0952279d1d0d171c38e79263ae0
  };

  const getPostsByUser = () => {
    getToken()
    .then(token => fetch("/api/post/user-posts",{
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(setPosts));
};

  return (
    <PostContext.Provider value={{ posts, getPostById, getAllPosts, getPostsByUser }}>
      {props.children}
    </PostContext.Provider>
  );
};