import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([]);

    const getAllCategories = () => {
        return fetch("/api/category")
            .then((res) => res.json())
            .then(setCategories);
    };



    return (
        <CategoryContext.Provider value={{ categories, getAllCategories }}>
            {props.children}
        </CategoryContext.Provider>
    );
};