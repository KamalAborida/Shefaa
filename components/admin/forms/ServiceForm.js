"use client";

import { useFormState } from "react-dom";
import { addServiceAction } from "@/lib/addActions";
import { addService } from "@/lib/services";
import Link from "next/link";
import Button from "../../general/Button";
import InptDiv from "../../general/InptDiv";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ServiceForm({ params }) {
  const [state, formAction] = useFormState(addServiceAction, undefined);

  return (
    <form className="serviceForm" action={formAction}>
      <h1 className="appointmentForm__heading">Add Appointment</h1>
      {state &&
        state.errors &&
        state.errors.map((err) => {
          return (
            <div key={err}>
              <p className="error" key={err}>
                {err}
              </p>
              <br></br>
              <br></br>
            </div>
          );
        })}
      <InptDiv label="Service Name" inptType="text" name={"name"} />
      <InptDiv label="Price" inptType="number" name={"price"} />
      <InptDiv label="Duration" inptType="number" name={"duration"} />
      <InptDiv label="Add an image:" inptType="file" name={"img"} />
      <InptDiv label="Description" inptType="textarea" name={"description"} />
      <div className="dropMenu">
        <label>Type of service</label>
        <select defaultValue={"service"} name="type">
          <option value={"service"}>Service</option>
          <option value={"offer"}>Offer / Bundle</option>
        </select>
      </div>
      <Button btnText={"Confirm"} btnType={"confirm"} type="submit" />
      <Link href={"/Admin"}>
        <Button btnText={"Cancel"} btnType={"cancel"} />
      </Link>
    </form>
  );
}
