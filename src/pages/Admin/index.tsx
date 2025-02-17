import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getUserInfo } from "@/apis/user";
import Layout from "@/components/Layout";
import AlertModal from "@/components/Modal/AlertModal";
import Tab from "@/components/Tab";
import { HOME_MAIN_URL } from "@/constants/routes";
import useModal from "@/hooks/useModal";
import ReservationInfo from "@/pages/Admin/components/ReservationInfo";
import UserInfo from "@/pages/Admin/components/UserInfo";
import Banner from "@/pages/Reservation/components/Banner";
import useLoginStore from "@/store/loginStore";
import useUserStore from "@/store/userStore";

const Admin = () => {
  const alertModal = useModal();
  const navigate = useNavigate();
  const user = useUserStore();
  const loginInfo = useLoginStore();
  const [alertMessage] = useState("관리자 외에 접근이 불가합니다.");
  const [banner] = useState({
    title: "관리자를 위한 가이드",
    content: [
      "총 4개의 권한이 존재합니다. (USER : 일반 유저, LEADER : 순장, MINISTRY : 교역자, ADMIN : 관리자)",
      "교역자 혹은 관리자가 회원가입 승인 시 해당 유저는 USER 권한을 가지게 됩니다.",
      "교역자와 관리자는 [통합관리] - [회원정보 관리]에서 일반 USER에게 LEADER 권한을 부여할 수 있습니다.",
      "예약 후 장소를 사용하지 않을 경우, 꼭 예약을 취소해야 합니다.",
      "장소 사용 후 깨끗하게 정리정돈 부탁드립니다.",
      "문의 : 목회지원실 (031-651-9680)",
    ],
  });

  useEffect(() => {
    checkRole();
  }, []);

  const checkRole = async () => {
    // 1차 확인
    if (user.roleId !== "ROLE_ADMIN") {
      alertModal.onOpen();

      navigate(HOME_MAIN_URL);
    } else {
      // 2차 확인
      const res = await getUserInfo(loginInfo.tokenId);
      console.log("res : ", res);
      if (res.roleId !== "ROLE_ADMIN") {
        alertModal.onOpen();

        navigate(HOME_MAIN_URL);
      }
    }
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4">
          <Banner title={banner.title} content={banner.content} />

          <Tab variant="enclosed">
            <Tab.Item label="회원정보 관리" className="relative">
              <UserInfo />
            </Tab.Item>
            <Tab.Item label="예약정보 관리" className="relative">
              <ReservationInfo />
            </Tab.Item>
            {/* <Tab.Item label="교회일정 관리"></Tab.Item> */}
          </Tab>
        </div>
      </Layout>
      {alertModal.isOpen && (
        <AlertModal onClose={alertModal.onClose}>{alertMessage}</AlertModal>
      )}
    </>
  );
};

export default Admin;
