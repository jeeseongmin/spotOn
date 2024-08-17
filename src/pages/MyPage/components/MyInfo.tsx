import { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";

import { fetchCommunity, fetchGarret, fetchLeaf } from "@/apis/organization";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import Input from "@/components/Input/Input";
import InputLabel from "@/components/Label/InputLabel";
import AlertModal from "@/components/Modal/AlertModal";
import useModal from "@/hooks/useModal";
import MyPageWrapper from "@/pages/MyPage/components/MyPageLayout";
import useUserStore from "@/store/userStore";

const MyInfo = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { userName, telNo, cmtCd, garCd, leafCd } = useUserStore();
  const modal = useModal();
  const { control, register, reset, handleSubmit, watch, getValues, setValue } =
    useForm({
      defaultValues: {
        name: userName,
        phone: telNo,
        cmt: {
          id: "",
          name: "",
        },
        gar: {
          id: "",
          name: "",
        },
        leaf: {
          id: "",
          name: "",
        },
      },
    });
  const [communityList, setCommunityList] = useState([]);
  const [garretList, setGarretList] = useState([]);
  const [leafList, setLeafList] = useState([]);

  // 공동체 리스트 가져오기
  useEffect(() => {
    getCommunity();
  }, []);

  const resetList = (type: string) => {
    if (type === "cmt") {
      setCommunityList([]);
      setValue("cmt", {
        id: "",
        name: "",
      });
    } else if (type === "gar") {
      setGarretList([]);
      setValue("gar", {
        id: "",
        name: "",
      });
    } else if (type === "leaf") {
      setLeafList([]);
      setValue("leaf", {
        id: "",
        name: "",
      });
    }
  };

  // 다락방 리스트 가져오기
  useEffect(() => {
    resetList("gar");
    resetList("leaf");
    if (getValues("cmt").id !== "") {
      getGarret(getValues("cmt").id);
    }
  }, [watch("cmt")]);

  // 순 리스트 가져오기
  useEffect(() => {
    resetList("leaf");
    setValue("leaf", {
      id: "",
      name: "",
    });
    if (getValues("cmt").id !== "" && getValues("gar").id !== "") {
      getLeaf(getValues("cmt").id, getValues("gar").id);
    }
  }, [watch("gar")]);

  const getCommunity = async () => {
    const list = await fetchCommunity();
    const cp = list.map((item: any) => ({
      id: item.cmtCd,
      name: item.cmtNm,
    }));
    setCommunityList(cp);
  };

  const getGarret = async (cmtCd: string) => {
    const list = await fetchGarret(cmtCd);
    const cp = list.map((item: any) => ({
      id: item.garCd,
      name: item.garNm,
    }));
    setGarretList(cp);
  };

  const getLeaf = async (cmtCd: string, garCd: string) => {
    const list = await fetchLeaf(cmtCd, garCd);
    const cp = list.map((item: any) => ({
      id: item.leafCd,
      name: item.leafNm,
    }));
    setLeafList(cp);
  };

  const cancel = () => {
    setIsDisabled(true);
    reset();
  };

  return (
    <MyPageWrapper>
      <form
        className="flex w-96 flex-col gap-4 py-24"
        onSubmit={handleSubmit(data => {
          console.log(data);
          console.log("모달 오픈 이벤트");
          modal.onOpen();
        })}
      >
        <div className="flex flex-col gap-2">
          <InputLabel text="이름" htmlFor="name" isRequired={true} />
          <Input
            id="name"
            type="text"
            className="h-10"
            placeholder="이름을 입력하세요"
            {...register("name")}
            disabled={isDisabled}
            variant="default"
          />
        </div>
        <div className="flex flex-col gap-2">
          <InputLabel text="전화번호" htmlFor="phone" isRequired={true} />
          <Input
            id="phone"
            type="text"
            className="h-10"
            placeholder="전화번호를 입력하세요"
            {...register("phone")}
            disabled={isDisabled}
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
                  options={communityList}
                  disabled={isDisabled || communityList.length === 0}
                  onChangeOption={onChange}
                  selectedOption={value.name}
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
                  options={garretList}
                  disabled={isDisabled || garretList.length === 0}
                  onChangeOption={onChange}
                  selectedOption={value.name}
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
                  options={leafList}
                  disabled={isDisabled || leafList.length === 0}
                  onChangeOption={onChange}
                  selectedOption={value.name}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-12 text-center">
          {isDisabled ? (
            <Button
              variant="primary"
              type="button"
              onClick={() => setIsDisabled(false)}
            >
              회원정보 수정
            </Button>
          ) : (
            <div className="flex justify-center gap-12">
              <Button variant="outlined" type="button" onClick={cancel}>
                취소
              </Button>
              <Button variant="primary" type="submit">
                저장
              </Button>
            </div>
          )}
        </div>
      </form>

      {modal.isOpen && (
        <AlertModal onClose={modal.onClose}>
          회원정보가 수정되었습니다.
        </AlertModal>
      )}
    </MyPageWrapper>
  );
};

export default MyInfo;
