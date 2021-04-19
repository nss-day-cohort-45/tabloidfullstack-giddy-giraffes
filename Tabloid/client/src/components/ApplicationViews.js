import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import UserList from "./UserProfileList";
import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";
import TagList from "./TagList";
import { TagForm } from "./TagForm";

import PostList from "./Posts/PostList";
import PostDetails from "./Posts/PostDetails";
import MyPosts from "./Posts/MyPosts";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/userprofile">
          <UserList />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/post" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/:id" exact>
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/my-posts" exact>
            {isLoggedIn ? <MyPosts /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category/add" exact>
          {isLoggedIn ? <CategoryForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag" exact>
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag/edit/:tagId(\d+)" exact>
          {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag/add" exact>
          {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </main>
  );
}
