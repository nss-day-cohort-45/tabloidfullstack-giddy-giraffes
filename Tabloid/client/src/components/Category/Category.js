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
                <Button variant="secondary" onClick={categoryDelete} className="btn-primary">
                    Delete
                </Button>
            </CardBody>
        </Card>
    );
};
export default Category;