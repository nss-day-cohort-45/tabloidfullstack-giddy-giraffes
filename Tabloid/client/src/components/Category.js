import React from "react";
import { Card, CardBody } from "reactstrap";

const Category = ({ category }) => {
    return (
        <Card className="m-4">
            <CardBody>
                <p>
                    <strong>{category.name}</strong>
                </p>
            </CardBody>
        </Card>
    );
};
export default Category;