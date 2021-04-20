import React, { useContext, useEffect, useState } from "react"

import { PostContext } from "../../providers/PostProvider.js";

export const PostForm = () => {
    const { addPost } = useContext(PostContext)

    //With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    //Define the initial state of the form inputs with useState()
    const [post, setPost] = useState({
        title: "",
        content: "",
        imageLocation: "",
        createDateTime: "",
        isApproved: Boolean,
        categoryId: 0
    });

    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(false);



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
    useEffect(() => {
    }, [post])

    const handleClickSavePost = () => {
        console.log(post)

        const title = post.title
        const content = post.content
        const imageLocation = post.imageLocation
        const createDateTime = post.createDateTime
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

        else if (createDateTime === "") {
            window.alert("Please select a date")
        }

        else if (categoryId === 0 || categoryId === NaN) {
            window.alert("Please select a category")
        }

        else {
            //disable the button - no extra clicks
            setIsLoading(true); //this ensures the user cannot repeatedly click the button while the API is being updated

            //POST - add
            addPost({ //if not, this must be a new note so the input fields will be empty
                title: post.title,
                content: post.content,
                imageLocation: post.imageLocation,
                createDateTime: post.createDateTime,
                isApproved: true,
                categoryId: post.categoryId
            })
            //after we add the new post object, we then pass that new post object to our .then() function
            //then we grab the id of the new post
            //and we push the id of the new post object to our url

        }
    }

    return (
        <>
            <form className="postForm">
                <h2 className="postForm__title">Add new post</h2>

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
                        <label htmlFor="createDateTime">Date created: </label>
                        <input type="date" id="createDateTime" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Date created" value={post.createDateTime} />
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
                    Add post</button>
            </form>
        </>
    )
}

export default PostForm;