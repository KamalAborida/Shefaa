import Logo from "@/assets/Logo";
import twitter from "../../assets/icon-twitter.svg";
import Image from "next/image";
import Link from "next/link";
import { getSocialMediaIcon } from "@/utilities/utility";

export default function Footer({ phoneNumbers, socialMediaList }) {
  // console.log(phoneNumbers, socialMediaList);
  return (
    <footer className="footer">
      <div className="footer__logo">
        <Logo color={"white"} />
      </div>
      <p className="footer__about">
        At Shefaa Clinic, we are dedicated to providing compassionate and
        comprehensive healthcare services to our community. With a focus on
        patient-centered care, we strive to create a warm and welcoming
        environment where individuals can feel heard, respected, and supported
        on their health journey.
      </p>
      <div className="footer__phoneDiv">
        <h4 className="footer__phoneDiv__heading">Phone Numbers</h4>
        <div className="footer__phoneDiv__phoneNumbers">
          {phoneNumbers.map((phone) => {
            return <p key={phone.id}>{phone.phone}</p>;
          })}
        </div>
      </div>
      <div className="footer__socialMedia">
        <div>
          {socialMediaList.map((socialMedia) => {
            return (
              <Link key={socialMedia.id} href={""}>
                <Image src={getSocialMediaIcon(socialMedia.name)} alt={socialMedia.name} />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
