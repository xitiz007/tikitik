import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { BASE_URL } from "../../utils";
import type { GetServerSideProps } from "next";
import { Video } from "../../types";
import useAuthStore from "../../store/authStore";
import LikeButton from "../../components/LikeButton";
import { FaRegComment } from "react-icons/fa";
import Comments from "../../components/Comments";

type Props = {
  postDetail: Video;
};

const Detail = ({ postDetail }: Props) => {
  const [post, setPost] = useState(postDetail);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();
  const onVideoClick = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPost((post) => ({ ...post, likes: res.data.likes }));
    }
  };

  const addComment = async (comment: string) => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });
      setPost((post) => ({ ...post, comments: res.data.comments }));
    }
  };

  useEffect(() => {
    videoRef.current && (videoRef.current.muted = isMuted);
  }, [isMuted]);
  if (!post) return null;
  return (
    <div className="">
      <div className="">
        <div className="flex justify-between">
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className="flex gap-4 mb-4 bg-white w-full cursor-pointer">
              <Image
                width={60}
                height={60}
                alt="user-profile"
                className="rounded-full"
                src={post.postedBy.image}
              />
              <div>
                <div className="text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center">
                  {post.postedBy.userName.replace(/\s+/g, "")}{" "}
                  <GoVerified className="text-blue-400 text-xl" />
                </div>
                <p className="text-md"> {post.postedBy.userName}</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="px-1">
          <p className=" text-md font-medium text-gray-600">{post.caption}</p>
        </div>
      </div>
      <div className="relative mr-4 xl:mr-0 mt-2">
        <div className="absolute top-2 left-2 z-50">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[25px] lg:text-[35px] hover:opacity-90" />
          </p>
        </div>
        <div className="absolute top-[50%] left-[50%] cursor-pointer">
          {!isPlaying && (
            <button onClick={onVideoClick}>
              <BsFillPlayFill className="text-white text-[50px] hover:opacity-90" />
            </button>
          )}
        </div>
        <div className="absolute bottom-2 right-2 cursor-pointer">
          {isMuted ? (
            <button onClick={() => setIsMuted(false)}>
              <HiVolumeOff className="text-white text-[25px] lg:text-[35px]" />
            </button>
          ) : (
            <button onClick={() => setIsMuted(true)}>
              <HiVolumeUp className="text-white text-[25px] lg:text-[35px]" />
            </button>
          )}
        </div>
        <video
          ref={videoRef}
          loop
          className="cursor-pointer w-full"
          src={post.video.asset.url}
          onClick={onVideoClick}
        ></video>
      </div>
      <div className="mt-10 px-1 flex items-center space-x-6">
        <LikeButton handleLike={handleLike} likes={post.likes} />
        <div className="flex items-center space-x-2">
          <FaRegComment className="text-lg md:text-2xl" />
          <p className="text-base lg:text-lg font-semibold">
            {post.comments?.length || 0}
          </p>
        </div>
      </div>
      <Comments addComment={addComment} comments={post.comments} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);
  return {
    props: {
      postDetail: data,
    },
  };
};

export default Detail;
