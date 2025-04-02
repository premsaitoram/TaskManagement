"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";

function LoginForm() {
  const { loginUser, userState, handlerUserInput } = useUserContext();
  const { email, password } = userState;
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <form className="relative m-[2rem] px-10 py-14 rounded-2xl bg-white w-full max-w-[520px] shadow-lg border border-gray-100">
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-[#2ECC71] to-[#7263F3] p-3 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="mb-2 text-center text-[1.5rem] font-bold text-gray-800">
            Login to Your Account
          </h1>
          <p className="mb-8 px-[2rem] text-center text-gray-500 text-[14px]">
            Login Now. Don't have an account?{" "}
            <a
              href="/register"
              className="font-bold text-[#2ECC71] hover:text-[#7263F3] transition-all duration-300"
            >
              Register here
            </a>
          </p>
        </div>

        <div className="mt-[1rem] flex flex-col">
          <label htmlFor="email" className="mb-2 text-gray-600 font-medium">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => handlerUserInput("email")(e)}
              name="email"
              className="pl-10 w-full px-4 py-3 border-[2px] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent text-gray-800"
              placeholder="johndoe@gmail.com"
            />
          </div>
        </div>
        
        <div className="relative mt-[1rem] flex flex-col">
          <label htmlFor="password" className="mb-2 text-gray-600 font-medium">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => handlerUserInput("password")(e)}
              name="password"
              className="pl-10 w-full px-4 py-3 border-[2px] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent text-gray-800"
              placeholder="***************"
            />
            <button
              type="button"
              className="absolute p-1 right-4 top-1/2 transform -translate-y-1/2 text-[22px] text-gray-500"
            >
              {showPassword ? (
                <i className="fas fa-eye-slash" onClick={togglePassword}></i>
              ) : (
                <i className="fas fa-eye" onClick={togglePassword}></i>
              )}
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <a
            href="/forgot-password"
            className="font-bold text-[#2ECC71] text-[14px] hover:text-[#7263F3] transition-all duration-300"
          >
            Forgot password?
          </a>
        </div>
        
        <div className="flex">
          <button
            type="submit"
            disabled={!email || !password}
            onClick={loginUser}
            className="mt-[1.5rem] flex-1 px-4 py-4 font-bold bg-gradient-to-r from-[#2ECC71] to-[#1abc9c] text-white rounded-md hover:from-[#1abc9c] hover:to-[#7263F3] transition-all duration-300 shadow-md transform hover:translate-y-[-2px]"
          >
            Login Now
          </button>
        </div>
        
        <div className="mt-6 relative flex items-center justify-center">
          <div className="absolute border-t border-gray-200 w-full"></div>
          <div className="relative bg-white px-4 text-sm text-gray-500">
            Or continue with
          </div>
        </div>
        
        <div className="mt-4 flex justify-center gap-4">
          <button type="button" className="p-3 rounded-full border-2 border-gray-200 hover:bg-gray-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#DB4437">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
            </svg>
          </button>
          <button type="button" className="p-3 rounded-full border-2 border-gray-200 hover:bg-gray-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
            </svg>
          </button>
          <button type="button" className="p-3 rounded-full border-2 border-gray-200 hover:bg-gray-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000">
              <path d="M22.018 13.298c0-3.909-2.787-7.071-6.216-7.071-3.429 0-6.217 3.162-6.217 7.071 0 3.513 2.204 6.413 5.078 6.98v-4.936h-1.527v-2.044h1.527v-1.559c0-1.764.831-2.739 2.521-2.739.728 0 1.354.145 1.354.145v1.752h-.763c-.752 0-.987.556-.987 1.126v1.275h1.679l-.269 2.044h-1.41v4.936c2.875-.567 5.078-3.467 5.078-6.98z"/>
            </svg>
          </button>
        </div>
      </div>
      <img src="/flurry.png" alt="" className="absolute bottom-0 right-0 opacity-20" />
    </form>
  );
}

export default LoginForm;