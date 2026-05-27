import React, { useState}  from 'react'
import axios from 'axios'
import './Posts.css'
function Update() {
    const [userId, setUserId] = useState(0)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [Id, setId] = useState(0)

    function updatePost(e) {
        e.preventDefault()
        const formData = {
            "Id": Id,
            "userId": userId,
            "title": title,
            "body": body
        }
        axios.put('https://jsonplaceholder.typicode.com/posts/'+Id, formData)
            .then(response => {
                alert(`Post updated successfully! Status: ${response.status}`)
                setUserId(0)
                setTitle('')
                setBody('')
                setId(0)
            })
            .catch(error => alert(`Error: ${error.message}`))
    }

    return (
    <div className='posts'>
        <h1>Update Post</h1>
        <form onSubmit={updatePost}>
            <label htmlFor="id" value={Id}>
                ID:
            </label>
            <input type="number" onChange={(e) => setId(e.target.value)} />
            <label htmlFor="userid" value={userId}>
                User ID:
            </label>
            <input type="number" onChange={(e) => setUserId(e.target.value)} />
            <label htmlFor="title" value={title} >
                Title:
            </label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="body" value={body} >
                Body:
            </label>
            <textarea onChange={(e) => setBody(e.target.value)} />

            <input type='submit' value="Update"/>
        </form>
    </div>
    )
}

export default Update