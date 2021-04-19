import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
<<<<<<< HEAD
import UserList from "./UserProfileList";
import CategoryList from "./Category/CategoryList";
import CategoryForm from "./Category/CategoryForm";
=======
import UserList from "././Users/UserProfileList";
import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";
>>>>>>> 6c97c79142759359e232325214dace0c0a9b7b38
import TagList from "./TagList";
import { TagForm } from "./TagForm";
import UserDetail from "./Users/UserDetails"
import PostList from "./Posts/PostList";
import PostDetails from "./Posts/PostDetails";

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

        <Route path="/post" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/:id" exact>
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
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