import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import axios from 'axios'
const Registerpage = () => {
  const navigate = useNavigate()
  const [inputname, setInputname] = useState("");
  const [inputemail, setInputemail] = useState("");
  const [inputpassword, setInputpassword] = useState("");
  const [losign, setlosign] = useState('Create your account')
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  // Signup Function        https://chatappmern-j3tu.onrender.com
  const signup = async (username, email, password) => {
    try {
      const response = await axios.post('https://chatappmern-j3tu.onrender.com/auth/register', {
        name: username, email, password
      })
      console.log(response.data.message)
      enqueueSnackbar("Account created Successfully. Please Signin", { variant: 'success' })
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "An error occurred during signup.";
      enqueueSnackbar(errorMessage, { variant: 'error' })
    }
  }


  // Login Function
  const login =async (email, password) => {
    try {
      const response = await axios.post('https://chatappmern-j3tu.onrender.com/auth/login', {
        email, password
      })
      const token = response.data.token
      if (token) {
        localStorage.setItem('authtoken', token)
        navigate('/home')
        enqueueSnackbar("Signed in Successfully", { variant: 'success' })
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "An error occurred during login.";
      enqueueSnackbar(errorMessage, { variant: 'error' })
    }
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      if (losign === 'Create your account') {
        await signup(username, email, password);
        navigate('/home');

      } else {
        await login(email, password); // Login on submit

      }
    } catch (error) {
      console.log('abbey yaar', error);
    }
  }

  const handleinputuserchange = (e) => {
    setInputname(e.target.value);
    setusername(e.target.value);
}

const handleinputemailchange = (e) => {
    setInputemail(e.target.value);
    setemail(e.target.value);
}

const handleinputpasswordchange = (e) => {
    setInputpassword(e.target.value);
    setpassword(e.target.value);
}

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='flex items-center justify-center flex-wrap p-3'>
        <div className='flex items-center justify-center'>
          <img className='lg:w-[10%] w-[20%]' src="https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Chat-2-1024.png" alt="" />
        </div>
        <div>
          <h1 className='text-white font-extrabold text-6xl mb-10 text-center'>Chating now</h1>
          <h3 className='text-white font-extrabold text-3xl text-center'>Join today.</h3>
          <p className='text-zinc-700 font-extrabold text-xl text-center'>A Krix Product</p>
          <form onSubmit={handlesubmit} className='flex flex-col gap-y-2 mt-6'>
            <h1 className='text-white text-2xl font-semibold'>{losign}</h1>
            {losign === 'Create your account' ? (
              <div className='border-2 border-zinc-700 rounded-md relative group pt-4 pb-2 focus-within:border-sky-600 p-1 flex items-center justify-center flex-col'>
                <div className='flex items-center justify-end w-full'>
                  <p className={`text-zinc-600 absolute bottom-0 left-2 pointer-events-none select-none transition-all duration-200 group-focus-within:top-0 group-focus-within:text-sky-700 group-focus-within:text-sm opacity-100 ${inputname ? "top-0 text-sm group-focus-within:text-sky-700 opacity-100" : "top-[10px] text-lg opacity-0"}`}>Name</p>
                  <p className='text-zinc-500 text-sm hidden group-focus-within:block absolute top-0'> {inputname.length} / 50 </p>
                </div>
                <input value={inputname} onChange={handleinputuserchange} className='w-full px-2 text-lg text-white rounded-md bg-transparent outline-none border-none' maxLength={50} required type="text" />
              </div>
            ) : null}
            <div className='border-2 border-zinc-700 rounded-md relative group pt-4 pb-2 focus-within:border-sky-600 p-1 flex items-center justify-center flex-col'>
              <div className='flex items-center justify-end w-full'>
                <p className={`text-zinc-600 absolute bottom-0 left-2 pointer-events-none select-none transition-all duration-200 group-focus-within:top-0 group-focus-within:text-sky-700 group-focus-within:text-sm opacity-100 ${inputemail ? "top-0 text-sm group-focus-within:text-sky-700 opacity-100" : "top-[10px] text-lg opacity-0"}`}>Email</p>
              </div>
              <input value={inputemail} onChange={handleinputemailchange} className='w-full px-2 text-lg text-white rounded-md bg-transparent outline-none border-none' required type="email" />
            </div>
            <div className='border-2 border-zinc-700 rounded-md relative group pt-4 pb-2 focus-within:border-sky-600 p-1 flex items-center justify-center flex-col'>
              <div className='flex items-center justify-end w-full'>
                <p className={`text-zinc-600 absolute bottom-0 left-2 pointer-events-none select-none transition-all duration-200 group-focus-within:top-0 group-focus-within:text-sky-700 group-focus-within:text-sm opacity-100 ${inputpassword ? "top-0 text-sm group-focus-within:text-sky-700 opacity-100" : "top-[10px] text-lg opacity-0"}`}>Password</p>
              </div>
              <input value={inputpassword} onChange={handleinputpasswordchange} className='w-full px-2 text-lg text-white rounded-md bg-transparent outline-none border-none' required type="password" />
            </div>
            <button type='submit' className='border-none outline-none bg-[#1d9bf0] rounded-full hover:bg-[#2d95da]'>
              {losign === 'Create your account' ? (
                <h1 className='text-white font-normal text-lg p-2'>Create account</h1>
              ) : (
                <h1 className='text-white font-normal text-lg p-2'>Sign in to X</h1>
              )}
            </button>
            <div className='flex items-center text-white'>
              <div className='h-[0.5px] bg-zinc-600 w-full'></div>
              <p className='px-3'>or</p>
              <div className='h-[0.5px] bg-zinc-600 w-full'></div>
            </div>
            <div>
              {losign === 'Create your account' ? (
                <div>
                  <h1 className='text-white'>Already have an account?</h1>
                  <div onClick={() => setlosign('Sign in to X')} className='border-gray-800 border-2 rounded-full p-2 hover:bg-[#103f5550] select-none cursor-pointer'>
                    <p className='text-sky-700 text-center'>Sign in</p>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className='text-white'>Create an account?</h1>
                  <div onClick={() => setlosign('Create your account')} className='border-gray-800 border-2 rounded-full p-2 hover:bg-[#103f5550] select-none cursor-pointer'>
                    <p className='text-sky-700 text-center'>Create your account</p>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registerpage
