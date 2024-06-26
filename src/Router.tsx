import { FC } from "react";

import { Route, Routes, useLocation } from "react-router-dom";

import {
  ADMIN_MAIN_URL,
  HOME_MAIN_URL,
  LOGIN_MAIN_URL,
  LOGIN_QR_URL,
  LOGIN_SIGNUP_URL,
  MYPAGE_MAIN_URL,
  RESERVATION_MAIN_URL,
} from "@/constants/routes";
import Home from "@/pages/Home";
import LoginMain from "@/pages/Login/LoginMain";
import LoginSignUp from "@/pages/Login/LoginSignUp";
import LoginWait from "@/pages/Login/LoginWait";
import MyPage from "@/pages/MyPage";
import ReservationPage from "@/pages/Reservation";

//type RouterProps = {};

const Router: FC = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="" element={<div>default page</div>} />
      <Route path={LOGIN_MAIN_URL} element={<LoginMain />} />
      <Route path={LOGIN_SIGNUP_URL} element={<LoginSignUp />} />
      <Route path={LOGIN_QR_URL} element={<LoginWait />} />

      <Route path={RESERVATION_MAIN_URL} element={<ReservationPage />} />
      <Route path={HOME_MAIN_URL} element={<Home />} />
      <Route path={MYPAGE_MAIN_URL} element={<MyPage />} />
      <Route path={ADMIN_MAIN_URL} element={<></>} />
    </Routes>
  );
};

export default Router;
