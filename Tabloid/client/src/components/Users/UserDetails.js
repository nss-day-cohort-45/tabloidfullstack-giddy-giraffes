import React, { useContext, useEffect, useState } from "react"
import { UserProfileContext } from "../../providers/UserProfileProvider"
import { useParams, useHistory } from "react-router-dom"

const UserDetail = () => {
    const { getUserById } = useContext(UserProfileContext)

    const [user, setUser] = useState({})

    const { userId } = useParams();
    // how youre accesing the id you are telling application view to go get


    useEffect(() => {
        console.log("useEffect", userId)
        getUserById(userId)
            .then((response) => {

                setUser(response)
            })
    }, [])

    if (user.imageLocation == "") {
        var defaultAvatar = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
        user.imageLocation = defaultAvatar
    }

    if (user.createDateTime != "") {
        const event = new Date(user.createDateTime)
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        user.createDateTime = event.toLocaleDateString(options)
    }


    return (

        <section className="user">
            <img src={user.imageLocation} alt={defaultAvatar} width="200" height="300"></img>
            <h3 className="user__name">{user.fullName}</h3>
            <div className="user__email">Email: {user.email}</div>
            <div className="user__creationDate">{user.creationDate}</div>
            <div className="user__displayName">Display Name: {user.displayName}</div>
            <div className="user__profileType">Profile Type: {user.userType?.name}</div>
            <div className="user__CreationDate">Loyal User Since: {user.createDateTime}</div>

        </section >
    )
};
export default UserDetail;

