import React from "react";
import { Link } from "react-router-dom"
import { Card, CardImg, CardBody } from "reactstrap";


const User = ({ user }) => {
    return (
        <Card className="m-4">
            <p className="text-left px-2"> User: {user.firstname}</p>
            <CardBody>
                <Link to={`/userprofile/user${user.id}`}>
                    {user.fullName}
                </Link>
                <p>
                    <strong>{user.fullName}</strong>
                </p>User Type:
                <p>{user.userType.name}</p>
                User Name:<p>{user.displayName}</p>

            </CardBody>
        </Card>
    );
};

export default User;
//  <CardImg top src={post.imageUrl} alt={post.title} />