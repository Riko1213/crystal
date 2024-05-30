import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import getCurrentUser from "@/actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
import Image from "next/image";
const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="relative sticky top-0 w-full z-30 shadow-sm">
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="/navbar.png"
          alt="navbarbg"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="py-4 border-b-[1px] bg-slate-200 bg-opacity-70">
        <Container>
          <div
            className="
          flex
          items-center
          justify-between
          gap-3
          md:gap-0
          "
          >
            <Link
              href="/"
              className={`${redressed.className} font-bold text-2xl`}
            >
              CRYSTAL Онлайн шоп
            </Link>
            <div className="hidden md:block"><SearchBar/></div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
      <Categories/>
    </div>
  );
};
export default NavBar;
