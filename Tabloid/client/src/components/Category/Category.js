import React, { useContext } from "react";
import { Card, CardBody } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Button } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Category = ({ category }) => {
    const { deleteCategory, updateCategory } = useContext(CategoryContext);

    const history = useHistory();

    const categoryDelete = () => {
        deleteCategory(category.id);
    }


    return (
        <Card className="m-4">
            <CardBody>
                <p>
                    <strong>{category.name}</strong>
                </p>

                <Button type="button" onClick={() => {
                    const confirmBox = window.confirm("Do you really want to edit this Category?")
                    if (confirmBox === true) {
                        history.push(`/category/edit/${category.id}`)
                    }
                }} className="edit-button">
                    Edit
                    </Button>

                <Button variant="secondary" onClick={() => {
                    const confirmBox = window.confirm(
                        "Do you really want to delete this Category?"
                    )
                    if (confirmBox === true) {
                        categoryDelete(deleteCategory)
                    }
                }} className="delete-button">
                    Delete
                </Button>
            </CardBody>
        </Card>

    );

};
export default Category;