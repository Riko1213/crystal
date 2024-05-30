import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="/navbar.png"
          alt="navbarbg"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16 bg-opacity-70">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Ангилалууд</h3>
            <Link href="#">Гэр ахуй</Link>
            <Link href="#">Хүүхдийн</Link>
            <Link href="#">Машины хэрэгсэл</Link>
            <Link href="#">Хувцас</Link>
            <Link href="#">Эрүүл мэнд</Link>
            <Link href="#">Спорт</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Бидэнтэй холбогдох</h3>
            <Link href="#">Бидэнтэй холбогдох: 89101054, 99415153</Link>
            <Link href="#">Буцаалт: Үйлчлүүлэгч та бидэнтэй холбогдон захиалгаа буцаах, цуцлах боломжтой.Буцаалтын үед бараа хүргэгдсэн тухайн өдөрт бидэнтэй холбогдож мэдээллэх шаардлагатай.Хэрэв хэрэглэгч бараагаа задлаад, эвдрэл гэмтэл гаргасан тохиолдолд буцаалт хүчингүй.  </Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <p>&copy; {new Date().getFullYear()} CRYSTAL онлайн шоп</p>
            <h3 className="text-base font-bold mb-2">Бидний тухай</h3>
            <p className="mb-2">
              Бид хэрэглэгчдийнхээ хүсэл, сонирхол, хэрэгцээнд бүрэн нийцсэн бүтээгдэхүүн үйлчилгээг шуурхай хүргэнэ
              хэмээх эрхэм зорилготойгоор үйл ажиллагаагаа явуулдаг.
              Өмнөө тавьсан эрхэм зорилгын хүрээнд нэн тэргүүнд “Хэрэглэгч үргэлж сэтгэл хангалуун үлдэх ёстой” зарчмыг баримталдаг.
              Ширхэг барааг ч Улаанбаатар хот доторх хүргэж өгөх бөгөөд хэрэглэгч та захиалгаа өгсөнөөр дараах өдрүүдээс хүссэн өдөрт нь хүргэж үйлчилнэ. 
              Орон нутгийн захиалгыг найдвартай хуваарьт шуудангаар хүргэдэг.
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Биднийг дагаарай</h3>
            <div className="flex gap-2">
            <Link href="https://www.facebook.com/Crystalonlinemn">
                <MdFacebook size={24} />
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=100068554759141">
                <MdFacebook size={24} />
              </Link>
              <Link href="https://www.facebook.com/M.and.M.online.shop.mn">
                <MdFacebook size={24} />
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=100077933563661">
                <MdFacebook size={24} />
              </Link>
              <Link href="https://www.facebook.com/AriunOnlineClothingShop">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
