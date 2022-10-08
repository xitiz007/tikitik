import Link from "next/link";
import { useRouter } from "next/router";
import { ImInsertTemplate } from "react-icons/im";
import { topics } from "../utils/constants";

const Discover = () => {
  const activeTopicStyle =
    "xl:border-2 xl:border-[#F51997] hover:bg-primary px-3 py-2 rounded xl:rounded-full flex items-center gap-2 cursor-pointer text-[#FF1997] justify-center";
  const topicStyle =
    "xl:border-2 xl:border-gray-300 hover:bg-primary px-3 py-2 rounded xl:rounded-full flex items-center gap-2 cursor-pointer text-black justify-center";
  const router = useRouter();
  const { topic: topicName } = router.query;
  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics.map((topic) => (
          <Link href={`/?topic=${topic.name}`} key={topic.name}>
            <div
              className={
                topic.name === topicName ? activeTopicStyle : topicStyle
              }
            >
              <span className="font-bold text-2xl xl:text-md">
                {topic.icon}
              </span>
              <span className="font-medium text-md hidden xl:block capitalize">
                {topic.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
