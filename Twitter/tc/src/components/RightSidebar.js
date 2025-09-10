import React from 'react'
import Avatar from 'react-avatar'
import { MdSearch } from 'react-icons/md'
import { Link } from 'react-router-dom'

function RightSidebar({ otherUsers }) {
  return (
    <div className='w-[30%]'>
      <div className='d-flex items-center p-2 m-2 bg-gray-200 rounded-full '>
        <MdSearch className='mt-1' size={20} />
        <input type='text' className='outline-none bg-transparent px-1' placeholder='Search' />
      </div>
      <div className='p-3 bg-gray-200 m-2 rounded'>
        <h5 className='font-bold'>Who to follow</h5>
        {
          otherUsers?.map((user) => {
            return (
              <div key={user._id} className='d-flex justify-between'>
              <div className='flex'>
                <Avatar src='https://media.licdn.com/dms/image/v2/D5603AQGquZeXEtkD7A/profile-displayphoto-scale_400_400/B56ZggllIKG4Ag-/0/1752893388309?e=1756339200&v=beta&t=VlxHDGEqu1-pig1oEoyRAFIJVaDR1IwG5mQmMTz8ca0' size="40" round={true} />
                <div className='ml-2'>
                  <div>
                    <p className='font-bold text-sm m-0'>{user?.name}</p>
                    <p className='text-gray-400 text-sm mt-0'>{`@${user?.username}`}</p>
                  </div>
                </div>
              </div>
              <div>
                <Link to={`/profile/${user?._id}`}><button className='bg-black text-white rounded-full py-1 px-3 font-bold text-sm'>Profile</button></Link>
              </div>
            </div>
            )
          })
        }
       
      </div>
    </div>
  )
}

export default RightSidebar