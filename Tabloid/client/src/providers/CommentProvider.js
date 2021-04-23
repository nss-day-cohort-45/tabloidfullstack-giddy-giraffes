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
        console.log(postId, "this is post id")
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


    const deleteComment = (commentId) => {
        return getToken()
            .then(token => fetch(`/api/category/${commentId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(getAllComments));
    };


    return (
        <CommentContext.Provider value={{ comments, getAllComments, deleteComment }}>
            {props.children}
        </CommentContext.Provider>
    );
};
