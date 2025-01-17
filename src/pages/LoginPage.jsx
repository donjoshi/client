import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate=useNavigate();

    const {setUser}=useContext(UserContext); 

    

    async function handleLoginSubmit(ev) {
        ev.preventDefault();

        try {
            const {data}=await axios.post('/login', {
                email,
                password,
            })
            setUser(data);

            console.log("after login success",data)

            alert('Login successful');
            setRedirect(true);
        }
        catch (err) {
            console.error(err);
            alert('Invalid email or password');
        }

    }

    if (redirect) 
    {
        return <Navigate to='/' />
    }


    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-32'>
                <h1 className='text-4xl text-center mb-3'>Login</h1>
                <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>

                    <input type="email" placeholder='your@gmail.com' value={email} onChange={ev => setEmail(ev.target.value)} />

                    <input type="password" placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)} />

                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-500'>
                        Dont have an account ?  <Link className='underline text-black' to={'/register'}>Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
