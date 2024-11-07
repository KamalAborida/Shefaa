"use client";

import { useFormState } from "react-dom";
import { addServiceAction } from "@/lib/actions";
import { deleteServiceAction } from "@/lib/deleteActions";
import { editServiceAction } from "@/lib/editActions";
import { addService, deleteService, editService } from "@/lib/services";
import Link from "next/link";
import Button from "../../general/Button";
import InptDiv from "../../general/InptDiv";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditServiceForm({ params, serviceData }) {
  const [state, formAction] = useFormState(editServiceAction, undefined);
  const router = useRouter();

  if (!serviceData) {
    router.push("/Admin");
  }

  const deleteHandler = async (e) => {
    e.preventDefault();
    await deleteServiceAction(serviceData.id, serviceData.img);
  };

  return (
    <form className="serviceForm" action={formAction}>
      <h1 className="appointmentForm__heading">Edit {serviceData.name}</h1>
      {state && state.errors &&
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
      <input hidden value={serviceData.id} readOnly name="id" />
      <InptDiv
        label="Service Name"
        inptType="text"
        name={"name"}
        value={serviceData.name}
      />
      <InptDiv
        label="Price"
        inptType="number"
        name={"price"}
        value={serviceData.price}
      />
      <InptDiv
        label="Duration"
        inptType="number"
        name={"duration"}
        value={serviceData.duration}
      />
      <InptDiv label="Add an image:" inptType="file" name={"img"} />
      <InptDiv
        label="Description"
        inptType="textarea"
        name={"description"}
        value={serviceData.description}
      />
      <div className="dropMenu">
        <label>Type of service</label>
        <select defaultValue={serviceData.type} name="type">
          <option value={"service"}>Service</option>
          <option value={"offer"}>Offer / Bundle</option>
        </select>
      </div>
      <Button btnText={"Confirm"} btnType={"confirm"} type="submit" />
      <Link href={"/Admin"}>
        <Button btnText={"Cancel"} btnType={"cancel"} />
      </Link>
      <Button btnText={"Delete"} btnType={"delete"} onClick={deleteHandler} />
    </form>
  );
}
