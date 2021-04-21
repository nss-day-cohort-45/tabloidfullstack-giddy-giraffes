import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";

import UserList from "././Users/UserProfileList";
import CategoryList from "./Category/CategoryList";
import CategoryForm from "./Category/CategoryForm";

import TagList from "./Tags/TagList";
import { TagForm } from "./Tags/TagForm";
import UserDetail from "./Users/UserDetails";
import PostList from "./Posts/PostList";
import PostForm from "./Posts/PostForm";
import PostDetails from "./Posts/PostDetails";
import MyPosts from "./Posts/MyPosts";
import PostTagForm from "./PostTagForm";

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

        <Route path="/userprofile" exact>
          <UserList />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/post/add" exact>
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/:id(\d+)" exact>
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/my-posts" exact>
          {isLoggedIn ? <MyPosts /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/userprofile/user:userId(\d+)">
          <UserDetail />
        </Route>

        <Route path="/category/add" exact>
          {isLoggedIn ? <CategoryForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category/edit/:categoryId(\d+)" exact>
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

        <Route path="/posttag/:postId(\d+)" exact>
          {isLoggedIn ? <PostTagForm /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </main>
  );
}
