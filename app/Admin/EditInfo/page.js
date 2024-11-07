// import EditServiceForm from "@/components/admin/EditServiceForm";
import InfoForm from "@/components/admin/forms/InfoForm";
import { getAddresses, getPhones } from "@/lib/services";
// import ServiceForm from "@/components/admin/ServiceForm";

export default async function AppointmentFormPage({params}) {
  const phoneNumbers = await getPhones()
  const address = await getAddresses()

  return (
    <main>
      <InfoForm phoneNumbers={phoneNumbers} address={address}/>
    </main>
  );
}
