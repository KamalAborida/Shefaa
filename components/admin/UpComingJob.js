"use client";
import Image from "next/image";
import icon from "../../assets/icon-edit.svg";
import { useState } from "react";
import Button from "../general/Button";
import {
  addUpcomingJob,
  deletePendingJob,
  deleteUpcomingJob,
} from "@/lib/services";

import { AnimatePresence, motion } from "framer-motion";

export default function UpComingJob({ jobData, isNew }) {
  // console.log(jobData);
  const [showJob, setShowJob] = useState(false);

  const btnHandler = async () => {
    const response = await deleteUpcomingJob(jobData.id);
    if (response) {
      setShowJob((prev) => !prev);
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
            <p className="jobsDiv__list__li__jobDetailsDiv__p">{jobData.age}</p>
            <p className="jobsDiv__list__li__jobDetailsDiv__p">
              {jobData.gender}
            </p>
            <p className="jobsDiv__list__li__jobDetailsDiv__p">
              {jobData.service}
            </p>
            <p className="jobsDiv__list__li__jobDetailsDiv__p">
              Date: <span className="imp-info">{jobData.date_scheduled}</span>
            </p>
            <p className="jobsDiv__list__li__jobDetailsDiv__p">
              <span className="imp-info">{jobData.address}</span>
            </p>
            <p className="jobsDiv__list__li__jobDetailsDiv__p imp-info">
              {jobData.phone}
            </p>
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
            <Button
              btnText={"Delete"}
              btnType={"delete"}
              onClick={btnHandler}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
