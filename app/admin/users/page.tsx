import Container from "@/app/components/Container";
import ManageUsersClient from "./ManageUsersClient";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getUsers from "@/actions/getUsers";

const ManageOrders = async () => {
  const users = await getUsers();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />;
  }

  return (
    <div className="pt-8">
      <Container>
        <ManageUsersClient users={users} />
      </Container>
    </div>
  );
};

export default ManageOrders;
