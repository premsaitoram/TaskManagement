import React from "react";
import Profile from "../Profile/Profile";
import { useUserContext } from "@/context/userContext";

function Sidebar() {
  const { logoutUser } = useUserContext();
  return (
    <div className="w-[20rem] mt-[5rem] h-[calc(100vh-5rem)] fixed right-0 top-0 bg-[#f9f9f9] flex flex-col overflow-y-auto">
      <div className="flex-grow">
        <Profile />
      </div>

      <div className="sticky bottom-0 w-full bg-[#f9f9f9] py-4">
        <button
          className="mx-6 py-4 px-8 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#3aafae] transition duration-200 ease-in-out w-[calc(100%-3rem)]"
          onClick={logoutUser}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;