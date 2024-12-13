import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { BsPencilFill } from "react-icons/bs";
const Imageuploader = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [image, setimage] = useState(null)
  const { id } = useParams()
  const handleimagechange = (e) => {
    setimage(e.target.files[0])
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image to upload');
      return;
    }

    const formdata = new FormData();
    formdata.append('image', image);
    const token = localStorage.getItem('authtoken');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      // console.log("Token being sent:", token); // Debugging
      console.log("Image being uploaded:", image, config); // Debugging

      const response = await axios.post(
        `https://chatappmern-j3tu.onrender.com/auth/uploadprofileimage/${id}`,
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      enqueueSnackbar('Profile image updated successfully!', { variant: 'success', anchorOrigin: { horizontal: 'center', vertical: 'top' } })
      console.log("Response from server:", response.data);
    } catch (error) {
      console.log("Error Response:", error.response?.data || error.message);
      alert('Error in uploading');
    }
  };
  const [loggeduser, setloggeduser] = useState([])
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
  }, [id, handlesubmit, handleimagechange])
  // console.log(loggeduser)

  return (
    <div>
      <form onSubmit={handlesubmit}>

        {loggeduser.imageurl && <div><label htmlFor="inpu"><img src="https://icon-library.com/images/user-icon-png-transparent/user-icon-png-transparent-27.jpg" alt="" /></label>
          <input id='inpu' className='hidden' type="file" onChange={handleimagechange} accept='image/*' /></div>}

        {
          loggeduser.map(({ imageurl, _id }) => (
            <div className='flex items-center flex-col justify-center' key={_id} >
              <div className='flex items-end justify-center' >
                <img className='w-36 h-36 rounded-full' src={imageurl} alt="" />
                <label htmlFor="inp" className='hover:bg-purple-700 p-2 bg-purple-950 cursor-pointer  rounded-full'><BsPencilFill className='text-2xl ' /></label>
                <input id='inp' className='hidden' type="file" onChange={handleimagechange} accept='image/*' />
              </div>
              <div className='m-2  bg-purple-700 hover:bg-purple-600  cursor-pointer select-none  rounded-full' >
                {
                  image && <button type='submit' ><h1 className='font-semibold p-2' >Update Image</h1></button>
                }
              </div>
            </div>
          ))
        }




      </form>
    </div>
  )
}

export default Imageuploader
