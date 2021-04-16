import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { CategoryProvider } from "./providers/CategoryProvider";
import { TagProvider } from "./providers/TagProvider";

function App() {
      return (
            <Router>
                  <CategoryProvider>
                        <TagProvider>
                              <UserProfileProvider>
                                    <Header />
                                    <ApplicationViews />
                              </UserProfileProvider>
                        </TagProvider>
                  </CategoryProvider>
            </Router>
      );
}

export default App;
