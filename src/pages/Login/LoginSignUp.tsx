import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import Input from "@/components/Input/Input";
import InputLabel from "@/components/Label/InputLabel";
import { cells, communities, teams } from "@/dummy/organization";
import LoginLayout from "@/pages/Login/components/LoginLayout";

const LoginSignUp = () => {
  const { register, handleSubmit, setValue } = useForm();

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

        <Button variant="primary" type="submit" text="회원가입" />
      </form>
    </LoginLayout>
  );
};

export default LoginSignUp;
