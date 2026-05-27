import React, { useState}  from 'react'
import axios from 'axios'
import './Posts.css'
function Posts() {
    const [userId, setUserId] = useState(0)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    function sendPost(e) {
        e.preventDefault()
        const formData = {
            "userId": userId,
            "title": title,
            "body": body
        }
        axios.post('https://jsonplaceholder.typicode.com/posts', formData)
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
        <h1>Send a Post</h1>
        <form onSubmit={sendPost}>
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

            <input type='submit' value="Send"/>
        </form>
    </div>
    )
}

export default Posts