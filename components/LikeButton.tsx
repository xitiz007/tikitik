import { MdFavorite } from "react-icons/md";
import useAuthStore from "../store/authStore";

type Props = {
  likes: any;
  handleLike: (like: boolean) => void;
};

const LikeButton = ({ likes, handleLike }: Props) => {
  const { userProfile }: any = useAuthStore();
  const liked = likes?.find((user: any) => user._ref === userProfile?._id);
  return (
    <div className="flex items-center space-x-2">
      {liked ? (
        <div
          onClick={handleLike.bind(null, false)}
          className="hover:bg-primary hover:text-black transition duration-200 ease-in-out rounded-full p-2 cursor-pointer text-[#F51997]"
        >
          <MdFavorite className="text-lg md:text-2xl" />
        </div>
      ) : (
        <div
          onClick={handleLike.bind(null, true)}
          className="hover:bg-primary hover:text-[#F51997] rounded-full p-2 cursor-pointer transition duration-200 ease-in-out"
        >
          <MdFavorite className="text-lg md:text-2xl" />
        </div>
      )}
      <p className="text-base lg:text-lg font-semibold">{likes?.length || 0}</p>
    </div>
  );
};

export default LikeButton;
