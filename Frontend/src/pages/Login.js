import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  // State to manage form data (email and password)
  const [{ email, password }, setData] = useState({
    email: "",
    password: "",
  });

  // Get the navigate function from React Router, used for programmatic navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the server with the provided credentials
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin`,
        {
          email,
          password,
        }
      );

      // Check if the login was successful
      if (response.data.success) {
        // Set the authentication token in a cookie with an expiration time
        document.cookie = `token=${response.data.token}; expires=${new Date(
          Date.now() + 1000 * 86400
        )}; path=/; Secure; HttpOnly; SameSite=None`;

        // Display a success message and navigate to the "/candidatesList" route

        navigate("/candidatesList");
      } else {
        // Display an error message if the login was not successful
        alert("Something Went Wrong");
      }
    } catch (error) {
      // Handle errors, log to the console for now
      console.log(error);

      // Display a generic error message
      alert("Something went wrong");
    }
  };
  // Function to handle input changes and update state
  const onChange = (e) => {
    setData({ ...{ email, password }, [e.target.name]: e.target.value });
  };
  
  console.log(document.cookie.token,"cookiesss")
  console.log(document.cookie,"All cookiesss")
  // Render the login form
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            <form className="space-y-4 md:space-y-4" onSubmit={handleSubmit}>
              {/* Email Input */}
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email:
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={email}
                  name="email"
                  onChange={onChange}
                  autoComplete="username"
                  placeholder="Enter Your Email"
                  required
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* Password Input */}
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password:
              </label>
              <input
                type="password"
                value={password}
                name="password"
                onChange={onChange}
                autoComplete="current-password"
                placeholder="Enter Your Password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full dark:bg-blue-600 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
