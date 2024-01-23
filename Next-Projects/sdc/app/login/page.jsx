"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { BeatLoader } from "react-spinners";

const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/login", {
        username,
        password,
      });

      const data = await res.data;

      if (data?.tokens?.libraryToken) {
        Cookies.set("libraryToken", data?.tokens?.libraryToken, {
          expires: 15,
        });
      }
      if (data?.tokens?.festToken) {
        Cookies.set("festToken", data?.tokens?.festToken, {
          expires: 15,
        });
      }
      if (data?.tokens?.staffToken) {
        Cookies.set("staffToken", data?.tokens?.staffToken, {
          expires: 15,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors(
        error.response ? error.response.data.msg : "Something went wrong."
      );
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleLogin}
        >
          <div className="rounded-md shadow-sm space-y-3">
            {errors && <p className="text-red-500 text-sm">{errors}</p>}
            <div>
              <input
                id="username"
                name="username"
                type="name"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <div>
              <select
                id="options"
                name="options"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={selectedOption}
                required
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option
                  value=""
                  disabled
                >
                  Select an option
                </option>
                <option value="Meelad Fest">Meelad Fest</option>
                <option value="Attendance">Attendance</option>
                <option value="Library">Library</option>
              </select>
            </div> */}
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? (
                <BeatLoader
                  color={"#ffffff"}
                  size={10}
                />
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
