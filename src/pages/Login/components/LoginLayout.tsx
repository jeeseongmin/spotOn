import { PropsWithChildren } from "react";

import login from "@/assets/images/login.png";

const LoginLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <section className="flex h-2/3 w-2/3 flex-col rounded-md border border-gray-300 shadow-lg xl:flex-row">
        <div className="relative h-1/2 w-full xl:h-full xl:w-1/2">
          <img
            src={login}
            className="h-full w-full rounded-l-md object-cover"
          />
          <div className="absolute right-0 top-0 h-full w-full rounded-l-md bg-blue-900/30 px-12 py-8 text-white xl:py-20">
            <p className="text-md font-bold">Shalom!</p>
            <p className="text-xl font-bold">평택 온누리교회 장소 예약</p>
            <div className="absolute left-0 top-0 hidden h-full w-full flex-col items-center justify-end px-12 pb-16 text-center md:flex xl:justify-center xl:pb-0">
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm">
                  “하나님의 나라를 전파하며 주 예수 그리스도에 관한 모든 것을
                  담대하게 거침없이 가르치더라”
                </p>
                <br />
                <p className="font-bold">사도행전 28:31</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center px-12 xl:w-1/2">
          {children}
        </div>
      </section>
    </div>
  );
};

export default LoginLayout;
