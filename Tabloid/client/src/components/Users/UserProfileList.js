import React, { useContext, useEffect, useState } from "react";
import { Button } from 'reactstrap';
import { UserProfileContext } from "../../providers/UserProfileProvider";

import User from "./User";

const UserList = () => {
    const { users, getAllUsers, getDeactivatedUserProfiles } = useContext(UserProfileContext);
    const [viewingDeactivated, setViewingDeactivated] = useState(false);
    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        if (viewingDeactivated) {
            getDeactivatedUserProfiles().then(setViewingDeactivated);
        } else {
            getAllUsers().then(setViewingDeactivated);
        }
    }, [viewingDeactivated]);

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
                <div className="text-center">
                    {viewingDeactivated ? (
                        <h1>Deactivated Users</h1>
                    ) : (
                        <h1>Active Users</h1>
                    )}
                    {viewingDeactivated ? (
                        <Button
                            color="success"
                            onClick={() => {
                                setViewingDeactivated(false);
                            }}
                        >
                            View Active Users
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                setViewingDeactivated(true);
                            }}
                        >
                            View Deactivated Users
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserList;