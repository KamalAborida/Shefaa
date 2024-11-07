import AppointmentForm from "@/components/form/AppointmnetForm";
import { getService } from "@/lib/services";


export default async function AppointmentFormPage({params}) {
  const service = await getService(params.ServiceForm)

  return (
    <main>
      <AppointmentForm heading={service.name} price={service.price}/>
    </main>
  );
}
