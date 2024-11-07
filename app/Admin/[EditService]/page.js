import EditServiceForm from "@/components/admin/forms/EditServiceForm";
import ServiceForm from "@/components/admin/forms/ServiceForm";
// import AppointmentForm from "@/components/form/AppointmnetForm";
import { getService } from "@/lib/services";


export default async function AppointmentFormPage({params}) {
  // console.log(params.EditService);
  const service = await getService(params.EditService)

  return (
    <main>
      <EditServiceForm serviceData={service}/>
    </main>
  );
}
