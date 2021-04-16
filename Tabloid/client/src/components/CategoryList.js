import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../providers/CategoryProvider";
import Category from "./Category";

const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <section>
            {categories.map((c) => (
                <Category key={c.id} category={c} />
            ))}
        </section>
    );
};

export default CategoryList;