import { useState } from "react";

import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

import Button from "@/components/Button";
import AlertModal from "@/components/Modal/AlertModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import Table from "@/components/Table";
import useModal from "@/hooks/useModal";
import MyPageWrapper from "@/pages/MyPage/components/MyPageLayout";
import { getTableBody, getTableHeader } from "@/utils/table";

const MyReservation = () => {
  const [headerList, setHeaderList] = useState(
    getTableHeader(["날짜", "시간", "장소", "사용목적", "상태", ""]),
  );
  const [bodyList, setBodyList] = useState(
    getTableBody([
      [
        { name: "날짜", data: `2024 / 02 / 23 ~ 2024 / 12 / 31 \n매주 수요일` },
        { name: "시간", data: "21:00 ~ 23:00" },
        { name: "장소", data: "[3층] 301호 (P.W / POEM)" },
        { name: "사용목적", data: "대청 주일 예배팀 연습" },
        { name: "상태", data: "승인 대기" },
        { name: "", data: "취소", method: () => confirmModal.onOpen() },
      ],
    ]),
  );

  const confirmModal = useModal();
  const alertModal = useModal();

  const onConfirm = () => {
    alertModal.onOpen();
    confirmModal.onClose();
  };

  return (
    <MyPageWrapper>
      <div className="flex h-96 w-full flex-col justify-between p-4">
        <Table header={headerList} body={bodyList} />
        <div className="flex items-center justify-center gap-4">
          <Button variant="icon" className="text-gray-dark">
            <MdArrowBackIosNew size={14} />
          </Button>
          <p className="text-base font-semibold">1</p>
          <Button variant="icon" className="text-gray-dark">
            <MdArrowForwardIos size={14} />
          </Button>
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
