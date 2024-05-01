import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Form = () => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('');
    const [age,setAge] = useState('');
    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault();
        console.log(name);

        // Store data in cookie Format
        document.cookie = `name=${name}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        document.cookie = `email=${email}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        document.cookie = `age=${age}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;

        axios.post("http://localhost:3000/createUser",{name,email,age})
            .then(res => {
                console.log(res.data);
                navigate("/users");
            })
            .catch(err => console.error(err));
    }

    const handelLogOut = () => {
        // Clear cookies related to your application
        document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'age=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
        navigate('/');
    }
    return (
        <div>
            <form onSubmit={submit}>
                <input type="text" placeholder='Enter your name' required className='input' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder='Enter your email' required className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="number" placeholder='Enter your age' required className='input' value={age} onChange={(e) => setAge(e.target.value)} />
                <button type='submit' className='submit'> Submit </button>
            </form>
            <button className='cont' onClick={handelLogOut}> LogOut </button>
        </div>
    )
}

export default Form