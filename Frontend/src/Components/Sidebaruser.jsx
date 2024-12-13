import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { FaRegUser } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaBarsStaggered } from "react-icons/fa6";
const Sidebaruser = ({ setside }) => {
    const [user, setuser] = useState([])
    const navigate = useNavigate()
    const [querry, setquerry] = useState('')
    const [loggeduser, setloggeduser] = useState([]);
    const fetchalluser = async () => {
        const respo = await axios.get('https://chatappmern-j3tu.onrender.com/auth/alluser')
        setuser(respo.data)
    }
    useEffect(() => {
        fetchalluser()

    }, [])
    // console.log(user)
    const filterquerry = user.filter((yus) => yus.name.toLowerCase().includes(querry.toLowerCase()))
    // console.log(filterquerry)

    const logger = async () => {
        try {
            const token = localStorage.getItem('authtoken');
            if (!token) throw new Error('No token found');
            const respo = await axios.get('https://chatappmern-j3tu.onrender.com/auth/logged', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setloggeduser(Array.isArray(respo.data) ? respo.data : [respo.data]);
        } catch (error) {
            console.error('Error fetching logged user data:', error);
        }
    };
    useEffect(() => {
        logger();
    }, []);

    return (
        <div className='w-full' >

            <div className='w-full  z-50 sticky top-0 flex items-center justify-around p-1 flex-col bg-zinc-800 ' >
                <div className='flex items-center justify-between w-full px-4' >
                    {/* <FaBarsStaggered onClick={() => setside(false)} className='cursor-pointer hover:bg-zinc-600 p-2 rounded-full text-4xl ' /> */}
                    <h1 className='font-semibold text-xl select-none' >Chats</h1>
                    {loggeduser.map(({ _id, imageurl, name }) => (
                        <div key={_id}>
                            {imageurl ? (
                                <div onClick={() => navigate(`/profileme/${loggeduser[0]._id}`)} className='w-16 flex mr-3 items-center justify-center h-16 cursor-pointer select-none rounded-full bg-zinc-700 mb-1 hover:bg-zinc-500'>
                                    <img className='w-full h-full rounded-full' src={imageurl} alt="Profile" />
                                </div>
                            ) : (
                                <div onClick={() => navigate(`/profileme/${loggeduser[0]._id}`)} className='w-8 flex mr-3 items-center justify-center h-8 cursor-pointer select-none rounded-full bg-zinc-700 mb-1 hover:bg-zinc-500'>
                                    <h1 className='font-semibold cursor-pointer select-none'>{name ? name.slice(0, 1).toUpperCase() : 'A'}</h1> {/* Default 'A' if name is unavailable */}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* <FaRegUser className='text-4xl cursor-pointer hover:bg-zinc-600 rounded-full m-2 p-2 ' /> */}
                </div>
                <div className='flex items-center rounded-md justify-center bg-zinc-700 border-b-green-600 border-b-2 mx-2 w-full ' >
                    <IoIosSearch className='text-2xl m-1' />
                    <input onInput={(e) => setquerry(e.target.value)} type="search" className='w-full border-none rounded-md  bg-transparent outline-none px-2  text-md  ' />
                </div>
                {/* onClick={() => navigate(`/profileme/${loggeduser[0]._id}`)} */}
            </div>

            <div  >
                {
                    filterquerry.map(({ _id, name, descript, imageurl }) => (
                        <div
                            style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                            onClick={() => navigate(`/message/${_id}`)} key={_id} className='flex items-start flex-col justify-start cursor-pointer w-full hover:bg-zinc-600 rounded-md py-2 transition-all duration-200 px-2 ' >
                            <div className='flex items-center justify-around' >
                                {
                                    imageurl ? <div className='w-16 flex mr-3 items-center justify-center h-16 cursor-pointer select-none rounded-full bg-zinc-700  mb-1 hover:bg-zinc-500' >
                                        <img className='w-full  h-full rounded-full' src={imageurl} alt="" />

                                    </div> :
                                        <div className='w-8 flex mr-3 items-center justify-center h-8 cursor-pointer select-none rounded-full bg-zinc-700  mb-1 hover:bg-zinc-500' >
                                            <h1 className='font-semibold cursor-pointer select-none ' >{name.slice(0, 1)}</h1>

                                        </div>
                                }

                                <h1 className='select-none ' >{name}</h1>
                            </div>

                            <p

                                className='pl-4 text-zinc-300 text-ellipsis' >{descript}</p>
                        </div>
                    ))
                }
            </div>


        </div>
    )
}

export default Sidebaruser
