import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/tiktik-logo.png";
import { createOrGetUser } from "../utils";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import useAuthStore from "../store/authStore";
import { useState, FormEvent } from "react";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const { addUser, removeUser, userProfile } = useAuthStore();
  const router = useRouter();
  const onSearchHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search/${search}`)
  };
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="TikTik"
            layout="responsive"
          />
        </div>
      </Link>
      <div className="hidden md:block">
        <form
          onSubmit={onSearchHandler}
          className="bg-gray-100 focus-within:bg-white focus-within:border focus-within:border-blue-400 transition-all duration-300 ease-out rounded-full px-3 py-2 flex items-center relative"
        >
          <input
            className="bg-transparent outline-none pr-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search accounts and videos"
          />
          <button type="submit" disabled={!search.trim()}>
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                  <Image
                    src={userProfile.image}
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    alt="profile phoot"
                  />
                </>
              </Link>
            )}
            <button
              title="logout"
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Error")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
