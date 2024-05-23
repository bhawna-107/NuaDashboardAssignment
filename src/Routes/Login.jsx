import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook


const Login = () => {

    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const navigate = useNavigate(); // Get the navigate function from useNavigate

    if (isAuthenticated) {
        navigate('/dashboard');
      }

      console.log(user, "currentuser");

    return (
    <div className='flex w-full gap-5'>
        <div className='flex flex-col w-[50%] h-[100%] justify-center items-center gap-10 mt-40'>
            <div className='font-bold text-3xl'>Welcome to the NUA Book Dashboard</div>
            <div className='font-bold text-2xl'>Click on the below button to log in to Dashboard</div>
            <button className='font-bold text-xl' onClick={() => loginWithRedirect()}>Login</button> 
        </div>
        <div className='bg-orange-200 w-[50%] h-screen flex justify-center items-center text-7xl text-white'>
            <div>NUA</div>
        </div>

    </div>
    
  )
}

export default Login
