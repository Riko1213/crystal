import DeliverNav from "../components/deliver/DeliverNav";

export const metadata = {
  title: "E~Shop Хүргэгч",
  description: "E~Shop Хүргэлтийн ажилтан",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DeliverNav />
      {children}
    </div>
  );
};

export default AdminLayout;
