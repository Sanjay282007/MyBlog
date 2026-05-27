import React from 'react'
import { Form, redirect } from "react-router-dom";
import { Container, Card, Input, TextArea, Button } from "./UI";

export async function action({ request }) {
    const formData = await request.formData();
    const id = formData.get("id");
    const updateData = {
        title: formData.get("title"),
        content: formData.get("content"),
        author: formData.get("author")
    };

    const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
    });

    if (!response.ok) alert("Post ID not found in database");
    return redirect("/");
}

function Update() {
    return (
        <Container>
            <Card>
                <h1 className="form-title-update">Update Post</h1>
                <p>Paste the ID from the Home page to update a specific post.</p>
                <Form method="post">
                    <Input name="id" placeholder="MongoDB ID (Copy from Home)" required />
                    <Input name="title" placeholder="New Title" required />
                    <Input name="author" placeholder="New Author" />
                    <TextArea name="content" placeholder="New Content" rows="5" required />
                    <Button type="submit">Update MongoDB Record</Button>
                </Form>
            </Card>
        </Container>
    )
}

export default Update