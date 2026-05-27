import React from 'react'
import { Form, redirect, useNavigation } from "react-router-dom";
import { Container, Card, Input, TextArea, Button } from "./UI";

export async function action({ request }) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData);
    
    const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
    });

    if (!response.ok) alert("Error saving to MongoDB");
    return redirect("/");
}

function Posts() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <Container>
            <Card>
                <h1>Create New Post</h1>
                <Form method="post">
                    <Input name="title" placeholder="Title" required />
                    <Input name="author" placeholder="Author Name" required />
                    <TextArea name="content" placeholder="Content" rows="6" required />
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Syncing with MongoDB..." : "Publish Post"}
                    </Button>
                </Form>
            </Card>
        </Container>
    )
}

export default Posts