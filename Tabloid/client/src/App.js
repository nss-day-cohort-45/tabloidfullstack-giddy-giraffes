import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { CategoryProvider } from "./providers/CategoryProvider";
import { TagProvider } from "./providers/TagProvider";
import { PostProvider } from "./providers/PostProvider";
import { CommentProvider } from "./providers/CommentProvider";

function App() {

    return (
        <Router>
            <UserProfileProvider>
                <CategoryProvider>
                    <TagProvider>
                        <PostProvider>
                            <CommentProvider>
                                <Header />
                                <ApplicationViews />
                            </CommentProvider>
                        </PostProvider>
                    </TagProvider>
                </CategoryProvider>
            </UserProfileProvider>
        </Router>
    );
}

export default App;
