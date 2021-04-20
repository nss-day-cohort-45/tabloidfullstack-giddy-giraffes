import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";

export default function CategoryForm() {
    const history = useHistory();
    const { addCategory, getCategoryById, getAllCategories, updateCategory } = useContext(CategoryContext);

    const [category, setCategory] = useState({
        Name: "",
    });

    const [isLoading, setIsLoading] = useState(true);

    const { categoryId } = useParams();


    const handleControlledInputChange = (event) => {
        const newCategory = { ...category };
        let selectedVal = event.target.value;
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal);
        }

        newCategory[event.target.id] = selectedVal;

        setCategory(newCategory);
    };


    const handleClickSaveCategory = () => {
        if (category.name === "") {
            window.alert("Please enter a name");
        } else {
            setIsLoading(true);

            if (categoryId) {
                updateCategory({
                    id: categoryId,
                    Name: category.Name,
                }).then(() => history.push(`/category`));
            } else {
                addCategory({
                    Name: category.Name,
                }).then(() => history.push(`/category`));
            }
        }
    };


    useEffect(() => {
        getAllCategories().then(() => {
            if (categoryId) {
                getCategoryById(categoryId).then((c) => {
                    setCategory(c);
                    setIsLoading(false);
                });
            } else {
                setIsLoading(false);
            }
        });
    }, []);


    return (
        <Form>
            <FormGroup>
                <h2 className="categoryForm__title">{categoryId ? "Save Category" : "Add Category"}</h2>

                <Button variant className="back-button" onClick={() => {
                    history.goBack();
                }}>
                </Button>

                <div className="form-background">
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="Name">Category name:</label>
                            <input type="text" id="Name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Category name" value={category.Name} />
                        </div>
                    </fieldset>

                    <Button variant="secondary" className="add-button" disabled={isLoading} onClick={(event) => {
                        event.preventDefault();
                        handleClickSaveCategory();
                    }}>
                        {categoryId ? "Save Category" : "Add Category"}
                    </Button>

                </div>
            </FormGroup>
        </Form>
    );
}