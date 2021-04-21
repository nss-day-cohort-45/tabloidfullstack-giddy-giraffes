import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [categories, setCategories] = useState([]);

    const getAllCategories = () => {
        return getToken()
        .then(token => fetch("/api/category",{
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then(setCategories));
    };

    const getCategoryById = (id) => {
        return getToken()
        .then(token => fetch(`/api/category/${id}`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json()));
    };

    const addCategory = (category) => {
        return getToken()
        .then(token => fetch("/api/category", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category),
        }));
    };

    const deleteCategory = (categoryId) => {
        return getToken()
        .then(token => fetch(`/api/category/${categoryId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(getAllCategories));
    };

    const updateCategory = (category) => {
        return getToken()
        .then(token => fetch(`/api/category/${category.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category),
        })
        .then(getAllCategories))
    };

    return (
        <CategoryContext.Provider value={{ categories, getAllCategories, getCategoryById, addCategory, deleteCategory, updateCategory }}>
            {props.children}
        </CategoryContext.Provider>
    );
};