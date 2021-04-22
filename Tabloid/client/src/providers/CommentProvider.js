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
        getToken()
            .then(token => fetch(`/api/GetCommentByPostId/${postId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(setComments));
    };

    return (
        <CommentContext.Provider value={{ comments, getAllComments }}>
            {props.children}
        </CommentContext.Provider>
    );
};
