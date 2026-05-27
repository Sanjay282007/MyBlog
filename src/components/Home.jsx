import React, { useState, useEffect} from 'react'
import axios from 'axios'
import './Home.css'
function Home() {
    const [data, setData]=useState([])
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.data)
            .then(d => setData(d))
            console.log(data)
    }, [data])

    return (
        <div className='home'>
            <div className="home-header">
                <h1>Welcome to My Blog</h1>
            </div>
            {
                data.map((obj) => {
                    return (
                        <div className="blog">
                            <h1>{obj.title}</h1>
                            <p>{obj.body}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home