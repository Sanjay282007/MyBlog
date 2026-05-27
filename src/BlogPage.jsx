import { useLoaderData, Form, useNavigation } from "react-router-dom";

// RESTful GET: The Loader fetches data from the API before the page renders
export async function loader() {
  const response = await fetch("http://localhost:5000/api/posts");
  if (!response.ok) throw new Error("Failed to fetch posts from the real API");
  return response.json();
}

// RESTful POST/DELETE: The Action handles data mutations
export async function action({ request }) {
  const formData = await request.formData();
  const method = request.method.toUpperCase(); // Ensure consistency

  if (method === "POST") {
    const postData = {
      title: formData.get("title"),
      content: formData.get("content"),
      author: formData.get("author") || "Anonymous"
    };

    await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
  } else if (method === "DELETE") {
    const id = formData.get("id");
    await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "DELETE",
    });
  }

  return null; // React Router automatically re-runs the loader to refresh data
}

export default function BlogPage() {
  const posts = useLoaderData(); // This is the real data from MongoDB
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1>RESTful Blog (Real API)</h1>

      {/* CREATE Section */}
      <section style={{ background: "#f4f4f4", padding: "20px", borderRadius: "8px" }}>
        <h2>New Post</h2>
        <Form method="post" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input name="title" placeholder="Title" required />
          <input name="author" placeholder="Author Name" />
          <textarea name="content" placeholder="Content" rows="4" required />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving to Database..." : "Publish Post"}
          </button>
        </Form>
      </section>

      <hr style={{ margin: "40px 0" }} />

      {/* READ Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {posts.length === 0 && <p>No posts in database. Start writing!</p>}
        {posts.map((post) => (
          <article key={post._id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "5px" }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p><small>By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</small></p>
            
            {/* DELETE Section */}
            <Form method="delete">
              <input type="hidden" name="id" value={post._id} />
              <button style={{ color: "red", border: "1px solid red", background: "none", cursor: "pointer" }}>Delete</button>
            </Form>
          </article>
        ))}
      </div>
    </div>
  );
}
