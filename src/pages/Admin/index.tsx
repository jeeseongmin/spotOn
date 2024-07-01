import Layout from "@/components/Layout";
import Tab from "@/components/Tab";
import UserInfo from "@/pages/Admin/components/UserPage";

const Admin = () => {
  return (
    <Layout>
      <Tab variant="enclosed">
        <Tab.Item label="회원정보 관리">
          <UserInfo />
        </Tab.Item>
        <Tab.Item label="교회일정 관리"></Tab.Item>
      </Tab>
    </Layout>
  );
};

export default Admin;
