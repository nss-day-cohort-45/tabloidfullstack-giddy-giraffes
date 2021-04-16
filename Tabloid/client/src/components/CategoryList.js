import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../providers/CategoryProvider";
import Category from "./Category";
import { Link } from "react-router-dom";

const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <section>
            <Link to="/category/add" className="nav-link">
                New Category
        </Link>
            {categories.map((c) => (
                <Category key={c.id} category={c} />
            ))}
        </section>
    );
};

export default CategoryList;


