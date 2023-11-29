import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  // State to manage form data
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    language: "",
    availability: [],
  });

  // React Router hook for navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.phone.length < 10 || data.phone.length > 10) {
      return alert("Please Provide A Valid India Contact Number");
    }
    try {
      // Sending a POST request to the server
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/register`,
        data
      );

      // Handling the response from the server
      if (response.data.success) {
        alert(response.data.message);
        navigate("/");
        // Resetting the form data on successful registration
        setData({
          name: "",
          email: "",
          phone: "",
          location: "",
          language: "",
          availability: [],
        });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong");
    }
  };

  // Function to handle changes in form inputs
  const onChange = (e) => {
    if (e.target.name === "availability") {
      let temp = { ...data };

      if (e.target.checked) {
        // If checkbox is checked, add the value to the array
        temp.availability.push(e.target.value);
      } else {
        // If checkbox is unchecked, remove the value from the array
        temp.availability = temp.availability.filter(
          (value) => value !== e.target.value
        );
      }
      setData(temp);
    } else {
      // Update other form fields
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <div className="bg-gray-50  py-2 dark:bg-gray-900">
        <div className="flex  flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl  font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Volunteer Registration
              </h1>

              <form className="space-y-4 md:space-y-4" onSubmit={handleSubmit}>
                {/* Form fields */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name:
                  </label>
                  <input
                    type="text"
                    value={data.name}
                    name="name"
                    onChange={onChange}
                    placeholder="Enter Your Name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email:
                  </label>
                  <input
                    type="text"
                    value={data.email}
                    name="email"
                    onChange={onChange}
                    placeholder="Enter Your Email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Phone Number:
                  </label>
                  <input
                    type="number"
                    value={data.phone}
                    name="phone"
                    onChange={onChange}
                    placeholder="Enter Your Phone Number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Location:
                  </label>
                  <input
                    type="text"
                    value={data.location}
                    name="location"
                    onChange={onChange}
                    placeholder="Enter Your Location"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <form className="max-w-sm mx-auto">
                  <label
                    htmlFor="language"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Avalable Spoken Languages:
                  </label>
                  <select
                    id="language"
                    name="language"
                    onChange={onChange}
                    placeholder="Language"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected disabled hidden>
                      Language
                    </option>
                    <option value="Hindi">Hindi</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Tamil">Tamil</option>
                  </select>
                </form>

                <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Available Days:
                </h1>
                <div className="flex flex-wrap">
                  <div className="w-28">
                    <input
                      type="checkbox"
                      onChange={onChange}
                      name="availability"
                      value="Monday"
                      id="Monday"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="Monday"
                      className="ms-2 me-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Monday
                    </label>
                  </div>
                  <div className="w-28">
                    <input
                      type="checkbox"
                      onChange={onChange}
                      name="availability"
                      value="Tuesday"
                      id="Tuesday"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="Tuesday"
                      className="ms-2 me-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Tuesday
                    </label>
                  </div>
                  <div className="w-28">
                    <input
                      type="checkbox"
                      onChange={onChange}
                      name="availability"
                      value="Wednesday"
                      id="Wednesday"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="Wednesday"
                      className="ms-2 me-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Wednesday
                    </label>
                  </div>
                  <div className="w-28">
                    <input
                      type="checkbox"
                      onChange={onChange}
                      name="availability"
                      value="Thursday"
                      id="Thursday"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="Thursday"
                      className="ms-2 me-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Thursday
                    </label>
                  </div>
                  <div className="w-28">
                    <input
                      type="checkbox"
                      onChange={onChange}
                      name="availability"
                      value="Friday"
                      id="Friday"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="Friday"
                      className="ms-2 me-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Friday
                    </label>
                  </div>
                  <div className="w-28">
                    <input
                      type="checkbox"
                      onChange={onChange}
                      name="availability"
                      value="Saturday"
                      id="Saturday"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="Saturday"
                      className="ms-2 me-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Saturday
                    </label>
                  </div>
                  <div className="w-28">
                    <input
                      type="checkbox"
                      onChange={onChange}
                      name="availability"
                      value="Sunday"
                      id="Sunday"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="Sunday"
                      className="ms-2 me-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Sunday
                    </label>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full dark:bg-blue-600 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
