import axios from "axios";
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { Video } from "../types.d";
import { BASE_URL } from "../utils";
import { GetServerSideProps } from "next";

type Props = {
  videos: Video[];
};

const Home = ({ videos }: Props) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length === 0 ? (
        <NoResults text="No Videos" />
      ) : (
        <>
          {videos.map((video: Video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { topic } = context.query;

  const { data } = topic
    ? await axios.get(BASE_URL + "/api/discover/" + topic)
    : await axios.get(BASE_URL + "/api/post");
  return {
    props: { videos: data },
  };
};

export default Home;
