import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { join } from "@/apis/login";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import Input from "@/components/Input/Input";
import InputLabel from "@/components/Label/InputLabel";
import { LOGIN_QR_URL } from "@/constants/routes";
// import { LOGIN_QR_URL } from "@/constants/routes";
import { cells, communities, teams } from "@/dummy/organization";
import LoginLayout from "@/pages/Login/components/LoginLayout";

type JoinCheckParam = {
  userName: string;
  telNo: string;
  cmt: string;
  gar: string;
  leaf: string;
};

const LoginSignUp = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      userName: "",
      telNo: "",
      cmt: "",
      gar: "",
      leaf: "",
    },
  });
  const navigate = useNavigate();
  const { state } = useLocation();

  const joinCheck = async (data: JoinCheckParam) => {
    const isJoin = await join({
      userName: data.userName,
      telNo: data.telNo,
      token: state,
      provider: "kakao",
      cpsCD: "PTK",
      cmtCD: "FAITH",
      garCD: "MATTHEW",
      leafCD: "MATTHEW_01",
    });
    if (isJoin) {
      navigate(LOGIN_QR_URL);
    }
  };

  return (
    <LoginLayout>
      <form
        className="flex h-full w-96 flex-col items-center justify-between py-12 "
        onSubmit={handleSubmit(data => {
          console.log(JSON.stringify(data));
          joinCheck(data);
        })}
      >
        <div className="mb-12 flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold">회원가입</h1>
          <p className="text-base">회원 정보를 입력해주세요.</p>
        </div>
        <div className="flex h-full w-full flex-col gap-4 ">
          <div className="flex w-full flex-col gap-2">
            <InputLabel text="이름" htmlFor="userName" isRequired={true} />
            <Input
              id="userName"
              type="text"
              placeholder="이름을 입력하세요"
              {...register("userName")}
              variant="default"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <InputLabel
              text="전화번호 (- 포함)"
              htmlFor="telNo"
              isRequired={true}
            />
            <Input
              id="telNo"
              type="text"
              placeholder="전화번호를 입력하세요"
              {...register("telNo")}
              variant="default"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <InputLabel text="소속" htmlFor="belong" isRequired={true} />
            <div className="grid grid-cols-3 gap-2">
              <Controller
                control={control}
                name="cmt"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    category="cmt"
                    options={communities}
                    disabled={false}
                    onChangeOption={onChange}
                    selectedOption={value}
                  />
                )}
              />
              <Controller
                control={control}
                name="gar"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    category="gar"
                    options={teams}
                    disabled={false}
                    onChangeOption={onChange}
                    selectedOption={value}
                  />
                )}
              />
              <Controller
                control={control}
                name="leaf"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    category="leaf"
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
