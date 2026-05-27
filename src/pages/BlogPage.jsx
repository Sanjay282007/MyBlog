import { useLoaderData, Form, useNavigation } from "react-router-dom";
import { Container, Navbar, Card, Input, TextArea, Button } from "../components/UI";

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
    <div style={{ background: "#f9fafb", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <Navbar />
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "30px" }}>
          
          {/* Sidebar Form (CREATE) */}
          <aside>
            <Card>
              <h3 style={{ marginTop: 0 }}>Create New Post</h3>
              <Form method="post">
                <Input name="title" placeholder="Post Title" required />
                <Input name="author" placeholder="Your Name" />
                <TextArea name="content" placeholder="What's on your mind?" rows="5" required />
                <Button type="submit" disabled={isSubmitting} style={{ width: "100%" }}>
                  {isSubmitting ? "Publishing..." : "Publish Post"}
                </Button>
              </Form>
            </Card>
          </aside>

          {/* Feed (READ) */}
          <main>
            <h2 style={{ marginTop: 0 }}>Recent Stories</h2>
            {posts.length === 0 && <p style={{ color: "#6b7280" }}>Your feed is empty. Be the first to post!</p>}
            {posts.map((post) => (
              <Card key={post._id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <h3 style={{ margin: "0 0 10px 0", color: "#111827" }}>{post.title}</h3>
                  <Form method="delete">
                    <input type="hidden" name="id" value={post._id} />
                    <Button variant="danger">Delete</Button>
                  </Form>
                </div>
                <p style={{ color: "#374151", lineHeight: "1.6" }}>{post.content}</p>
                <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>Written by <strong>{post.author}</strong> • {new Date(post.createdAt).toLocaleDateString()}</p>
              </Card>
            ))}
          </main>
        </div>
      </Container>
    </div>
  );
}