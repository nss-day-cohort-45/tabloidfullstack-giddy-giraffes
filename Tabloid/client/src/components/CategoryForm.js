import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { CategoryContext } from "../providers/CategoryProvider";

export default function CategoryAddForm() {
    const history = useHistory();
    const { addCategory } = useContext(CategoryContext);
    const [Name, setName] = useState("");

    const Save = (e) => {
        const category = {
            Name,
        };

        addCategory(category).then((c) => {
            history.push("/category");
        });
    };

    return (
        <Form>
            <FormGroup>
                <Label for="categoryText">Category Name:</Label>
                <Input id="categoryText" type="text" onChange={(e) => setName(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Button onClick={Save}>Save</Button>
            </FormGroup>
        </Form>
    );
}