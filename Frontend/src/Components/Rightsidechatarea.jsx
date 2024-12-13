import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Rightsidechatarea = ({ userid }) => {
    const [openeduser, setopeneduser] = useState([])

    const openeduserpage = async () => {
        try {
            const token = localStorage.getItem('authtoken'); // Get token from storage
            if (!token) {
                throw new Error('No token found');
            }

            const getuser = await axios.get(`https://chatappmern-j3tu.onrender.com/auth/user/${userid}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the token here
                },
            });
            setopeneduser(getuser.data);
        } catch (error) {
            console.log('Error fetching user data:', error);
        }
    };

    // console.log(openeduser)
    // console.log(userid)
    useEffect(() => {
        openeduserpage()

    }, [userid])
    return (
        <div>
            <div className='w-full p-2 bg-zinc-800 sticky top-0 z-50 max-h-screen  ' >
                {
                    openeduser.map(({ name, _id }) => (
                        <div key={_id} >
                            <h1>{name}</h1>
                        </div>
                    ))
                }
            </div>
            {/* <div className='h-[500vh]' ></div> */}
        </div>
    )
}

export default Rightsidechatarea
