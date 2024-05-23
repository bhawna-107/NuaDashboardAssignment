import {useState } from 'react'
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';

const Register = () => {
 const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleRegister = async() =>{
    try{
      const res= await axios.post(url+ "/api/auth/register", {username,email,password});
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setErr(false);
      navigate("/login");
      console.log(res.data);
    }
    catch(err){
      setErr(true);
      console.error(err);

    }
  }
  return (
    <><div className="flex items-center justify-center m-5 p-8">
    <h1 className="font-bold md:text-2xl text-xl"><Link to="/">Welcome to NUA Book Store Dashboard</Link></h1>
    </div>
    <div className='flex justify-center items-center h-[65vh]  m-12'>
        <div className='flex flex-col space-y-4 md:w-[25%]'>
            <h1 className='font-bold text-xl text-center'>Create your account</h1>
            <input onChange= {(e) =>setUsername(e.target.value)} type='text' className='w-full border-2 border-black outline-0 p-1' placeholder='Enter your username' />
            <input onChange= {(e) =>setEmail(e.target.value)} type='text' className='w-full border-2 border-black outline-0 p-1' placeholder='Enter your email' />
            <input onChange= {(e) =>setPassword(e.target.value)} type='password' className='w-full border-2 border-black outline-0 p-1' placeholder='Enter your password' />
            <button onClick = {handleRegister} className='bg-black p-3 rounded-lg text-white'>Register</button>
            {err && <h3 className='text-red-500 text-sm'>Something went wrong</h3>}
            <div className='flex items-center justify-center space-x-1'>
                <p className='text-sm'>Already have an account</p>
                <span>?</span>
                <h2 className='text-gray-500 hover:text-black'><Link to="/login">Login</Link></h2>
            </div>
        </div>
    </div>
    </>
  )
}

export default Register