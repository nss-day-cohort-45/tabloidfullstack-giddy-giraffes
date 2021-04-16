import React, { useContext, useEffect, useState } from "react"
import { UserProfileContext } from "../../providers/UserProfileProvider"
import { useParams, useHistory } from "react-router-dom"
import avatar from '../images/avatar.png'
const UserDetail = () => {
    const { getUserById } = useContext(UserProfileContext)

    const [user, setUser] = useState({})

    const { userId } = useParams();
    // how youre accesing the id you are telling application view to go get

    useEffect((user) => {
        console.log("useEffect", userId)
        getUserById(userId)
            .then((response) => {
                setUser(response)
            })
    }, [])
    if (user.image === "https://robohash.org/doloremfugiatrerum.png?size=150x150&set=set1") {
        let defaultAvatar = avatar
        user.image = defaultAvatar
    }



    return (

        <section className="user">
            <img src={user.image} alt="avatar" width="500" height="600"></img>
            <h3 className="user__name">{user.fullName}</h3>
            <div className="user__image">{user.image}</div>
            <div className="user__email">Email: {user.email}</div>
            <div className="user__creationDate">{user.creationDate}</div>
            <div className="user__displayName">Display Name: {user.displayName}</div>
            <div className="user__profileType">Profile Type: {user.userType?.name}</div>
        </section>
    )
};
export default UserDetail;

