import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";
import Sidebaruser from '../Components/Sidebaruser'
import { TbLogout } from "react-icons/tb";
import { FaBarsStaggered } from "react-icons/fa6";


const Alluser = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [openeduser, setopeneduser] = useState([]);
  const openeduserpage = async () => {
    try {
      const token = localStorage.getItem('authtoken');
      if (!token) throw new Error('No token found');
      const getuser = await axios.get(`https://chatappmern-j3tu.onrender.com/auth/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setopeneduser(getuser.data);
    } catch (error) {
      console.error('Error fetching opened user data:', error);
    }
  };
  useEffect(() => {
    openeduserpage();
  }, [id]);
  const handlelogout = () => {
    localStorage.removeItem('authtoken')
    navigate('/')
  }
  const [sidepanel, setsidepanel] = useState(true)
  return (
    <div>


      <div className=' hidden sm:flex ' >

        {
          sidepanel ?
            <div className='md:w-[360px] w-full border-r-2 border-zinc-600 max-h-auto  h-screen bg-zinc-800 overflow-y-auto p-2 flex flex-col items-center justify-between sticky top-0' >
              <Sidebaruser setside={setsidepanel} />
              <div className='w-full h-7 bg-opacity-25 backdrop-blur-lg  bg-zinc-800 rounded-lg sticky bottom-0 z-50 flex items-center justify-around flex-wrap mb-8 ' >
                {
                  openeduser.map(({ name, _id }) => (
                    <div key={_id} >
                      <h2>{name}</h2>
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
        <div className='flex w-full flex-col items-center justify-start' >
          <div className='w-full shadow-sm bg-zinc-900 shadow-black p-2 flex items-center gap-4'  ><FaArrowLeft onClick={() => navigate(-1)} className='cursor-pointer hover:bg-zinc-800 p-2 text-sm w-10 h-10 rounded-full text-bold' /><h1>Profile</h1></div>
          <div className='hidden sm:flex justify-center w-full' >

            {
              openeduser.map(({ name, _id, createdAt, descript ,imageurl }) => (
                <div key={_id} className='w-[85%] flex flex-col justify-center items-center' >
                  <img className='w-36 h-36 rounded-full' src={imageurl} alt="" />
                  <h1 className='bg-purple-900 my-2 p-2 rounded-xl' >Name: {name}</h1>

                  <h1 className='bg-purple-900 my-2 p-2 rounded-xl' >Joined in : {new Date(createdAt).toDateString()}</h1>

                  <div className='flex items-center gap-3 bg-purple-900 my-2 p-2 rounded-xl'  >
                    {descript ? <p>{descript}</p> : <p>Hey Iam using a Krix Product </p>}



                  </div>


                </div>
              ))
            }
          </div>

        </div>




      </div>



      <div>
        <div className='w-full shadow-sm bg-zinc-900 shadow-black p-2 flex items-center gap-4' ><FaArrowLeft onClick={() => navigate(-1)} className='cursor-pointer hover:bg-zinc-800 p-2 text-sm w-10 h-10 rounded-full font-bold ' /><h1 className='select-none text-xl font-semibold' >Profile</h1>
        </div>
        <div className='sm:hidden flex justify-center w-full'>

          {
            openeduser.map(({ name, _id, descript, createdAt,imageurl }) => (
              <div key={_id} className='w-[85%] flex flex-col justify-center items-center'>
                  <img className='w-36 h-36 rounded-full' src={imageurl} alt="" />
                <h1 className='bg-purple-900 my-2 p-2 rounded-xl' >Name: {name}</h1>
                <h1 className='bg-purple-900 my-2 p-2 rounded-xl' >Joined in : {new Date(createdAt).toDateString()}</h1>
                <div className='flex items-center gap-3 bg-purple-900 my-2 p-2 rounded-xl'  >
                  {descript ? <p>{descript}</p> : <p>Hey Iam using a Krix Product </p>}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Alluser
