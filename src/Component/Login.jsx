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
    <div className='flex w-full h-screen'>
        <div className='flex flex-col w-[50%]  justify-center items-center gap-10 overflow-hidden'>
            <div className='font-bold text-3xl'><span className='text-orange-200'>nua</span> Book Dashboard</div>
            <div className='font-bold text-2xl'>Click below  to log in to Dashboard</div>
            <button className='text-white font-bold text-xl bg-orange-200 rounded-xl p-3' onClick={() => loginWithRedirect()}>Login</button> 
        </div>
        <div className='bg-orange-200 w-[50%] flex justify-center items-center text-9xl text-white'>
            <div>nua</div>
        </div>

    </div>
    
  )
}

export default Login
