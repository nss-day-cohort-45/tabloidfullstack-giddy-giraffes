import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider.js";

export const PostEditForm = () => {
    const { updatePost, getPostById } = useContext(PostContext)
    const { postId } = useParams();
    //With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    //Define the initial state of the form inputs with useState()
    const [post, setPost] = useState({
        id: 0,
        title: "",
        content: "",
        imageLocation: "",
        publishDateTime: "",
        isApproved: Boolean,
        categoryId: 0
    });

    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(false);

    // Sets the state of post to the values from the original post
    useEffect(() => {
        getPostById(postId)
        .then((oldPost) => {
            oldPost.publishDateTime = new Date(oldPost.publishDateTime).toLocaleDateString('en-CA');
            setPost(oldPost);
        });
    }, [])

    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newPost = { ...post }

        /* post is an object with properties.
        Set the property to the new value using object bracket notation. */
        newPost[event.target.id] = event.target.value
        // update state
        setPost(newPost)
    }

    const handleClickSavePost = () => {
        const id = post.id
        const title = post.title
        const content = post.content
        const imageLocation = post.imageLocation
        const publishDateTime = post.publishDateTime
        const isApproved = true
        const categoryId = parseInt(post.categoryId)

        if (title === "") {
            window.alert("Please type in title of post")
        }

        else if (content === "") {
            window.alert("Please fill out content")
        }

        else if (imageLocation === "") {
            window.alert("Please insert image")
        }

        else if (publishDateTime === "") {
            window.alert("Please select a date")
        }

        else if (categoryId === 0 || categoryId === NaN) {
            window.alert("Please select a category")
        }

        else {
            //disable the button - no extra clicks
            setIsLoading(true); //this ensures the user cannot repeatedly click the button while the API is being updated

            updatePost({ 
                id,
                title,
                content,
                imageLocation,
                publishDateTime,
                isApproved,
                categoryId
            });
            //after we add the new post object, we then pass that new post object to our .then() function
            //then we grab the id of the new post
            //and we push the id of the new post object to our url

        }
    }

    return (
        <>
            <form className="postForm">
                <h2 className="postForm__title">Edit post</h2>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Title: </label>
                        <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Title" value={post.title} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="content">Content: </label>
                        <input type="text" id="content" onChange={handleControlledInputChange} required autoFocus className="form-control"
                            placeholder="Content" value={post.content} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="imageLocation">Image: </label>
                        <input type="text" id="imageLocation" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Image" value={post.imageLocation} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="publishDateTime">Date published: </label>
                        <input type="date" id="publishDateTime" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Date published" value={post.publishDateTime} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="categoryId">Category: </label>
                        <input type="text" id="categoryId" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Category" value={post.categoryId} />
                    </div>
                </fieldset>

                <button className="btn btn-primary"
                    disabled={isLoading}
                    onClick={event => {
                        event.preventDefault()
                        handleClickSavePost()
                    }}>
                    Save changes</button>
            </form>
        </>
    )
}

export default PostEditForm;