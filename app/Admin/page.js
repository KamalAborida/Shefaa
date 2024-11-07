import Logo from "@/assets/Logo";
import AdminCardsDiv from "@/components/admin/AdminCardsDiv";
import JobsDiv from "@/components/admin/JobsDiv";
import InfoDiv from "@/components/admin/ShefaaInfoDiv";
import SocialMediaDiv from "@/components/admin/SocialMediaDiv";
import {
  getPendingJobs,
  getServices,
  getSocialMedia,
  getUpcomingJobs,
} from "@/lib/services";
import { getAddresses, getPhones } from "@/lib/services";
import Link from "next/link";

export default async function AdminPage() {
  const data = await getServices();
  const phones = await getPhones();
  const addresses = await getAddresses();
  const socialMedia = await getSocialMedia();
  const pendingJobs = await getPendingJobs();
  const upcomingJobs = await getUpcomingJobs();

  return (
    <main className="adminPage">
      <div className="adminPage__settingsDiv">
        {/* <Link href={"/AdminSettings"}>Admin</Link> */}
      </div>
      <div className="adminPage__logoDiv">
        <Logo color="#596EA6" />
      </div>
      <JobsDiv isNew={true} jobs={pendingJobs}/>
      <hr></hr>
      <JobsDiv isNew={false} jobs={upcomingJobs}/>
      <AdminCardsDiv sectionTitle={"Services"} data={data} />
      <hr></hr>
      <InfoDiv phones={phones} addresses={addresses} />
      <SocialMediaDiv data={socialMedia} />
    </main>
  );
}
