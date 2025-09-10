import React from 'react'
import Avatar from 'react-avatar'
import { IoMdArrowBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import useGetProfile from '../hoook/useGetProfile'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../utils/constant'
import { followingUpdate } from '../redux/userSlice'
import toast from 'react-hot-toast'

function Profile() {
    const { user, profile } = useSelector(store => store.user)
    const { id } = useParams();
    const dispatch = useDispatch()
    useGetProfile(id)
    const followAndUnfollowHandler = async () => {
        if (user?.following.includes(id)) {
            try {
                const res = await axios.post(`${USER_API_ENDPOINT}/unfollow/${id}`,{id : user?._id},{
                    withCredentials: true
                })
                dispatch(followingUpdate(id))
                toast.success(res.data.message)
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const res = await axios.post(`${USER_API_ENDPOINT}/follow/${id}`,{id : user?._id},{
                    withCredentials: true
                })
                dispatch(followingUpdate(id))
                toast.success(res.data.message)
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <div className='w-[50%] border-l border-r border-gray-200'>
            <div>
                <div className='flex items-center'>
                    <Link to="/" className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <IoMdArrowBack size={25} />
                    </Link>
                    <div className='ml-2'>
                        <h3 className='font-bold text-lg m-0'>{profile?.name}</h3>
                        <p className='text-gray-500 text-sm m-0'>10 posts</p>
                    </div>
                </div>
                <img src='https://media.istockphoto.com/id/2166408604/photo/group-adult-asia-male-female-freelance-typing-write-prompt-ai-bot-it-app-smart-program-nomad.jpg?s=612x612&w=0&k=20&c=vTPMw5yJMUtAWtrUxLvQ820SHA2o6eQx96zPFxmiNFk=' style={{ height: "230px", width: "700px" }} alt='img' />
                <div className='position-absolute top-56 border-4 border-white rounded-full ml-2'>
                    <Avatar src='https://media.licdn.com/dms/image/v2/D5603AQGquZeXEtkD7A/profile-displayphoto-scale_400_400/B56ZggllIKG4Ag-/0/1752893388309?e=1756339200&v=beta&t=VlxHDGEqu1-pig1oEoyRAFIJVaDR1IwG5mQmMTz8ca0' size="100" round={true} />
                </div>
                <div className='text-right'>
                    {
                        profile?._id === user?._id ? (
                            <button className='px-4 py-1 rounded-full border border-gray-400 m-4 hover:bg-gray-200'>Edit Profile</button>
                        ) : (
                            <button onClick={followAndUnfollowHandler} className='px-4 py-1 bg-black text-white rounded-full border m-4 hover:bg-gray-200'>{user?.following.includes(id) ? "Following" : "Follow"}</button>
                        )
                    }
                </div>
                <div className='-mt-6 ml-2'>
                    <h4 className='font-bold text-xl'>{profile?.name}</h4>
                    <p>@{profile?.username}</p>
                </div>
                <div className='text-sm -mt-2 ml-2'>
                    <p>The voice of the X Dev team and your official source for updates, news, and events, related to the X API.</p>
                </div>
            </div>
        </div>
    )
}

export default Profile