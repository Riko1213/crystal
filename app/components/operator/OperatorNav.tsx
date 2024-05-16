"use client";

import Link from "next/link";
import AdminNavItem from "./OperatorNavItem";
import {
  MdDashboard,
  MdLibraryAdd,
  MdDns,

} from "react-icons/md";
import { usePathname } from "next/navigation";
import Container from "../Container";

const AdminNav = () => {
  const pathname = usePathname();

  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
        <Link href="/operator">
            <AdminNavItem
              label="Үзүүлэлт"
              icon={MdDashboard}
              selected={pathname === "/operator"}
            />
          </Link>
          <Link href="/operator/add-products">
            <AdminNavItem
              label="Бараа нэмэх"
              icon={MdLibraryAdd}
              selected={pathname === "/operator/add-products"}
            />
          </Link>
          <Link href="/operator/manage-products">
            <AdminNavItem
              label="Бараанууд"
              icon={MdDns}
              selected={pathname === "/operator/manage-products"}
            />
          </Link>
          <Link href="/operator/myproduct">
            <AdminNavItem
              label="Миний бараанууд"
              icon={MdDns}
              selected={pathname === "/operator/myproduct"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
