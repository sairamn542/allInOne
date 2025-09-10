import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import { useSelector } from 'react-redux'

function Feed() {
  const {tweets} = useSelector(store => store.tweet);
  console.log(tweets)
  return (
    <div className='w-[60%] border border-grey-200 mx-2'>
      <div>
        <CreatePost />
        {
          tweets?.map((tweet)=><Tweet key={tweet?._id} tweet={tweet} />)
        }
      </div>
    </div>
  )
}

export default Feed