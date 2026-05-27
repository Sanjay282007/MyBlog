import React from 'react'
import { Form, redirect } from "react-router-dom";
import { Container, Card, Input, Button } from "./UI";

export async function action({ request }) {
    const formData = await request.formData();
    const id = formData.get("id")?.trim();

    if (!id) {
        alert("Please provide a valid ID");
        return null;
    }

    const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        alert("Post ID not found. Copy the ID exactly from the Home page.");
        return null;
    }
    return redirect("/");
}

function Delete() {
    return (
        <Container>
            <Card>
                <h1 className="form-title-delete">Delete Post</h1>
                <p>Enter the MongoDB ID of the post you want to remove. You can find this on the Home page.</p>
                <Form method="post">
                    <Input name="id" placeholder="e.g., 65ba1234..." required />
                    <Button variant="danger" type="submit">Remove from Database</Button>
                </Form>
            </Card>
        </Container>
    )
}

export default Delete