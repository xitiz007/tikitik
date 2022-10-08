import { BASE_URL } from "../../utils";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { GetServerSideProps } from "next";
import { Video } from "../../types";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";

type Props = {
  data: {
    user: any;
    userVideos: Video[];
  };
};

const Profile = ({ data }: Props) => {
  const { user, userVideos } = data;
  return (
    <div>
      <div className="flex gap-6 md:gap-10 mb-4">
        <div className="w-16 h-16 md:w-30 md:h-30">
          <Image
            width={120}
            height={120}
            layout="responsive"
            className="rounded-full"
            src={user.image}
            alt="user-profile"
          />
        </div>
        <div>
          <div className="text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase">
            <span>{user.userName.replace(/\s+/g, "")} </span>
            <GoVerified className="text-blue-400 md:text-xl text-md" />
          </div>
          <p className="text-sm font-medium"> {user.userName}</p>
        </div>
      </div>
      <h2 className="text-xl font-semibold my-4 border-b border-gray-100 pb-2">
        Videos
      </h2>
      <div className="flex gap-6 flex-wrap md:justify-start">
        {userVideos.length ? userVideos.map((video: Video, index: number) => (
          <VideoCard key={index} video={video} />
        )) : <NoResults text="No Videos Posted yet"/>}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);
  return {
    props: {
      data: res.data,
    },
  };
};

export default Profile;
