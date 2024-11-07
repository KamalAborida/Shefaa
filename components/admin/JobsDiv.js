"use client";

import Image from "next/image";
import icon from "../../assets/icon-edit.svg";
import Job from "./Job";
import UpComingJob from "./UpComingJob";

import { AnimatePresence, motion } from "framer-motion";

export default function JobsDiv({ isNew, jobs }) {
  return (
    <motion.div animate={{ opacity: [0, 1] }} className="jobsDiv">
      <h1 className="jobsDiv__title">
        {isNew ? "Pending Jobs" : "Upcoming Jobs"}
      </h1>
      <ul className="jobsDiv__list">
        {jobs &&
          isNew &&
          jobs.map((job) => {
            // console.log(job);
            return <Job jobData={job} key={job.id} />;
          })}
        {jobs &&
          !isNew &&
          jobs.map((job) => {
            // console.log(job);
            return <UpComingJob jobData={job} key={job.id} />;
          })}
      </ul>
    </motion.div>
  );
}
