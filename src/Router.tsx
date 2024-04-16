import React, { FC } from "react";

import { Route, Routes, useLocation } from "react-router-dom";

import LoginMain from "@/pages/Login/LoginMain";
import LoginSignUp from "@/pages/Login/LoginSignUp";

//type RouterProps = {};

const Router: FC = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="" element={<div>default page</div>} />
      <Route path="/login/main" element={<LoginMain />} />
      <Route path="/login/signup" element={<LoginSignUp />} />
    </Routes>
  );
};

export default Router;
