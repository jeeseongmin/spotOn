import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import Input from "@/components/Input/Input";
import InputLabel from "@/components/Label/InputLabel";
import { LOGIN_QR_URL } from "@/constants/routes";
import { cells, communities, teams } from "@/dummy/organization";
import LoginLayout from "@/pages/Login/components/LoginLayout";

const LoginSignUp = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      community: "",
      team: "",
      cell: "",
    },
  });
  const navigate = useNavigate();

  return (
    <LoginLayout>
      <form
        className="flex h-full w-96 flex-col items-center justify-between py-12 "
        onSubmit={handleSubmit(data => {
          console.log(JSON.stringify(data));
          navigate(LOGIN_QR_URL);
        })}
      >
        <div className="mb-12 flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold">회원가입</h1>
          <p className="text-base">회원 정보를 입력해주세요.</p>
        </div>
        <div className="flex h-full w-full flex-col gap-4 ">
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
              <Controller
                control={control}
                name="community"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    category="community"
                    options={communities}
                    disabled={false}
                    onChangeOption={onChange}
                    selectedOption={value}
                  />
                )}
              />
              <Controller
                control={control}
                name="team"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    category="team"
                    options={teams}
                    disabled={false}
                    onChangeOption={onChange}
                    selectedOption={value}
                  />
                )}
              />
              <Controller
                control={control}
                name="cell"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    category="cell"
                    options={cells}
                    disabled={false}
                    onChangeOption={onChange}
                    selectedOption={value}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <Button variant="primary" type="submit">
          회원가입
        </Button>
      </form>
    </LoginLayout>
  );
};

export default LoginSignUp;
