import axios from "axios";
import { TWEET_API_ENDPOINT } from "../utils/constant.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice.js";

const useGetMyTweet = (id) => {
  const dispatch = useDispatch();
  const { refresh, isActive } = useSelector((store) => store.tweet);

  useEffect(() => {
    const token = localStorage.getItem("token"); // ✅ get token

    async function fetchUser() {
      if (!id) {
        console.log("No user ID provided, skipping profile fetch");
        return;
      }
      try {
        const response = await axios.get(`${TWEET_API_ENDPOINT}/alltweets/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ attach token
          },
        });
        console.log(response.data);
        dispatch(getAllTweets(response?.data?.tweets));
      } catch (err) {
        console.log(err);
      }
    }

    const followingTweets = async () => {
      try {
        const res = await axios.get(`${TWEET_API_ENDPOINT}/followingtweets/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ attach token
          },
        });
        dispatch(getAllTweets(res.data.tweets));
      } catch (err) {
        console.log(err);
      }
    };

    if (isActive) {
      fetchUser();
    } else {
      followingTweets();
    }
  }, [refresh, dispatch, isActive, id]);
};

export default useGetMyTweet;
