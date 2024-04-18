import { PropsWithChildren } from "react";

import login from "@/assets/images/login.png";

const LoginLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="mx-auto my-auto flex h-screen w-max items-center justify-center overflow-scroll">
      <section className="flex h-[600px] w-[1100px] flex-row rounded-md border border-gray-300 shadow-lg">
        <div className="relative h-full w-1/2 ">
          <img
            src={login}
            className="h-full w-full rounded-l-md object-cover"
          />
          <div className="absolute right-0 top-0 h-full w-full rounded-l-md bg-blue-900/30 px-12 py-20 text-white">
            <p className="text-md font-bold">Shalom!</p>
            <p className="text-xl font-bold">평택 온누리교회 장소 예약</p>
            <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center px-12 pb-0 text-center">
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm">
                  “하나님의 나라를 전파하며 주 예수 그리스도에 관한 <br />
                  모든 것을 담대하게 거침없이 가르치더라”
                </p>
                <br />
                <p className="font-bold">사도행전 28:31</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full w-1/2 flex-col items-center justify-center px-12">
          {children}
        </div>
      </section>
    </div>
  );
};

export default LoginLayout;
