import Image from "next/image";
import "./home-style.scss";
import ContainerWrapper from "@/components/ContainerWrapper/ContainerWrapper";
import Link from "next/link";
import BlueCircles from "@/components/BlueCircles/BlueCircles";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-hero-container">
        <BlueCircles className="admin-circle1" />
        <BlueCircles className="admin-circle2" />
        <BlueCircles className="admin-circle3" />
        <div className="title-container">
          <Image
            src="/admin-portal/blue-white-logo.svg"
            width={200}
            height={50}
            alt="logo"
          />
        </div>
        <div className="hero-container">
          <Image
            src="/admin-portal/admin-bg-img.svg"
            width={500}
            height={400}
            alt="backgroundImg"
          />
        </div>

        <ContainerWrapper className="welcome-back">
          <div className="title">Admin Portal</div>
          <div className="buttons">
            <div>
              {/* <Link href="/admin/signup" passHref>
                Sign Up
              </Link> */}
              <Link href="/admin/login" passHref>
                Login
              </Link>
            </div>
          </div>
        </ContainerWrapper>
      </div>
    </div>
  );
}
