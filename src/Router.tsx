import React, { FC } from "react";

import { Route, Routes, useLocation } from "react-router-dom";

//type RouterProps = {};

const Router: FC = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="" element={<div>default page</div>} />
      <Route path="/test" element={<div>test</div>} />
    </Routes>
  );
};

export default Router;
