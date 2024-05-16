"use client";

import Link from "next/link";
import AdminNavItem from "./DeliverNavItem";
import {
  MdDashboard,
  MdFormatListBulleted,
} from "react-icons/md";
import { usePathname } from "next/navigation";
import Container from "../Container";

const AdminNav = () => {
  const pathname = usePathname();

  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
        <Link href="/deliver">
            <AdminNavItem
              label="Үзүүлэлт"
              icon={MdDashboard}
              selected={pathname === "/deliver"}
            />
          </Link>
          <Link href="/deliver/manage-orders">
            <AdminNavItem
              label="Захиалгууд"
              icon={MdFormatListBulleted}
              selected={pathname === "/deliver/manage-orders"}
            />
          </Link>
          <Link href="/deliver/myorders">
            <AdminNavItem
              label="Миний авсан"
              icon={MdFormatListBulleted}
              selected={pathname === "/deliver/myorders"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
