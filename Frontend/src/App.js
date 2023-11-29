import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import CandidatesList from "./pages/candidatesList";
import AdminLogin from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./pages/PrivateRoute";
import PublicRoutes from "./pages/PublicRoutes";

function App() {
  return (
    <>
      <Header />
      <div className="pt-14">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/candidatesList" element={<CandidatesList />} /> */}
          <Route
            path="/admin"
            element={
              // <PublicRoutes>
                <AdminLogin />
              // </PublicRoutes>
            }
          />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/candidatesList"
            element={
              <PrivateRoute>
                <CandidatesList />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
