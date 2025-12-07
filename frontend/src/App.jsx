import  { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy loading components
const Start = lazy(() => import("./pages/Start"));
const UserLogin = lazy(() => import("./pages/UserLogin"));
const UserSignup = lazy(() => import("./pages/UserSignup"));
const Captainlogin = lazy(() => import("./pages/Captainlogin"));
const CaptainSignup = lazy(() => import("./pages/CaptainSignup"));
const Home = lazy(() => import("./pages/Home"));
const UserProtectWrapper = lazy(() => import("./pages/UserProtectWrapper"));
const UserLogout = lazy(() => import("./pages/UserLogout"));
const CaptainHome = lazy(() => import("./pages/CaptainHome"));
const CaptainProtectWrapper = lazy(() => import("./pages/CaptainProtectWrapper")
);

const CaptainLogout = lazy(() => import("./pages/CaptainLogout"));
const Riding = lazy(() => import("./pages/Riding"));
 const CaptainRiding = lazy(() => import("./pages/CaptainRiding"));
 

const App = () => {
  return (
    <div>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/riding" element={<Riding />} />
          <Route path="/captain-riding" element={<CaptainRiding />} />

          <Route path="/signup" element={<UserSignup />} />
          <Route path="/captain-login" element={<Captainlogin />} />
          <Route path="/captain-signup" element={<CaptainSignup />} />
          <Route
            path="/home"
            element={
              <UserProtectWrapper>
                <Home />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/user/logout"
            element={
              <UserProtectWrapper>
                <UserLogout />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/captain-home"
            element={
              <CaptainProtectWrapper>
                <CaptainHome />
              </CaptainProtectWrapper>
            }
          />
          <Route
            path="/captain/logout"
            element={
              <CaptainProtectWrapper>
                <CaptainLogout />
              </CaptainProtectWrapper>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
