import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import { useSelector,useDispatch } from "react-redux";
import useGetProfile from '../hooks/useGetProfile';
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast"
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';

const Profile = () => {
    const { user, profile } = useSelector(store => store.user);
    const { id } = useParams();
    useGetProfile(id);
    const dispatch = useDispatch();

    const followAndUnfollowHandler = async () => {
        if(user.following.includes(id)){
            // unfollow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {id:user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
            
        }else{
            // follow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {id:user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        }
    }

    return (
        <div className='w-[50%] border-l border-r border-gray-200'>
            <div>
                <div className='flex items-center py-2'>
                    <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
                        <IoMdArrowBack size="24px" />
                    </Link>
                    <div className='ml-2'>
                        <h1 className='font-bold text-lg'>{profile?.name}</h1>
                        <p className='text-gray-500 text-sm'>10 post</p>
                    </div>
                </div>
                <img src="https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360" alt="banner" />
                <div className='absolute top-52 ml-2 border-4 border-white rounded-full'>
                    <Avatar src="data:image/jpeg;base64,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" size="120" round={true} />
                </div>
                <div className='text-right m-4'>
                    {
                        profile?._id === user?._id ? (
                            <button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>

                        ) : (
                            <button onClick={followAndUnfollowHandler} className='px-4 py-1 bg-black text-white rounded-full'>{user.following.includes(id) ? "Following" : "Follow"}</button>
                        )
                    }
                </div>
                <div className='m-4'>
                    <h1 className='font-bold text-xl'>{profile?.name}</h1>
                    <p>{`@${profile?.username}`}</p>
                </div>
                <div className='m-4 text-sm'>
                    <p> 💻 Crafting clean code with the MERN Stack 🎨 | Solving problems, bug at a time 🐞 | Powered by tea and late nights 🌙☕|</p>
                </div>
            </div>
        </div>
    )
}

export default Profile