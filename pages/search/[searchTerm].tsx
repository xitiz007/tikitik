import { GetServerSideProps } from "next";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { Video } from "../../types";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";
import { useState } from "react";
import NoResults from "../../components/NoResults";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import VideoCard from "../../components/VideoCard";

const Accounts = ({ searchTerm }: { searchTerm: string | string[] }) => {
  const { users } = useAuthStore();
  const result = users.filter((user: any) =>
    user.userName.toLowerCase().includes(searchTerm)
  );
  return (
    <div className="md:mt-16">
      {result.length ? (
        result.map((user: any) => (
          <Link key={user._id} href={`/profile/${user._id}`}>
            <div className=" flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
              <div>
                <Image
                  width={50}
                  height={50}
                  className="rounded-full"
                  alt="user-profile"
                  src={user.image}
                />
              </div>
              <div>
                <div>
                  <p className="flex gap-1 items-center text-lg font-bold text-primary">
                    {user.userName} <GoVerified className="text-blue-400" />
                  </p>
                  <p className="capitalize text-gray-400 text-sm">
                    {user.userName}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <NoResults text={`No Results for ${searchTerm}`} />
      )}
    </div>
  );
};
const Videos = ({
  videos,
  searchTerm,
}: {
  videos: Video[];
  searchTerm: string | string[];
}) => (
  <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start ">
    {videos.length ? (
      videos.map((video: Video, index: number) => (
        <VideoCard video={video} key={index} />
      ))
    ) : (
      <NoResults text={`No Video Results for ${searchTerm}`} />
    )}
  </div>
);

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(true);
  const router = useRouter();
  const { searchTerm = "" } = router.query;
  const videosTab = !isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  return (
    <div>
      <div className="flex gap-10 mb-10 border-b-2 border-gray-200">
        <p
          onClick={setIsAccounts.bind(null, true)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
        >
          Accounts
        </p>
        <p
          onClick={setIsAccounts.bind(null, false)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${videosTab}`}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <Accounts searchTerm={searchTerm} />
      ) : (
        <Videos videos={videos} searchTerm={searchTerm} />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const search = context.query?.searchTerm;
  const res = await axios.get(`${BASE_URL}/api/search/${search}`);
  return {
    props: { videos: res.data },
  };
};

export default Search;
