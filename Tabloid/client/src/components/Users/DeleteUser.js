import React, { useContext } from "react";
import { Card, CardBody } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Button } from "reactstrap";


const UserProfile = ({ user }) => {
    const { deleteUser } = useContext(UserProfileContext);

    const userProfileDelete = () => {
        deleteUser(user.id);
    }

    return (
        <Card className="m-4">
            <CardBody>
                <p>
                    <strong>{user.name}</strong>
                </p>
                <Button variant="secondary" onClick={() => {
                    const confirmBox = window.confirm(
                        "Are you sure you would like to delete this user?"
                    )
                    if (confirmBox === true) {
                        userProfileDelete(deleteCategory)
                    }
                }} className="delete-button">
                    Delete
                </Button>
            </CardBody>
        </Card>

    );

};
export default Category;