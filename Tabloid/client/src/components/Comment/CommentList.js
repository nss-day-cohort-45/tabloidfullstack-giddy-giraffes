import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import Comment from "./Comment";

const CommentList = () => {
    const { comments, getAllComments } = useContext(CommentContext);

    // When the user arrives at localhost:3000/post, request all posts
    // that have been approved and that have a published date before this moment.
    // Posts are already sorted by published dates descending
    useEffect(() => {
        getAllComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Maps through each PostCategoryUser object, sending 
    // them to be converted to HTML then prints them all out.
    return (
        <section>
            {comments.map((c) => (
                <Comment key={c.id} comment={c} />
            ))}
        </section>
    );
};

export default CommentList;
