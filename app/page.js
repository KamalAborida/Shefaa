import CardsDiv from "@/components/cardsDiv/CardsDiv";
import Footer from "@/components/footer/Footer";
import Loading from "@/components/form/Loading";
import Video from "@/components/general/Video";
import NavBar from "@/components/nav/NavBar";
import SuccessModal from "@/components/successModal/SuccessModal";
import {
  getPendingJobs,
  getPhones,
  getServices,
  getSocialMedia,
} from "@/lib/services";
// import { useEffect } from "react";
// import img from '../assets/IMG_4850-1-1250x938.jpeg'
// import vid from "../public/vid.mp4";

export default async function Home() {
  const services = await getServices();
  const phoneNumbers = await getPhones();
  const socialMediaList = await getSocialMedia();

  return (
    <main>
      <Loading />
      <SuccessModal />
      <NavBar />
      <Video />
      <CardsDiv sectionTitle="" data={services} />
      <Footer phoneNumbers={phoneNumbers} socialMediaList={socialMediaList} />
    </main>
  );
}
