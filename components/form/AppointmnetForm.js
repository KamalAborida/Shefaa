"use client";

import Link from "next/link";
import Button from "../general/Button";
import InptDiv from "../general/InptDiv";
import RadioButtonDiv from "./RadioButtonsDiv";
import { useFormState } from "react-dom";
import { addPendingJobAction } from "@/lib/addActions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useFormStatus } from 'react-dom';
import Loading from "./Loading";

import { AnimatePresence, motion } from "framer-motion";

export default function AppointmentForm({ heading, price, serviceID }) {
  const [state, formAction] = useFormState(addPendingJobAction, {});
  // const [errorState, setErrorState] = useState();
  // const router = useRouter();
  const currentDate = new Date().toISOString().split("T")[0];

  // console.log(state
  // );

  // useEffect(() => {
  //   if (state) {
  //     if (state.success) {
  //       router.push("/?successModal=true");
  //     }
  //   }
  // }, [router, state]);

  return (
    <form className="appointmentForm" action={formAction}>
      <motion.h1
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 1 }}
        className="appointmentForm__heading"
      >
        {heading} Appointment
      </motion.h1>
      <motion.p
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 1 }}
        className="appointmentForm__hint"
      >
        Please fill this form in order to process your appointment, After
        filling it you will be called via phone number to confirm your
        appointment location and date
      </motion.p>
      <AnimatePresence>
        {state.errors && state.errors.includes("Gender") && (
          <motion.p animate={{ opacity: [0, 1], y: [50, 0] }} className="error">
            Please provide a gender
          </motion.p>
        )}
      </AnimatePresence>
      <InptDiv
        label="Name"
        inptType="text"
        isError={state.errors && state.errors.includes("Name") ? true : false}
      />
      <InptDiv
        label="Age"
        inptType="number"
        isError={state.errors && state.errors.includes("Age") ? true : false}
      />
      <InptDiv
        label="Phone"
        inptType="number"
        isError={state.errors && state.errors.includes("Phone") ? true : false}
      />
      <InptDiv
        label="Email"
        inptType="email"
        isError={state.errors && state.errors.includes("Email") ? true : false}
      />
      <InptDiv
        label="Address"
        inptType="text"
        isError={
          state.errors && state.errors.includes("Address") ? true : false
        }
      />
      <input hidden readOnly value={heading} name="Service" />
      <input hidden readOnly value={`${currentDate}`} name="Date" />
      <RadioButtonDiv />
      <InptDiv
        name={"diseases"}
        label="Do you have any past diseases"
        inptType="textarea"
        isError={
          state.errors && state.errors.includes("diseases") ? true : false
        }
      />
      <InptDiv
        label="Notes"
        inptType="textarea"
        isError={state.errors && state.errors.includes("Notes") ? true : false}
      />
      <h3 className="appointmentForm__price">Price: {price} L.E</h3>
      <Button
        btnText={"Confirm"}
        btnType={"confirm"}
        type="submit"
        // onClick={btnHandler}
      />
      <Link href={"/"}>
        <Button
          btnText={"Cancel"}
          btnType={"cancel"}
          disabled={state.success}
        />
      </Link>
      <Loading />
    </form>
  );
}
