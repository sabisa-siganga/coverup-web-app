import Image from "next/image";
import "./home-style.scss";
import ContainerWrapper from "@/components/ContainerWrapper/ContainerWrapper";
import Button from "@/components/Button/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-hero-container">
        <div className="hero-container">
          <Image
            src="/assets/backgroundImg.png"
            width={500}
            height={400}
            alt="backgroundImg"
          />

          <div className="title-container">
            <h1>
              Cover<span>Up.</span>
            </h1>
          </div>
        </div>
        <ContainerWrapper className="welcome-back">
          <div className="title">Welcome!</div>
          <div className="buttons">
            <div>
              <Link href="/login" passHref>
                <Button color="secondary">Log In</Button>
              </Link>
              <Link href="/signup" passHref>
                <Button color="primary">Sign Up</Button>
              </Link>
            </div>
          </div>
        </ContainerWrapper>
      </div>
    </div>
  );
}
