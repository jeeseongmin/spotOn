import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

import Button from "@/components/Button";
import AlertModal from "@/components/Modal/AlertModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import useModal from "@/hooks/useModal";
import MyPageWrapper from "@/pages/MyPage/components/MyPageLayout";

/** 임시로 빠르게 UI 구현을 하였습니다. Table 컴포넌트화에 대해서는 고민해봐야할 것 같습니다. */
const MyReservation = () => {
  const confirmModal = useModal();
  const alertModal = useModal();

  const onConfirm = () => {
    alertModal.onOpen();
    confirmModal.onClose();
  };

  return (
    <MyPageWrapper>
      <div className="flex h-96 w-full flex-col justify-between p-4">
        <table
          id="table"
          className="w-full border-collapse border border-gray-300"
        >
          <thead id="table-head" className="h-12 bg-gray-light">
            <tr>
              <th className="border border-gray-300">날짜</th>
              <th className="border border-gray-300">시간</th>
              <th className="border border-gray-300">장소</th>
              <th className="border border-gray-300">사용목적</th>
              <th className="border border-gray-300">상태</th>
              <th className="border border-gray-300"></th>
            </tr>
          </thead>
          <tbody id="table-body">
            <tr className="text-center text-sm">
              <td className="border border-gray-300">
                2024 / 02 / 23 ~ 2024 / 12 / 31 매주 수요일
              </td>
              <td className="border border-gray-300">21:00 ~ 23:00</td>
              <td className="border border-gray-300">
                [3층] 301호 (P.W / POEM)
              </td>
              <td className="border border-gray-300">대청 주일 예배팀 연습</td>
              <td className="border border-gray-300">승인대기</td>
              <td className="border border-gray-300">
                <Button
                  variant="underlined"
                  className="text-blue-800 underline-offset-4"
                  onClick={confirmModal.onOpen}
                >
                  취소
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-center gap-12">
          <div>
            <MdArrowBackIosNew />
          </div>
          <p className="text-lg">1</p>
          <div>
            <MdArrowForwardIos />
          </div>
        </div>
      </div>
      {confirmModal.isOpen && (
        <ConfirmModal
          title="예약 취소"
          onConfirm={onConfirm}
          onClose={confirmModal.onClose}
        >
          해당 예약을 취소하려면 확인 버튼을 클릭하세요
        </ConfirmModal>
      )}
      {alertModal.isOpen && (
        <AlertModal onClose={alertModal.onClose}>
          예약이 취소되었습니다.
        </AlertModal>
      )}
    </MyPageWrapper>
  );
};

export default MyReservation;
