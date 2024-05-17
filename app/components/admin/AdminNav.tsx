"use client";

import Link from "next/link";
import AdminNavItem from "./AdminNavItem";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import { usePathname } from "next/navigation";
import Container from "../Container";

const AdminNav = () => {
  const pathname = usePathname();

  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href="/admin">
            <AdminNavItem
              label="Үзүүлэлт"
              icon={MdDashboard}
              selected={pathname === "/admin"}
            />
          </Link>
          <Link href="/admin/add-products">
            <AdminNavItem
              label="Бараа нэмэх"
              icon={MdLibraryAdd}
              selected={pathname === "/admin/add-products"}
            />
          </Link>
          <Link href="/admin/manage-products">
            <AdminNavItem
              label="Бараанууд"
              icon={MdDns}
              selected={pathname === "/admin/manage-products"}
            />
          </Link>
          <Link href="/admin/manage-orders">
            <AdminNavItem
              label="Захиалгууд"
              icon={MdFormatListBulleted}
              selected={pathname === "/admin/manage-orders"}
            />
          </Link>
          <Link href="/admin/myorders">
            <AdminNavItem
              label="Хүргэгч нарын захиалга"
              icon={MdFormatListBulleted}
              selected={pathname === "/admin/myorders"}
            />
          </Link>
          <Link href="/admin/myproduct">
            <AdminNavItem
              label="Операторын бараа"
              icon={MdFormatListBulleted}
              selected={pathname === "/admin/myproduct"}
            />
          </Link>
          <Link href="/admin/products-in-orders">
            <AdminNavItem
              label="Хүлээгдэж буй бараанууд"
              icon={MdFormatListBulleted}
              selected={pathname === "/admin/products-in-orders"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
