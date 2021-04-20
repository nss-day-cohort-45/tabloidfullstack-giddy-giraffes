import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { CategoryProvider } from "./providers/CategoryProvider";
import { TagProvider } from "./providers/TagProvider";
import { PostProvider } from "./providers/PostProvider";

function App() {
    return (
        <Router>
            <CategoryProvider>
                <TagProvider>
                    <UserProfileProvider>
                        <PostProvider>
                            <Header />
                            <ApplicationViews />
                        </PostProvider>
                    </UserProfileProvider>
                </TagProvider>
            </CategoryProvider>
        </Router>
    );
}

export default App;
