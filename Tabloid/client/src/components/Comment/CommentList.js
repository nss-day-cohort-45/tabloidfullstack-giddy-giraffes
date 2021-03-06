import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import Comment from "./Comment";
import { useParams } from "react-router-dom";

const CommentList = () => {
    const { comments, getAllComments } = useContext(CommentContext);
    const { id } = useParams();

    useEffect(() => {
        getAllComments(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Maps through each PostCategoryUser object, sending 
    // them to be converted to HTML then prints them all out.
    return (
        <section>
            <Link to={`/comment/getCommentByPostId/${id}`} className="nav-link">

            </Link>
            {comments.map((c) => (
                <Comment key={c.id} comment={c} />
            ))}
        </section>
    );
};

export default CommentList;
