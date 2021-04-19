import React, { useContext } from "react";
import { Card, CardBody } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Button } from "reactstrap";


const Category = ({ category }) => {
    const { deleteCategory } = useContext(CategoryContext);

    const categoryDelete = () => {
        deleteCategory(category.id);
    }

    return (
        <Card className="m-4">
            <CardBody>
                <p>
                    <strong>{category.name}</strong>
                </p>
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