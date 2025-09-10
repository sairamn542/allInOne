import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant";
import toast from "react-hot-toast";
import { getOtherUsers, getProfile, getUser } from "../redux/userSlice";

function LeftSidebar() {
  const {user} = useSelector(store => store.user);
  const dispatch = useDispatch()
  let navigate = useNavigate();
  async function handleLogout() {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout/`)
      dispatch(getUser(null))
      dispatch(getOtherUsers(null))
      dispatch(getProfile(null))
    navigate("/login")
    toast.success(res?.data?.message)
    } catch (error) {
      console.log(error)
      toast.success(error.res.data.message)
    }
  }
  return (
    <div className="w-[20%]">
      <div>
        <div><img className="ml-6" src='https://about.x.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png' width={30} /></div>
        <div className='my-4'>
          <Link to="/" className="flex items-center gap-2 px-4 py2 my-2 hover:bg-gray-200 hover:cursor-pointer rounded-full text-inherit no-underline">
            <div><IoMdHome size={24} /></div>
            <h3 className="font-bold text-lg ml-2 mt-2">Home</h3>
          </Link>
          <div className="flex items-center gap-2 px-4 py2 my-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div><FaSearch size={24} /></div>
            <h3 className="font-bold text-lg ml-2 mt-2">Explore</h3>
          </div>
          <div className="flex items-center gap-2 px-4 py2 my-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div><IoIosNotifications size={24} /></div>
            <h3 className="font-bold text-lg ml-2 mt-2">Notofication</h3>
          </div>
          <div>
            <Link to={`/profile/${user?._id}`} className="flex items-center gap-2 px-4 py2 my-2 hover:bg-gray-200 hover:cursor-pointer rounded-full text-inherit no-underline">
            <div><FaUser size={24} /></div>
            <h3 className="font-bold text-lg ml-2 mt-2">Profile</h3>
          </Link>
          </div>
          <div className="flex items-center gap-2 px-4 py2 my-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div><FaBookmark size={24} /></div>
            <h3 className="font-bold text-lg ml-2 mt-2">Bookmark</h3>
          </div>
          <div onClick={handleLogout} className="flex items-center gap-2 px-4 py2 my-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div><MdLogout size={24} /></div>
            <h3 className="font-bold text-lg ml-2 mt-2">Logout</h3>
          </div>
          <button className="px-2 py-2 border-none text-md bg-[#1D98F0] w-[90%] rounded-full text-white font-bold">Post</button>
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar