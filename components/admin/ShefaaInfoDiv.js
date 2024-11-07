"use client";

// import Image from "next/image";
import { useFormState } from "react-dom";
// import editIcon from "../../assets/icon-edit.svg";
import { useEffect, useState } from "react";
import { editAddressAction, editPhoneNumberAction } from "@/lib/editActions";
import InptDiv from "../general/InptDiv";
import Button from "../general/Button";
import { AnimatePresence, motion } from "framer-motion";

export default function InfoDiv({ isNew, phones, addresses }) {
  const [isEditPhone1, setIsEditPhone1] = useState(false);
  const [isEditPhone2, setIsEditPhone2] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);

  // console.log(phones);

  const [statePhone, actionPhone] = useFormState(editPhoneNumberAction, {});
  const [stateAddress, actionAddress] = useFormState(editAddressAction, {});

  useEffect(() => {
    if (stateAddress) {
      if (stateAddress.success) {
        setIsEditAddress(false);
      }
    }

    if (statePhone) {
      if (statePhone.success) {
        setIsEditPhone1(false);
        setIsEditPhone2(false);
      }
    }
  }, [stateAddress, statePhone]);

  const editPhoneHandler = async (phoneId) => {
    if (phoneId === 0) {
      setIsEditPhone1((prev) => !prev);
    } else if (phoneId === 1) {
      setIsEditPhone2((prev) => !prev);
    }
  };

  const editAddressHandler = () => {
    setIsEditAddress((prev) => !prev);
  };

  return (
    <motion.section layout className="infoDiv">
      <h1 className="infoDiv__title">Shefaa Info</h1>
      {/* <Image src={editIcon} alt="edit" onClick={() => editPhoneHandler(0)} /> */}
      <div className="infoDiv__info" onClick={() => editPhoneHandler(0)}>
        <p>{phones[0].phone}</p>
      </div>
      <AnimatePresence>
        {isEditPhone1 && (
          <motion.form exit={{opacity: [1, 0]}} className="infoDiv__form" action={actionPhone}>
            <InptDiv placeholder="Name" name="name" />
            <InptDiv
              placeholder={
                statePhone.errors && statePhone.errors.length > 0
                  ? "Please provide a phone number"
                  : "Phone number"
              }
              name="phone"
              isError={
                statePhone.errors && statePhone.errors.length > 0 ? true : false
              }
            />
            <input hidden readOnly name="id" value={1} />
            <Button type={"submit"} btnType={"confirm"} btnText={"Add +"} />
          </motion.form>
        )}
      </AnimatePresence>
      <div className="infoDiv__info" onClick={() => editPhoneHandler(1)}>
        <p>{phones[1].phone}</p>
      </div>
      <AnimatePresence>
        {isEditPhone2 && (
          <motion.form exit={{opacity: [1, 0]}} className="infoDiv__form" action={actionPhone}>
            <InptDiv placeholder="Name" name="name" />
            <InptDiv
              placeholder={
                statePhone.errors && statePhone.errors.length > 0
                  ? "Please provide a phone number"
                  : "Phone number"
              }
              name="phone"
              isError={
                statePhone.errors && statePhone.errors.length > 0 ? true : false
              }
            />
            <input hidden readOnly name="id" value={2} />
            <Button type={"submit"} btnType={"confirm"} btnText={"Add +"} />
          </motion.form>
        )}
      </AnimatePresence>
      <div className="infoDiv__info" onClick={editAddressHandler}>
        <p>
          {addresses[0].city} - {addresses[0].address}
        </p>
      </div>
      <AnimatePresence>
        {isEditAddress && (
          <motion.form exit={{opacity: [1, 0]}} className="infoDiv__form" action={actionAddress}>
            <InptDiv
              placeholder={
                stateAddress.errors && stateAddress.errors.length > 0
                  ? "Please provide a city"
                  : "City"
              }
              name="city"
              isError={
                stateAddress.errors && stateAddress.errors.length > 0
                  ? true
                  : false
              }
            />
            <InptDiv placeholder="Detailed Address" name="address" />
            <input hidden readOnly name="id" value={1} />
            <Button type={"submit"} btnType={"confirm"} btnText={"Add +"} />
          </motion.form>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
