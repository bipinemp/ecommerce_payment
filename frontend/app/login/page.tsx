import Login from "../components/Login";

const Page: React.FC = () => {
  return (
    <div className="max-w-[400px] mx-auto min-h-[200px] mt-20 flex flex-col gap-10 text-background">
      <Login />
    </div>
  );
};

export default Page;
