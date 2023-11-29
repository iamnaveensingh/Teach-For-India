import React, { useEffect, useState } from "react";
import axios from "axios";

const CandidatesList = () => {
  // State to store the candidate data
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState("hidden");

  // useEffect to fetch data when the component mounts
  const fetchData = async () => {
    try {
      // Sending a GET request to fetch the list of candidates
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/candidatesList`,
        { withCredentials: true }
      );
      // Updating the state with the received data
      setData(response.data.list);
    } catch (error) {
      // Handling errors if any occur during the data fetching process
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    // Calling the fetchData function when the component mounts
    setDisplay("");
    fetchData();
    setDisplay("hidden");
  }, []);
  const allocate = async () => {
    setDisplay("");
    try {
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}allocation/allocate`,
        {
          withCredentials: true,
        }
      );
      fetchData();
    } catch (error) {
      console.error("Error during allocation:", error);
      // Handle the error as needed (e.g., show an error message)
    } finally {
      setDisplay("hidden");
    }
  };

  const deallocate = async () => {
    setDisplay("");
    try {
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}allocation/unallocated`,
        {
          withCredentials: true,
        }
      );

      fetchData();
    } catch (error) {
      console.error("Error during allocation:", error);
      // Handle the error as needed (e.g., show an error message)
    } finally {
      setDisplay("hidden");
    }
  };
  return (
    <>
      <div className="bg-gray-50 min-h-screen py-2 dark:bg-gray-900">
        <div
          className={`${display} fixed z-10 bg-opacity-70 backdrop-blur-[1px] bg-black h-screen w-screen `}
        >
          <div role="status" className="fixed left-[50%]  top-[50%] opacity-90">
            <svg
              aria-hidden="true"
              className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div>
          {/* Heading for the list of candidates */}
          <h1 className="my-6 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              List of candidates
            </span>
          </h1>
        </div>
        <div className="flex my-2 justify-center">
          <button
            type="button"
            onClick={deallocate}
            className="text-white mx-2 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Deallocate
          </button>
          <button
            type="button"
            onClick={allocate}
            className="text-white mx-2 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Allocate
          </button>
        </div>
        <div className="relative mx-10 overflow-x-auto shadow-md sm:rounded-lg">
          {/* Table to display the list of candidates */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {/* Table headers */}
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Spoken Languages
                </th>
                <th scope="col" className="px-6 py-3">
                  Availability
                </th>
                <th scope="col" className="px-6 py-3">
                  Allocated Classroom ID
                </th>
              </tr>
            </thead>

            <tbody>
              {/* Mapping through the array of candidates and rendering table rows */}
              {Array.isArray(data) &&
                data.map((candidate) => (
                  <tr
                    key={candidate._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    {/* Table data for each candidate */}
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {candidate.name}
                    </th>
                    <td className="px-6 py-4">{candidate.email}</td>
                    <td className="px-6 py-4">{candidate.phone}</td>
                    <td className="px-6 py-4">{candidate.location}</td>
                    <td className="px-6 py-4">{candidate.language}</td>
                    <td className="px-6 py-4">
                      {" "}
                      {candidate.availability.join(" , ")}
                    </td>
                    <td className="px-6 py-4">
                      {candidate.allocatedClassroomId}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CandidatesList;
