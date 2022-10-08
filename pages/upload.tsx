import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { client } from "../utils/client";
import useAuthStore from "../store/authStore";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "../utils/constants";
import { BASE_URL } from "../utils";

const Upload = () => {
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument>();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const { userProfile }: { userProfile: any } = useAuthStore();
  const [topic, setTopic] = useState(topics[0].name);
  const router = useRouter();
  const uploadVideo = (event: any) => {
    const selectedFile: File = event.target.files[0];
    const fileTypes = ["video/mp4"];
    if (fileTypes.includes(selectedFile.type)) {
      setLoading(true);
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setLoading(false);
          setVideoAsset(data);
        });
    } else {
      setLoading(false);
      setWrongFileType(true);
    }
  };
  const onDiscardHandler = () => {
    setSavingPost(false);
    setVideoAsset(undefined);
    setCaption("");
    setTopic("");
  };
  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (caption && videoAsset?._id && topic) {
      setSavingPost(true);
      const doc = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic,
      };
      await axios.post(`${BASE_URL}/api/post`, doc);
      router.push("/");
    }
  };
  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setTopic(event.target.value);
  };
  useEffect(() => {
    !userProfile && router.replace("/");
  }, [userProfile, router]);
  return (
    <div className="w-full h-full bg-white">
      <div className="flex flex-col md:flex-row items-center gap-6 p-4 md:p-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100 transition duration-200 ease-in-out">
            {loading ? (
              <p className="text-center text-3xl text-red-400 font-semibold">
                Uploading...
              </p>
            ) : (
              <div>
                {!videoAsset ? (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold text-center">
                          Select video to upload
                        </p>
                      </div>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 or WebM or ogg <br />
                        720x1280 resolution or higher <br />
                        Up to 10 minutes <br />
                        Less than 2 GB
                      </p>
                      <p className="bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Select file
                      </p>
                    </div>
                    <input
                      onChange={uploadVideo}
                      type="file"
                      name="video"
                      className="hidden"
                      accept="video/mp4"
                    />
                  </label>
                ) : (
                  <div className=" rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center">
                    <video
                      className="rounded-xl h-[462px] mt-16 bg-black"
                      controls
                      loop
                      src={videoAsset?.url}
                    />
                    <div className=" flex justify-between gap-20">
                      <p className="text-lg">{videoAsset.originalFilename}</p>
                      <button
                        type="button"
                        className=" rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                        onClick={() => setVideoAsset(undefined)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {wrongFileType && (
            <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[260px]">
              Please select an video file(mp4)
            </p>
          )}
        </div>
        <form className="flex flex-col gap-3 pb-10" onSubmit={onSubmitHandler}>
          <label htmlFor="caption" className="text-md font-medium">
            Caption
          </label>
          <input
            required
            type="text"
            id="caption"
            value={caption}
            className="rounded outline-none text-md border-2 border-gray-200 p-2"
            onChange={(e) => setCaption(e.target.value)}
          />
          <label htmlFor="topic" className="text-md font-medium">
            Choose a topic
          </label>
          <select
            onChange={onChangeHandler}
            required
            className="outline-none border-2 border-gray-200 text-md capitalize p-2 lg:p-4 rounded cursor-pointer"
            value={topic}
            name="topic"
            id="topic"
          >
            {topics.map((topic) => (
              <option
                value={topic.name}
                key={topic.name}
                className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              onClick={onDiscardHandler}
              disabled={savingPost}
              type="button"
              className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Discard
            </button>
            <button
              disabled={savingPost}
              type="submit"
              className="bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              {savingPost ? "Posting" : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;