import React, { useContext, useEffect, useState } from "react"
import { UserProfileContext } from "../../providers/UserProfileProvider"
import { useParams, useHistory } from "react-router-dom"

export const UserDetail = () => {
    const { getUserById } = useContext(UserProfileContext)

    const [user, setUsers] = useState({})

    const { userId } = useParams();
    // how youre accesing the id you are telling application view to go get

    useEffect(() => {
        console.log("useEffect", userId)
        getUserById(userId)
            .then((response) => {
                setUsers(response)
            })
    }, [])



    return (
        <section className="user">
            <h3 className="user__name">{user.fullName}</h3>
            <div className="user__image">{user.image}</div>
            {/* What's up with the question mark???? it allows the response to not exisit and
      not break the app. show it if its there if its not there just leave blank*/}
            <div className="user__displayName">Display Name: {user.displayName}</div>
            <div className="user__profileType">Profile Type: {user.userType.name}</div>

        </section>
    )
}