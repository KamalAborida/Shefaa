"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import InptDiv from "@/components/general/InptDiv";
import Button from "@/components/general/Button";

export default function InfoForm({ phoneNumbers, address }) {
  // const [state, formAction] = useFormState(addServiceAction, undefined);
  const router = useRouter();
  // console.log(a);
  // const service = await getService(params.ServiceForm);

  // useEffect(() => {
  //   if (state) {
  //     if (state.success) {
  //       router.push("/Admin");
  //     }
  //   }
  // }, [router, state]);

  return (
    <form className="infoForm">
      <h1 className="appointmentForm__heading">Edit Shefaa Info</h1>
      <InptDiv
        label="Phone Number Title"
        inptType="text"
        name={"phone1_name"}
        value={phoneNumbers[0].name}
      />
      <InptDiv
        label="Phone Number"
        inptType="text"
        name={"phone1"}
        value={phoneNumbers[0].phone}
      />
      <hr></hr>
      <InptDiv
        label="Phone Number Title"
        inptType="text"
        name={"phone2_name"}
        value={phoneNumbers[1].name}
      />
      <InptDiv
        label="Phone Number"
        inptType="text"
        name={"phone2"}
        value={phoneNumbers[1].phone}
      />
      <hr></hr>
      <InptDiv label="Enter City" inptType="text" name={"city"} value={address[0].city}/>
      <InptDiv label="Enter The Address" inptType="text" name={"address"} value={address[0].address}/>
      <Button btnText={"Confirm"} btnType={"confirm"} type="submit" />
      <Link href={"/Admin"}>
        <Button btnText={"Cancel"} btnType={"cancel"} />
      </Link>
    </form>
  );
}
