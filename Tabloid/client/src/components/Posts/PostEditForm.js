import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";

export const PostEditForm = () => {
    const { updatePost, getPostById } = useContext(PostContext);
    const { getAllCategories, categories } = useContext(CategoryContext);
    const { postId } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    // Set the initial state of post
    const [post, setPost] = useState({
        id: 0,
        title: "",
        content: "",
        imageLocation: "",
        publishDateTime: "",
        isApproved: Boolean,
        categoryId: 0
    });

    // Gets a list of all categories (for the category dropdown) &
    // Sets the state of post to the values from the original post
    useEffect(() => {
        getAllCategories()
        .then(getPostById(postId)
        .then(oldPost => {

            // Convert the original date mm/dd/yyyy to yyyy/mm/dd so the original date  
            // can be stored as the default value for the publish date input.
            oldPost.publishDateTime = new Date(oldPost.publishDateTime).toLocaleDateString('en-CA');
            
            // Save the original post to the local state variable, post
            setPost(oldPost);
        }))
    }, [])

    // Handles changes to any input field
    const handleControlledInputChange = (event) => {

        // saves the most recent version of the post object to newPost
        const newPost = { ...post };

        // Ex newPost[categoryId] = 2
        newPost[event.target.id] = event.target.value;

        // update state
        setPost(newPost);
    };

    // Handles saving the new edited post
    const handleClickEditPost = () => {
        
        // Check to make sure all relevant input fields have data
        if (post.title === "") return window.alert("Please enter a title.");   
        if (post.content === "") return window.alert("Please add content to the post.");
        if (post.imageLocation === "") return window.alert("Please add an image url.");
        if (post.publishDateTime === "") return window.alert("Please select a publish date.");

        //disable the button - no extra clicks
        setIsLoading(true);
        
        // Send the new post object to server side to update the original post
        updatePost({ 
            id: post.id,
            title: post.title,
            content: post.content,
            imageLocation: post.imageLocation,
            publishDateTime: post.publishDateTime,
            isApproved: post.isApproved,
            categoryId: post.categoryId
        });
    };

    return (
        <>
            <form className="postForm">
                <h2 className="postForm__title">Edit post</h2>

                {/* Title */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Title: </label>
                        <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Title" value={post.title} />
                    </div>
                </fieldset>

                {/* Content */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="content">Content: </label>
                        <input type="text" id="content" onChange={handleControlledInputChange} required autoFocus className="form-control"
                            placeholder="Content" value={post.content} />
                    </div>
                </fieldset>

                {/* Image */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="imageLocation">Image: </label>
                        <input type="text" id="imageLocation" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Image" value={post.imageLocation} />
                    </div>
                </fieldset>

                {/* Publish Date */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="publishDateTime">Date published: </label>
                        <input type="date" id="publishDateTime" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Date published" value={post.publishDateTime} />
                    </div>
                </fieldset>

                {/* Category */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="categoryId">Category: </label>
                        <select id="categoryId" className="form-control" value={post.categoryId} onChange={handleControlledInputChange}>
                            {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                        </select>
                    </div>
                </fieldset>

                {/* Save Button */}
                <button className="btn btn-primary"
                    disabled={isLoading}
                    onClick={event => {
                        event.preventDefault()
                        handleClickEditPost()
                    }}>
                    Save changes</button>
            </form>
        </>
    );
};

export default PostEditForm;