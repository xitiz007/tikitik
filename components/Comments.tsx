import { useState, FormEvent } from "react";
import useAuthStore from "../store/authStore";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";

type Props = {
  comments: any;
  addComment: (comment: string) => void;
};
const Comments = ({ comments, addComment }: Props) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { userProfile, users } = useAuthStore();
  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await addComment(comment);
    setLoading(false);
    setComment("");
  };
  return (
    <div className="border-t-2 border-gray-200 pt-4 mr-4">
      {userProfile && (
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col md:flex-row items-start md:items-center gap-4"
        >
          <input
            placeholder="add comment..."
            required
            type="text"
            value={comment}
            className="flex-1 bg-primary px-6 py-4 text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-gray-300 rounded-lg"
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            disabled={loading}
            type="submit"
            className="p-2 border border-gray-300 rounded-lg text-md text-gray-400 hover:text-gray-500 transition-colors duration-200 ease-in-out"
          >
            {loading ? "Commenting" : "Comment"}
          </button>
        </form>
      )}
      <div className="mt-4 h-52 overflow-y-scroll bg-primary rounded p-2">
        {comments?.map((comment: any, index: number) => {
          const user: any = users.find(
            (user: any) => user._id === (comment.postedBy._id || comment.postedBy._ref)
          );
          return (
            <div
              key={index}
              className="p-2 items-center border-b border-gray-50"
            >
              <Link href={`/profile/${user?._id}`}>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12">
                    <Image
                      width={48}
                      height={48}
                      src={user?.image}
                      alt="user"
                      layout="responsive"
                      className="rounded-full"
                    />
                  </div>
                  <p className="flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary">
                    {user?.userName} <GoVerified className="text-blue-400" />
                  </p>
                </div>
              </Link>
              <div>
                <p className="-mt-5 ml-16 text-[16px] mr-8">
                  {comment.comment}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
