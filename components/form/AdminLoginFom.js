"use client";

import Button from "@/components/general/Button";
import InptDiv from "@/components/general/InptDiv";
import { authenticateUserAction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { authenticateUser } from "@/lib/services";
import { useFormState } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function AdminLoginForm() {
  // console.log("Hi");
  const [state, formAction] = useFormState(authenticateUserAction, {});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  // console.log(state);
  useEffect(() => {
    if (isFormSubmitted) {
      // console.log(state);
      // console.log("state " + Object.keys(state) + Object.keys(state).length);

      if (Object.keys(state).length !== 0) {
        if (Object.keys(state) !== 0 && !state.authenticated) {
          setIsError(true);
          setIsFormSubmitted(false);
        } else {
          setIsError(false);
          router.push("/Admin");
        }
      }
    }
  }, [isFormSubmitted, router, state]);

  const btnHandler = () => {
    setIsFormSubmitted(true);
  };

  return (
    <form className="adminLoginForm" action={formAction}>
      <AnimatePresence>
        {isError && (
          <motion.p
            animate={{ opacity: [0, 1] }}
            exit={{ opacity: [1, 0] }}
            className="error"
          >
            Wrong input
          </motion.p>
        )}
      </AnimatePresence>
      <InptDiv label="Username" inptType="text" />
      <InptDiv label="Password" inptType="password" />
      <Button
        btnText={isFormSubmitted ? "Loading..." : "Login"}
        btnType={"confirm"}
        type={"submit"}
        onClick={btnHandler}
      />
    </form>
  );
}
