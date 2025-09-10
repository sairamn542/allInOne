import React from 'react'
import Avatar from 'react-avatar'
import { FaRegComment } from "react-icons/fa6";
import { CiHeart, CiTrash } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import axios from 'axios';
import { TWEET_API_ENDPOINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/tweetSlice';
import { timeSince } from '../utils/constant';

function Tweet({ tweet }) {
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch()
    async function likeOrDislike(id) {
        try {
            const res = await axios.put(`${TWEET_API_ENDPOINT}/like/${id}`, { id: user?._id }, {
                withCredentials: true
            })
            dispatch(getRefresh())

            toast.success(res.data.message)
        } catch (err) {
            toast.success(err.response.data.message)
            console.log(err)
        }
    }
    async function deleteTweet() {
        try {
            const res = await axios.delete(`${TWEET_API_ENDPOINT}/delete/${tweet?._id}`, {
                withCredentials: true
            })
            dispatch(getRefresh())
            toast.success(res.data.message)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='border-b border-bottom-gray-200'>
            <div>
                <div className='flex p-4'>
                    <Avatar src='https://media.licdn.com/dms/image/v2/D5603AQGquZeXEtkD7A/profile-displayphoto-scale_400_400/B56ZggllIKG4Ag-/0/1752893388309?e=1756339200&v=beta&t=VlxHDGEqu1-pig1oEoyRAFIJVaDR1IwG5mQmMTz8ca0' size="48" round={true} />
                    <div className='ml-2'>
                        <div className='flex items-center'>
                            <p className='font-bold text-lg'>{tweet.userDetails.length > 0 && tweet.userDetails[0].name}</p>
                            <p className='text-gray-400 text-sm ml-2'>@{tweet.userDetails.length > 0 && tweet.userDetails[0].username} {timeSince(tweet?.createdAt)}</p>
                        </div>
                        <div style={{ marginTop: "-15px" }}><p className='text-sm'>{tweet?.description}</p></div>
                        <div className='flex justify-between my-3'>
                            <div className='flex items-center'><div className='p-2 hover:bg-green-200 rounded-full'><FaRegComment size={20} /></div><p className='ml-1 mt-2 my-2'>0</p></div>
                            <div className='flex items-center'><div onClick={() => likeOrDislike(tweet?._id)} className='p-2 hover:bg-pink-200 rounded-full'><CiHeart size={20} className={`${tweet.like.length > 0 ? "bg-red-500" : ""}`} /></div><p className='ml-1 mt-2 my-2'>{tweet?.like?.length}</p></div>
                            <div className='flex items-center'><div className='p-2 hover:bg-yellow-200 rounded-full'><CiBookmark size={20} /></div><p className='ml-1 mt-2 my-2'>0</p></div>
                            {
                                user?._id === tweet?.userId && (
                                    <div className='flex items-center'>
                                        <div onClick={deleteTweet} className='p-2 hover:bg-red-500 rounded-full'><CiTrash size={20} /></div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tweet