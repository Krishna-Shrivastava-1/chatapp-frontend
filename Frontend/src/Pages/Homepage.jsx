import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebaruser from '../Components/Sidebaruser'
import axios from 'axios'
import { TbLogout } from "react-icons/tb";
import Rightsidechatarea from '../Components/Rightsidechatarea';
import { FaBarsStaggered } from "react-icons/fa6";
const Homepage = () => {
    const [loggeduser, setloggeduser] = useState([])
    const navigate = useNavigate()
    const handlelogout = () => {
        localStorage.removeItem('authtoken')
        navigate('/')
    }


    const logger = async () => {
        try {
            const token = localStorage.getItem('authtoken')
            if (!token) {
                throw new Error('No token found')
            }
            const respo = await axios.get('https://chatappmern-j3tu.onrender.com/auth/logged', {
                headers: { Authorization: `Bearer ${token}` },
            })
            setloggeduser(respo.data)
        } catch (error) {
            console.log('Error fetching user data:', error);
        }

    }
    useEffect(() => {
        logger()
    }, [])
    const [sidepanel, setsidepanel] = useState(true)
    // console.log(loggeduser)
    return (
        <div className='flex ' >
            {
                sidepanel ?
                    <div className='md:w-[360px] w-full border-r-2 border-zinc-600 max-h-auto  h-screen bg-zinc-800 overflow-y-auto p-2 flex flex-col items-center justify-between sticky top-0' >
                        <Sidebaruser setside={setsidepanel} />
                        <div className='w-full h-7 bg-opacity-25 backdrop-blur-lg  bg-zinc-800 rounded-lg sticky bottom-0 z-50 flex items-center justify-around flex-wrap mb-8 ' >
                            {
                                loggeduser.map(({ name, _id  }) => (
                                    <div key={_id} >
                                        <h2>{name}</h2>
                                        {/* <img src={imageurl} alt="" /> */}
                                    </div>
                                ))
                            }
                            <div className='cursor-pointer  whitespace-nowrap select-none bg-zinc-900 py-1 px-2 rounded-lg flex items-center justify-between flex-nowrap '>
                                <h2 className='mx-2 text-md' onClick={handlelogout} >Logout </h2>
                                <TbLogout className='text-red-600 text-2xl' />
                            </div>
                            {
                                location.pathname === '/home' &&
                                <div className='w-[100%] sm:hidden  text-zinc-600 flex items-center justify-center' >
                                    <h1 className='font-semibold text-md' >A Krix Product</h1>
                                </div>
                            }
                        </div>

                    </div> : <div className='bg-zinc-800 p-1 flex items-start  justify-start'> <FaBarsStaggered onClick={() => setsidepanel(true)} className='cursor-pointer hover:bg-zinc-600 p-2 rounded-full text-4xl ' /></div>
            }
            {
                location.pathname === '/home' &&
                <div className=' w-[70%] hidden sm:flex text-zinc-600  items-center justify-center' >
                    <h1 className='font-bold text-2xl' >A Krix Product</h1>
                </div>
            }
            {/* {
                location.pathname === '/home' ?
                    <div className='w-[100%] h-screen bg-zinc-900 flex items-center justify-center' >
                        <h1 className='font-semibold text-2xl' >A Krix Product</h1>
                    </div> :
                    <div className='w-[80%] bg-zinc-900' >
                        <Rightsidechatarea />
                    </div>
            } */}


        </div>
    )
}

export default Homepage
