import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  // State to track the login status
  const [status, setStatus] = useState(false);

  // Get the navigate function from React Router, used for programmatic navigation
  const navigate = useNavigate();

  useEffect(() => {
    // Define an asynchronous function to check the login status
    const getLoginStatus = async () => {
      try {
        // Make an Axios GET request to the server to check the login status
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin-loginstatus`,
          { withCredentials: true } // Include credentials for cross-origin requests
        );

        // Check if the server indicates a successful login
        if (response.data.success) {
          // If successful, set the status to true
          setStatus(true);
        }
      } catch (error) {
        // Handle errors
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          // If the server responds with a 401, navigate to the "/admin" route
          navigate("/admin", { replace: true });
        } else {
          // Log other errors to the console
          console.log(error);
        }
      }
    };

    // Call the function to check login status when the component mounts
    getLoginStatus();
  }, [navigate]); // useEffect dependency: navigate function to ensure consistent behavior

  // Render the children components only if the login status is true
  return status ? children : null;
};

export default PrivateRoute;
