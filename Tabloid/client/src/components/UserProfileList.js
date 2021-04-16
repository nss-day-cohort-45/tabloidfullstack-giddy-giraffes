import React, { useContext, useEffect } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import User from "./User";

const UserList = () => {
    const { users, getAllUsers, } = useContext(UserProfileContext);

    useEffect(() => {
        getAllUsers();
    }, []);


    // useEffect dependency array with dependencies - will run if dependency changes (state)
    // searchTerms will cause a change


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {users.map((user) => {
                        return <User key={user.id} user={user} />
                    })}
                </div>
            </div>
        </div>
    );
};

export default UserList;