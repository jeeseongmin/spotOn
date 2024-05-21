import Layout from "@/components/Layout";
import Schedule from "@/components/Schedule";
import RightPanel from "@/pages/Home/components/RightPanel";

const Home = () => {
  return (
    <Layout>
      <div className="flex flex-row justify-between gap-6 pb-32">
        <Schedule />
        <RightPanel />
      </div>
    </Layout>
  );
};

export default Home;
