"use client";
import Image from "next/image";
import icon from "../../assets/icon-edit.svg";
import { useEffect, useState } from "react";
import Button from "../general/Button";
import { addUpcomingJob, deletePendingJob } from "@/lib/services";

import { AnimatePresence, motion } from "framer-motion";

export default function Job({ jobData }) {
  // console.log(jobData);
  const [showJob, setShowJob] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isError, setIsError] = useState(false);
  const currentDate = new Date();
  const [date, setDate] = useState(undefined);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const btnsHandler = async (btnUsage, extras) => {
    if (btnUsage === "delete") {
      deletePendingJob(jobData.id);
    } else if (btnUsage === "confirm") {
      if (!date) {
        // console.log("No date");
        setIsError(true);
        return;
      }
      const result = await addUpcomingJob({
        name: jobData.name,
        age: jobData.age,
        phone: jobData.phone,
        email: jobData.email,
        address: jobData.address,
        gender: jobData.gender,
        past_diseases: jobData.past_diseases,
        notes: jobData.notes,
        service: jobData.service,
        date_appointed:
          currentDate.getDate() +
          "-" +
          currentDate.getDay() +
          "-" +
          currentDate.getFullYear(),
        date_scheduled: date,
      });
      // console.log(result);
      if (result.success) {
        await deletePendingJob(jobData.id);
      }
    } else if (btnUsage === "call") {
      // console.log(jobData.phone);
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(extras)
          .then(() => {
            console.log("Text copied to clipboard");
            setIsCopied(true);
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
            setIsCopied(false);
          });
      }
    }
  };

  return (
    <motion.li
      className={`jobsDiv__list__li jobsDiv__list-${
        showJob ? "showDetails" : ""
      }`}
      layout
    >
      <div className="jobsDiv__list__li__jobInfoDiv">
        {jobData.name}{" "}
        <Image
          onClick={() => {
            setShowJob((prev) => !prev);
          }}
          src={icon}
          alt="icon"
        />
      </div>
      <AnimatePresence>
        {showJob && (
          <motion.div
            animate={{ opacity: [0, 1], height: "auto" }}
            exit={{ opacity: 0, height: ["auto", 0] }}
            transition={{ type: "keyframes" }}
            className="jobsDiv__list__li__jobDetailsDiv"
          >
            <p>{jobData.age}</p>
            <p>{jobData.gender}</p>
            <p>Address: {jobData.address}</p>
            <p>{jobData.phone}</p>
            <hr></hr>
            <p>{jobData.service}</p>
            <hr></hr>
            <div className="jobsDiv__list__li__jobDetailsDiv__disease">
              <h4 className="jobsDiv__list__li__jobDetailsDiv__disease__title">
                Past Dieseases
              </h4>
              <p className="jobsDiv__list__li__jobDetailsDiv__disease__p">
                {jobData.past_diseases}
              </p>
            </div>
            <hr></hr>
            <div className="jobsDiv__list__li__jobDetailsDiv__notes">
              <h4 className="jobsDiv__list__li__jobDetailsDiv__notes__title">
                Notes
              </h4>
              <p className="jobsDiv__list__li__jobDetailsDiv__notes__p">
                {jobData.notes}
              </p>
            </div>
            <div className="jobsDiv__list__li__jobDetailsDiv__btnsDiv">
              <Button
                btnText={"Confirm"}
                btnType={"confirm"}
                onClick={() => setIsConfirmed(true)}
                disabled={isConfirmed}
              />
              <Button
                btnText={"Delete"}
                btnType={"delete"}
                onClick={() => btnsHandler("delete")}
              />
              <Button
                btnText={"Call"}
                btnType={"call"}
                onClick={() => btnsHandler("call", jobData.phone)}
              />
            </div>
            <AnimatePresence>
              {isCopied && (
                <motion.p
                  // layout
                  animate={{ opacity: [0, 1] }}
                  exit={{ opacity: [1, 0] }}
                  className="jobsDiv__list__li__jobDetailsDiv__phoneCopied"
                >
                  Phone Number Copied!
                </motion.p>
              )}
            </AnimatePresence>
            {isConfirmed && (
              <div className="jobsDiv__list__li__jobDetailsDiv__confirmationDivDiv">
                <input
                  className="inptDiv__inpt"
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                />
                <Button
                  btnText={"Confirm Appoitnment"}
                  btnType={"confirm"}
                  onClick={() => btnsHandler("confirm")}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
