import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
    //use state is used to change the value of first with the help of setfirst without reloading the element
    const [credentials, setcredentials] = useState({name:"", email:"", password:"",location:""})   

    const handleSubmit = async(e)=>{
        e.preventDefault();    //preventDefault is a synthetic event 
        const response = await fetch("https://quickbites-backend.onrender.com/api/createUser",{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.location})
        })
        const json = await response.json();
        console.log(json,"Here");

        if(!json.success){
            alert("Enter valid credentials here")
        }
    }
    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange}id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name ='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control" name='location' value={credentials.location} onChange={onChange} id="exampleInputPassword1" />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to ="/Login" className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
        </>
    )
}
