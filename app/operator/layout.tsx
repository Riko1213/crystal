import OperatorNav from "../components/operator/OperatorNav";

export const metadata = {
  title: "E~Shop Оператор",
  description: "E~Shop Оператор",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <OperatorNav />
      {children}
    </div>
  );
};

export default AdminLayout;
