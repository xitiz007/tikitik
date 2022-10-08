import { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";
  const userProfile = false;

  return (
    <div>
      <div
        onClick={() => setShowSidebar((show) => !show)}
        className="cursor-pointer block xl:hidden m-2 ml-4 mt-3 text-xl"
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="w-20 xl:w-400 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">For you</span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-400">
                Log in to like and comment on videos
              </p>
              <div className="pr-4">
                {/* <div
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy="single_host_origin"
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="cursor-pointer bg-white text-[#F51997] border-[1px] border-[#F51997] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#F51997] transition-colors duration-200 ease-in-out"
                    >
                      Login
                    </button>
                  )}
                /> */}
              </div>
            </div>
          )}
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
