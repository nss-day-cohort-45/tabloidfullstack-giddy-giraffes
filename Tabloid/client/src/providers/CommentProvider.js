import React, { useState, createContext, useContext } from "react";
import "firebase/auth";
import { UserProfileContext } from "./UserProfileProvider";
import { useHistory } from "react-router-dom";

export const CommentContext = createContext();


export const CommentProvider = (props) => {
    const [comments, setComments] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const history = useHistory();

    const getAllComments = (postId) => {
        return getToken()
            .then(token => fetch(`/api/comment/getCommentByPostId/${postId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(setComments));
    };
    //adding a new comment
    const addComment = (comment) => {
        debugger
        return getToken().then((token) => {
            return fetch(`/api/comment/add/${comment.postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(comment), //this stringifies our comment object meaning it changes our object into string object
            })
        });
    };
    //.then((res) => {
    //   const response = res.json();
    // return response;
    //}) //then send the stringified object(res), and we will use this in our PostForm after we add new object
    //.then((comment) => history.push(`/post/${postId}`));

    return (
        <CommentContext.Provider value={{ comments, getAllComments, addComment }}>
            {props.children}
        </CommentContext.Provider>
    );
};
