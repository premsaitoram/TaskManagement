"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const { user } = useUserContext();
  const { openModalForAdd, activeTasks } = useTasks();

  const router = useRouter();

  const { name } = user;

  const userId = user._id;

  return (
    <header className="px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9]">
      <div>
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-[#3aafae] to-[#00A1F1] w-10 h-10 rounded-full flex items-center justify-center text-white text-lg mr-3">
            {name ? name.charAt(0).toUpperCase() : "T"}
          </div>
          <div>
            <h1 className="text-lg font-medium">
              <span role="img" aria-label="wave">
                👋
              </span>
              {userId ? `Welcome, ${name}!` : "Welcome to TaskManagement"}
            </h1>
            <p className="text-sm">
              {userId ? (
                <>
                  You have{" "}
                  <span className="font-bold text-[#3aafae]">
                    {activeTasks.length}
                  </span>
                  &nbsp;active tasks
                </>
              ) : (
                "Please login or register to view your tasks"
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="h-[50px] flex items-center gap-[10.4rem]">
        {userId && (
          <div className="flex items-center bg-gray-50 rounded-full px-3 py-1 mr-4">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#3aafae] mr-2"></div>
              <span className="text-xs text-gray-600">Active Tasks</span>
            </div>
            <div className="bg-[#3aafae] ml-2 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {activeTasks.length}
            </div>
          </div>
        )}
        <button
          className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
          hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
          onClick={() => {
            if (userId) {
              openModalForAdd();
            } else {
              router.push("/login");
            }
          }}
        >
          {userId ? "Add a new Task" : "Login / Register"}
        </button>
      </div>
    </header>
  );
}

export default Header;
