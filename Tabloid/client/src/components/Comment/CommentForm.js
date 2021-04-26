import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider.js";
import { CommentContext } from "../../providers/CommentProvider.js";
import { FormGroup, Label } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";


const CommentForm = () => {
    const history = useHistory();
    const { addComment } = useContext(CommentContext);
    const { postId } = useParams();

    const [comment, setComment] = useState({
        postId,
        subject: "",
        content: "",
    });

    const handleControlledInputChange = (event) => {
        const newComment = { ...comment }
        newComment[event.target.id] = event.target.value
        setComment(newComment)
    }


    const handleClickSaveComment = () => {
        addComment({
            postId: postId,
            subject: comment.subject,
            content: comment.content
        })
        //   .then(() => history.push(`/comment/${comment.postId}`))
    };


    return (
        <>
            <form className="commentForm">
                <h2 className="commentForm__subject">Add  Comment</h2>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="subject">Subject: </label>
                        <input
                            type="text"
                            id="subject"
                            onChange={handleControlledInputChange}
                            required
                            autoFocus
                            className="form-control"
                            placeholder="Subject"
                            value={comment.subject}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="content">Content: </label>
                        <input
                            type="text"
                            id="content"
                            onChange={handleControlledInputChange}
                            required
                            autoFocus
                            className="form-control"
                            placeholder="Content"
                            value={comment.content}
                        />
                    </div>
                </fieldset>

                <button
                    className="btn btn-primary"
                    onClick={(event) => {

                        handleClickSaveComment();
                    }}
                >
                    Add comment
        </button>
            </form>
        </>
    );
};

export default CommentForm;
