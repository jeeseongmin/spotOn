import { VscRefresh } from "react-icons/vsc";

import Button from "@/components/Button";
import Input from "@/components/Input/Input";
import Tab from "@/components/Tab";
import UserTable from "@/pages/Admin/components/UserInfo/UserTable";

const UserInfo = () => {
  return (
    <div>
      {/* header */}
      <div className="relative flex p-4">
        <Tab variant="solid" className="mt-4 flex" querystringKey="subTab">
          <Tab.Item label="승인 요청" className="px-2 text-small">
            <UserTable />
          </Tab.Item>
          <Tab.Divider />
          <Tab.Item label="전체"></Tab.Item>
          <Tab.Item label="일반"></Tab.Item>
          <Tab.Item label="관리자"></Tab.Item>
        </Tab>
        <div className="absolute right-4 flex w-fit items-center gap-8">
          <div className="w-fit min-w-[340px] max-w-96">
            <Input
              placeholder="이름/공동체/순/연락처/권한 으로 검색하세요"
              className="w-full text-base "
              isSearch={true}
            />
          </div>
          <div className="">
            <Button
              variant="custom"
              className="font- flex h-10 w-16 flex-row items-center gap-1 font-normal text-black"
            >
              <VscRefresh className="text-primary" />
              초기화
            </Button>
          </div>
        </div>
      </div>
      {/* body */}
      <div></div>
    </div>
  );
};

export default UserInfo;