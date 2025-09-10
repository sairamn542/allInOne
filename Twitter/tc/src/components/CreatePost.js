import axios from 'axios';
import React, { useState } from 'react'
import Avatar from "react-avatar"
import { CiImageOn } from "react-icons/ci";
import { TWEET_API_ENDPOINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getAllTweets, getIsActive, getRefresh } from '../redux/tweetSlice';


function CreatePost() {
  const [description, setDescription] = useState("");
  const {user} = useSelector(store => store.user)
  const {isActive} = useSelector(store => store.tweet)
  console.log(isActive)
  console.log(user,"new user")
  const dispatch = useDispatch()
  async function handleClick() {
    try {
      const response = await axios.post(`${TWEET_API_ENDPOINT}/create`,{description, id : user?._id},
        { withCredentials: true }
      )
      dispatch(getRefresh())
      if(user) {
        toast.success(response.data.message)
      }
    } catch(err) {
      toast.error(err.response.data.message)
      console.log(err);
      
    }
    setDescription("")
  }
  function handleForYou() {
    dispatch(getIsActive(true))
  }
  function handleFollowing() {
    dispatch(getIsActive(false))
  }
  return (
    <div className='w-[100%]'>
      <div>
        <div className='flex  items-center justify-evenly border-b border-grey-200'>
          <div onClick={handleForYou} className={`hover:bg-blue-200 w-full text-center px-4 py-3 ${isActive ? "border-b-2 border-blue-600" : " "}`}><h4 className='text-blue-400 cursor-pointer'>For you</h4></div>
          <div onClick={handleFollowing} className={`hover:bg-blue-200 w-full text-center px-4 py-3 ${!isActive ? "border-b-2 border-blue-600" : " "}`}><h4 className='text-blue-400 cursor-pointer'>Following</h4></div>
        </div>
      </div>
      <div>
        <div className='flex item-center p-4'>
          <div>
            <Avatar src='https://media.licdn.com/dms/image/v2/D5603AQGquZeXEtkD7A/profile-displayphoto-scale_400_400/B56ZggllIKG4Ag-/0/1752893388309?e=1756339200&v=beta&t=VlxHDGEqu1-pig1oEoyRAFIJVaDR1IwG5mQmMTz8ca0' size="40" round={true} />
          </div>
          <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="what's happening" className='w-full outline-none border-none ml-2 text-lg' />
        </div>
        <div className='flex justify-between items-center p-4 border-b border-grey-300'>
          <div>
            <CiImageOn size={24} className='cursor-pointer'/>
          </div>
          <button onClick={handleClick} className='bg-[#1D98F0] px-4 py-1 rounded-full text-lg text-white border-none'>Post</button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost