import { PropsWithChildren } from "react";

import { useLocation } from "react-router-dom";

import Header from "@/components/Header";
import { pageTitle } from "@/constants/common";

const Layout = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const pageName = location.pathname.split("/")[1];
  const mainTitle = pageTitle[pageName].mainTitle;
  const subTitle = pageTitle[pageName].subTitle;

  const MainTitle = ({ children }: PropsWithChildren) => {
    return <h1 className="text-2xl font-thin text-blue-800">{children}</h1>;
  };

  const SubTitle = ({ children }: PropsWithChildren) => {
    return <h2 className="text-3xl font-bold">{children}</h2>;
  };

  return (
    <div>
      <Header />
      <div className="px-60 py-12">
        <div className="mb-10 flex flex-col gap-2">
          <MainTitle>{mainTitle}</MainTitle>
          <SubTitle>{subTitle}</SubTitle>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Layout;
