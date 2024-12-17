import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(205,202,233)]">
      <div className="w-[350px] text-[#ffffff] p-2 mx-auto">
        <div className="bg-[#6f68d1] p-4 rounded-md shadow-lg">
          <h2 className="text-xl mb-3 font-bold">Welcome to Ecommerce</h2>
          <p className="text-sm mb-3 font-medium">Please Sign In to your account</p>
          <form>
            {/* Email Field */}
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                className="bg-transparent border-slate-400"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                className="bg-transparent border-slate-400"
              />
            </div>

            {/* Sign In Button */}
            <Link
              type="submit"
              href="/seller/dashboard"
              className="bg-slate-800 w-full hover:shadow-lg hover:shadow-blue-300/50 text-white rounded-md px-7 py-2 mb-3 block text-center"
            >
              Sign In
            </Link>

            {/* Sign Up Link */}
            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Don&apos;t Have an account?{" "}
                <a href="/register" className="font-bold underline">
                  Sign Up
                </a>
              </p>
            </div>

            {/* Divider */}
            <div className="w-full flex justify-center items-center mb-3">
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              <div className="w-[10%] flex justify-center items-center">
                <span className="pb-1">Or</span>
              </div>
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
            </div>

            {/* Social Media Sign In */}
            <div className="flex justify-center items-center gap-3">
              {/* Google Button */}
              <div className="w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center">
                <span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 488 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>
                </span>
              </div>

              {/* Facebook Button */}
              <div className="w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-blue-700/50 justify-center cursor-pointer items-center">
                <span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
