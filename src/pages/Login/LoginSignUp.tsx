import { useForm } from "react-hook-form";

import Dropdown from "@/components/Dropdown/Dropdown";
import Input from "@/components/Input/Input";
import InputLabel from "@/components/Label/InputLabel";
import LoginLayout from "@/pages/Login/components/LoginLayout";

const LoginSignUp = () => {
  const { register, handleSubmit, setValue } = useForm();
  const communities = ["대학청년부", "믿음", "소망"];
  const teams = [
    "1번 다락방",
    "2번 다락방",
    "3번 다락방",
    "4번 다락방",
    "5번 다락방",
  ];
  const cells = [
    "누가 1순",
    "마가 1순",
    "요셉 1순",
    "서영순",
    "길동순",
    "성민순",
    "희라순",
  ];

  return (
    <LoginLayout>
      <form
        className="flex h-full w-96 flex-col items-center justify-between py-12 2xl:py-24"
        onSubmit={handleSubmit(data => alert(JSON.stringify(data)))}
      >
        <div className="mb-12 flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold">회원가입</h1>
          <p>회원 정보를 입력해주세요.</p>
        </div>
        <div className="flex h-full w-full flex-col gap-4 2xl:gap-8">
          <div className="flex w-full flex-col gap-2">
            <InputLabel text="이름" htmlFor="name" isRequired={true} />
            <Input
              id="name"
              type="text"
              placeholder="이름을 입력하세요"
              {...register("name")}
              variant="default"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <InputLabel text="전화번호" htmlFor="phone" isRequired={true} />
            <Input
              id="phone"
              type="text"
              placeholder="전화번호를 입력하세요"
              {...register("phone")}
              variant="default"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <InputLabel text="소속" htmlFor="belong" isRequired={true} />
            <div className="grid grid-cols-3 gap-2">
              <Dropdown
                category="community"
                options={communities}
                disabled={false}
                {...register("community")}
                setValue={setValue}
                variant={"default"}
              />
              <Dropdown
                category="team"
                options={teams}
                disabled={false}
                {...register("team")}
                setValue={setValue}
                variant={"default"}
              />
              <Dropdown
                category="cell"
                options={cells}
                disabled={false}
                {...register("cell")}
                setValue={setValue}
                variant={"default"}
              />
            </div>
          </div>
        </div>

        <button type="submit">회원가입</button>
      </form>
    </LoginLayout>
  );
};

export default LoginSignUp;
