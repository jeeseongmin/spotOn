import { useEffect, useState } from "react";

import { putUserState, updateUserInfo } from "@/apis/user";
import Button from "@/components/Button";
import AlertModal from "@/components/Modal/AlertModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import UserModal from "@/components/Modal/UserModal";
import Table from "@/components/Table";
import {
  APPROVE_USER_MESSAGE,
  CONFIRM_APPROVE_USER_MESSAGE,
  CONFIRM_REJECT_USER_MESSAGE,
  EMPTY_USER_LIST_MESSAGE,
  REJECT_USER_MESSAGE,
} from "@/constants/messages/admin";
import { REQUEST_ERROR_MESSAGE } from "@/constants/messages/common";
import useModal from "@/hooks/useModal";
import UserDetails from "@/pages/Admin/components/UserInfo/UserDetails";
import { CellInfo } from "@/types/table";
import { UserByState } from "@/types/user";
import { getTableBody, getTableHeader, getUserBodyData } from "@/utils/table";

const userTableHeader = [
  "이름",
  "공동체",
  // "다락방",
  // "순",
  // "연락처", // 상세에서 볼 수 있으므로 주석 처리
  "권한",
  "가입 여부",
  "가입일자",
  "", // 상세
  "", // 삭제
  "", // 권한 변경
];
const header = getTableHeader(userTableHeader);

interface UserTable {
  users: UserByState[];
  updateUsers: () => void;
}
const UserTable = ({ users, updateUsers }: UserTable) => {
  const [userBody, setUserBody] = useState<CellInfo[][]>([]);
  const [selectedUser, setSelectedUser] = useState<UserByState | null>(null);

  const [alertMessage, setAlertMessage] = useState("");
  const alertModal = useModal();
  const userModal = useModal();
  const confirmApproveModal = useModal();
  const confirmRejectModal = useModal();
  const confirmUpdateLeaderModal = useModal();

  const changeUserState = async (userStateCode: string, userId: string) => {
    await putUserState({ userStateCode, userId });
    updateUsers();
  };

  // 2025.05.27 권한변경 추가
  const [selectedRole, setSelectedRole] = useState("LEADER");

  const roleOptions = [
    { roleId: "ADMIN", roleName: "시스템 관리자" },
    { roleId: "LEADER", roleName: "리더십멤버" },
    { roleId: "MINISTRY", roleName: "목회 지원" },
    { roleId: "USER", roleName: "일반 사용자" },
  ];
  // 2025.05.27 권한변경 추가

  // 일반 유저의 권한을 리더로 업데이트하는 함수
  const updateLeader = async (tokenId: string, users: UserByState,role: string) => {
    await updateUserInfo(tokenId, {
      ...users,
      roleId: role,
      provider: "kakao",
      token: "",
    });
  };

  const handleConfirmApprove = () => {
    if (!selectedUser) {
      setAlertMessage(REQUEST_ERROR_MESSAGE);
    } else {
      changeUserState("01", selectedUser?.userId);
      setAlertMessage(APPROVE_USER_MESSAGE);
    }

    alertModal.onOpen();
    confirmApproveModal.onClose();
  };

  const handleConfirmReject = () => {
    if (!selectedUser) {
      setAlertMessage(REQUEST_ERROR_MESSAGE);
    } else {
      changeUserState("00", selectedUser?.userId);
      setAlertMessage(REJECT_USER_MESSAGE);
    }

    alertModal.onOpen();
    confirmRejectModal.onClose();
  };

  const handleConfirmUpdateLeader = async (role: string) => {
    if (!selectedUser) {
      setAlertMessage("요청을 처리할 수 없습니다. 다시 시도해 주세요.");
    } else {
      updateLeader(selectedUser?.userId, selectedUser, role);
      setAlertMessage("해당 유저의 권한 변경이 승인되었습니다.");
    }

    alertModal.onOpen();
    confirmUpdateLeaderModal.onClose();
  };

  useEffect(() => {
    const reservationTableBody = users.map(user => {
      const showUserModal = () => {
        setSelectedUser(user);
        userModal.onOpen();
      };

      const approveUser = () => {
        setSelectedUser(user);
        confirmApproveModal.onOpen();
      };

      const rejectUser = () => {
        setSelectedUser(user);
        confirmRejectModal.onOpen();
      };

      // 일반 유저를 리더 권한으로 업데이트하는 함수
      const updateLeaderMethod = () => {
        setSelectedUser(user);
        confirmUpdateLeaderModal.onOpen();
      };

      return getUserBodyData(
        user,
        showUserModal,
        approveUser,
        rejectUser,
        updateLeaderMethod,
      );
    });

    setUserBody(getTableBody(userTableHeader, reservationTableBody));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  if (users.length === 0 && !alertModal.isOpen) {
    return (
      <div className="flex h-20 items-center justify-center">
        <div>{EMPTY_USER_LIST_MESSAGE}</div>
      </div>
    );
  }

  return (
    <>
      <Table header={header} body={userBody} />
      {userModal.isOpen && (
        <UserModal onClose={userModal.onClose}>
          <UserModal.Header>회원 상세 정보</UserModal.Header>
          <UserModal.Content>
            {selectedUser && <UserDetails user={selectedUser} />}
          </UserModal.Content>
          <UserModal.Footer>
            <Button variant="primary" onClick={userModal.onClose}>
              확인
            </Button>
          </UserModal.Footer>
        </UserModal>
      )}

      {confirmApproveModal.isOpen && (
        <ConfirmModal
          title="회원 가입 승인"
          onConfirm={handleConfirmApprove}
          onClose={confirmApproveModal.onClose}
        >
          {CONFIRM_APPROVE_USER_MESSAGE}
        </ConfirmModal>
      )}
      {confirmRejectModal.isOpen && (
        <ConfirmModal
          title="회원 가입 반려"
          onConfirm={handleConfirmReject}
          onClose={confirmRejectModal.onClose}
        >
          {CONFIRM_REJECT_USER_MESSAGE}
        </ConfirmModal>
      )}
      {confirmUpdateLeaderModal.isOpen && (
      <ConfirmModal
        title="권한 부여"
        onConfirm={() => handleConfirmUpdateLeader(selectedRole)}
        onClose={confirmUpdateLeaderModal.onClose}
      >
        <div className="space-y-2">
          <p>권한을 선택하고 확인 버튼을 클릭하세요.</p>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            {roleOptions.map((role) => (
              <option key={role.roleId} value={role.roleId}>
                {role.roleName}
              </option>
            ))}
          </select>
        </div>
      </ConfirmModal>
      )}
      {alertModal.isOpen && (
        <AlertModal onClose={alertModal.onClose}>{alertMessage}</AlertModal>
      )}
    </>
  );
};

export default UserTable;
