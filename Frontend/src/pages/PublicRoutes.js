import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  // Get the navigate function from React Router, used for programmatic navigation
  const navigate = useNavigate();

  useEffect(() => {
    // Define an asynchronous function to check the login status
    const getLoginStatus = async () => {
      try {
        // Make an Axios GET request to the server to check the login status
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}api/admin-loginstatus`,
          { withCredentials: true } // Include credentials for cross-origin requests
        );

        // Check if the server indicates a successful login
        if (response.data.success) {
          // If successful, navigate to the "/candidatesList" route
          navigate("/candidatesList");
        }
      } catch (error) {
        // Handle errors, log to the console for now
        console.log(error);
      }
    };

    // Call the function to check login status when the component mounts
    getLoginStatus();
  }, [navigate]); // useEffect dependency: navigate function to ensure consistent behavior

  // Render the children components, which will include the route components
  return children;
};

export default PublicRoutes;
