"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const VerifyEmailPage = ({ params: { token } }) => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const verifyEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/verify-email", { token });
      setVerified(true);
      setLoading(false);
    } catch (error) {
      console.error("Error verifying email:", error);
      setLoading(false);
      setErrors((prevState) => ({
        ...prevState,
        server: "Invalid token!",
        emailVerified: false,
      }));
    }
  };

  const validatePassword = (input) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(input);
  };

  useEffect(() => {
    if (validatePassword(password) || password.length === 0) {
      setErrors((prevState) => ({
        ...prevState,
        password: "",
      }));
    }
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setErrors((prevState) => ({
        ...prevState,
        password:
          "Password must be at least 8 characters and include a letter and a number",
      }));
      return;
    }
    if (password !== confirmPassword) {
      setErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/set-password", { password, token });
      router.push("/login");
    } catch (error) {
      console.error("Error:", error);
      setErrors((prevState) => ({
        ...prevState,
        password: error.response.data.msg,
      }));
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-[300px] md:w-[400px]">
        {verified ? (
          <>
            <h2 className="text-2xl font-semibold mb-6">Secure Your Account</h2>
            {!errors.emailVerified && (
              <p className="text-red-500 text-sm">{errors.server}</p>
            )}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="text-gray-600"
                >
                  Set Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="confirmPassword"
                  className="text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
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
                  "Submit"
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6">Email Verification</h2>
            {!errors.emailVerified && (
              <p className="text-red-500 text-sm">{errors.server}</p>
            )}
            <p className="text-gray-600 mb-4">
              Please click the button below to verify your email address:
            </p>
            <button
              className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue min-h-[40px] min-w-[110px]"
              onClick={verifyEmail}
            >
              {loading ? (
                <BeatLoader
                  color={"#ffffff"}
                  size={10}
                />
              ) : (
                <>Verify Email</>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
