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


    const addCategory = (category) => {
        return fetch("/api/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        });
    };


    const deleteCategory = (categoryId) => {
        return fetch(`/api/category/${categoryId}`, {
            method: "DELETE",
        }).then(getAllCategories);
    };


    const updateCategory = (category) => {
        return fetch(`/api/category/${category.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        });
    };


    return (
        <CategoryContext.Provider value={{ categories, getAllCategories, addCategory, deleteCategory, updateCategory }}>
            {props.children}
        </CategoryContext.Provider>
    );
};