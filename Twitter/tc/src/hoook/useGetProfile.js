import axios from "axios"
import { USER_API_ENDPOINT } from "../utils/constant.js"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../redux/userSlice.js";

const useGetProfile = (id) => {
    const dispatch = useDispatch()
    useEffect(() => {
        async function fetchUser() {
            if (!id) {
                console.log("No user ID provided, skipping profile fetch");
                return;
            }
            try {
                const response = await axios.get(`${USER_API_ENDPOINT}/profile/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                })
                console.log(response.data)
                dispatch(getProfile(response?.data?.user))
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    }, [id, dispatch])
}
export default useGetProfile;