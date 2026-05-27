import React from 'react'
import { useLoaderData } from "react-router-dom";
import { Container } from "./UI";
import "./Home.css";

export async function loader() {
    const response = await fetch("http://localhost:5000/api/posts");
    if (!response.ok) throw new Error("Could not fetch database posts");
    return response.json();
}

function Home() {
    const posts = useLoaderData();

    return (
        <div className="home">
            <div className="home-header">
                <h1>Recent Stories</h1>
                <p>Welcome to MyBlog. Explore the latest insights from our community.</p>
            </div>
            <Container>
                {posts.length === 0 && <p>No posts found in MongoDB. Go to "Create" to add one!</p>}
                {posts.map((post) => (
                    <div className="blog" key={post._id}>
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>
                        <small className="blog-footer">
                            By <strong>{post.author || "Anonymous"}</strong> • ID: <code>{post._id}</code>
                        </small>
                    </div>
                ))}
            </Container>
        </div>
    )
}

export default Home