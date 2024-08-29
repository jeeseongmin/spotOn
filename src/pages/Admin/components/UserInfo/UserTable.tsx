import { useEffect, useState } from "react";

import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { postUsers } from "@/apis/user";
import Table from "@/components/Table";
import { getTableBody, getTableHeader } from "@/utils/table";

const header = ["이름", "공동체", "다락방", "순", "연락처", "권한", "", ""];
const body = [
  [
    { data: "김온누리" },
    { data: "대학청년부" },
    { data: "대학부" },
    { data: "좋은순" },
    { data: "010-1234-5678" },
    { data: "일반" },
    { data: <FiEdit3 size={16} />, method: () => alert("수정") },
    {
      data: <RiDeleteBin6Line size={16} className="text-red" />,
      method: () => alert("삭제"),
    },
  ],
  [
    { data: "김온누리" },
    { data: "대학청년부" },
    { data: "대학부" },
    { data: "좋은순" },
    { data: "010-1234-5678" },
    { data: "일반" },
    { data: <FiEdit3 size={16} />, method: () => alert("수정") },
    {
      data: <RiDeleteBin6Line size={16} className="text-red" />,
      method: () => alert("삭제"),
    },
  ],
];
const tempHeader = getTableHeader(header);
const tempBody = getTableBody(header, body);

const UserTable = () => {
  const [users, setUsers] = useState(null);

  const getUsers = async () => {
    const data = await postUsers(0, 10, "");
    setUsers(data);
  };

  console.log(users);

  useEffect(() => {
    getUsers();
  }, []);

  return <Table header={tempHeader} body={tempBody} />;
};

export default UserTable;
