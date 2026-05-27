import React, { useState}  from 'react'
import axios from 'axios'
import './Posts.css'
function Delete() {
    
    const [Id, setId] = useState(0)

    function deletePost(e) {
        e.preventDefault()
        axios.delete('https://jsonplaceholder.typicode.com/posts/'+Id)
            .then(response => {
                alert(`Post deleted successfully! Status: ${response.status}`)
            })
            .catch(error => alert(`Error: ${error.message}`))
    }
    return (
    <div className='posts'>
        <h1>Delete a Post</h1>
        <form onSubmit={deletePost}>
            <label htmlFor="id" value={Id}>
                ID:
            </label>
            <input type="number" onChange={(e) => setId(e.target.value)} />

            <input type='submit' value="Delete"/>
        </form>
    </div>
    )
}

export default Delete