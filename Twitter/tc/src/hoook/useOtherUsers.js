import axios from "axios"
import { USER_API_ENDPOINT } from "../utils/constant.js"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../redux/userSlice.js";

const useOtherUsers = (id) => {
    const dispatch = useDispatch()
    useEffect(() => {
        async function fetchUser() {
            if (!id) {
                console.log("No user ID provided, skipping profile fetch");
                return;
            }
            try {
                const response = await axios.get(`${USER_API_ENDPOINT}/otheruser/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                })
                console.log(response)
                dispatch(getOtherUsers(response?.data?.otherUsers))
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    }, [id, dispatch])
}
export default useOtherUsers;