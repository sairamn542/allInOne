import LeftSidebar from './LleftSidebar'
import RightSidebar from './RightSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { getOtherUsers } from '../redux/userSlice'
import { useSelector } from 'react-redux'
import useOtherUsers from '../hoook/useOtherUsers'
import useGetMyTweet from '../hoook/useGetMyTweet'
import { useEffect } from 'react'

function Home() {
  const { user, otherUsers } = useSelector(store => store.user)
  let navigate = useNavigate()
  useEffect(()=>{
    if(!user) {
      navigate("/login")
    }
  })
  useOtherUsers(user?._id)
  useGetMyTweet(user?._id)
  return (
    <div className='flex justify-between w-[90%] mx-auto'>
      <LeftSidebar />
      {/* <Feed /> */}
      <Outlet />
      <RightSidebar otherUsers={otherUsers} />
    </div>
  )
}

export default Home