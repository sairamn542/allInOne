import axios from "axios"
import { TWEET_API_ENDPOINT } from "../utils/constant.js"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/userSlice.js";
import { getAllTweets } from "../redux/tweetSlice.js";

const useGetMyTweet = (id) => {
    const dispatch = useDispatch()
    const { refresh , isActive} = useSelector(store => store.tweet)
    useEffect(() => {
        async function fetchUser() {
            if (!id) {
                console.log("No user ID provided, skipping profile fetch");
                return;
            }
            try {
                const response = await axios.get(`${TWEET_API_ENDPOINT}/alltweets/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                })
                console.log(response.data)
                dispatch(getAllTweets(response?.data?.tweets))
            } catch (err) {
                console.log(err);
            }
        }
        const followingTweets = async () => {
            try {
                const res = await axios.get(`${TWEET_API_ENDPOINT}/followingtweets/${id}`, {
                    withCredentials: true
                })
                dispatch(getAllTweets(res.data.tweets))
            } catch (err) {
                console.log(err)
            }
        }
        if(isActive) {
            fetchUser();
        } else {
            followingTweets()
        }
        
    }, [refresh, dispatch, isActive])
}
export default useGetMyTweet;