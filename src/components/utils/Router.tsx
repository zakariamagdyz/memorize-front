import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../Loading/Loading";
const RequireAuth = lazy(() => import("./RequireAuth"));
const RequireAnon = lazy(() => import("./RequireAnon"));
const Home = lazy(() => import("../../pages/Home"));
const Login = lazy(() => import("../../pages/auth/Login"));
const Header = lazy(() => import("../Header/Header"));
const Signup = lazy(() => import("../../pages/auth/Signup"));
const ForgotPassword = lazy(() => import("../../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../../pages/auth/ResetPassword"));
const Activation = lazy(() => import("../../pages/auth/Activation"));
const UnAuthorized = lazy(() => import("../../pages/auth/UnAuthorized"));
const NotFound = lazy(() => import("../../components/NotFound/NotFound"));

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Header />}>
          <Route index element={<div>Home Page</div>} />
          <Route element={<RequireAnon />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route
              path="activate-account/:activeToken"
              element={<Activation />}
            />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route
              path="reset-password/:resetToken"
              element={<ResetPassword />}
            />
          </Route>
          <Route element={<RequireAuth roles={[2001]} />}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<div>sdf</div>}></Route>
            <Route path="unauthorized" element={<UnAuthorized />} />
          </Route>
          <Route element={<RequireAuth roles={[2004]} />}>
            <Route path="editor" element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
