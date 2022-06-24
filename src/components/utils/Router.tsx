import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const RequireAuth = lazy(() => import("./RequireAuth"));
const RequireAnon = lazy(() => import("./RequireAnon"));
const Home = lazy(() => import("../../pages/Home"));
const Login = lazy(() => import("../../pages/Login"));
const Header = lazy(() => import("../Header/Header"));

const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Header />}>
          <Route index element={<div>Home Page</div>} />
          <Route element={<RequireAnon />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<div>sdf</div>}></Route>
          </Route>
          <Route path="*" element={<div>Not found</div>}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
