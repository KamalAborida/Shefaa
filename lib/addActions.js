"use server";

import { redirect } from "next/navigation";
import {
  addPendingJob,
  addService,
  addSocialMedia,
  addUpcomingJob,
  authenticateUser,
  deleteService,
  editAddress,
  editPhoneNumber,
  editService,
  editSocialMedia,
} from "./services";
import { S3 } from "@aws-sdk/client-s3";

export async function addPendingJobAction(prevState, job) {
  const errors = [];

  if (!job) {
    errors.push("Invalid input data");
    return { success: false, errors };
  }

  if (!job.get("Name")) {
    errors.push("Name");
    return { success: false, errors };
  }

  if (!job.get("Age")) {
    errors.push("Age");
    return { success: false, errors };
  }

  if (!job.get("Phone")) {
    errors.push("Phone");
    return { success: false, errors };
  }

  if (!job.get("Email")) {
    errors.push("Email");
    return { success: false, errors };
  }

  if (!job.get("Address")) {
    errors.push("Address");
    return { success: false, errors };
  }

  if (!job.get("Gender")) {
    errors.push("Gender");
    return { success: false, errors };
  }

  if (!job.get("diseases")) {
    errors.push("diseases");
    return { success: false, errors };
  }

  if (!job.get("Notes")) {
    errors.push("Notes");
    return { success: false, errors };
  }

  if (!job.get("Service")) {
    errors.push("Service");
    return { success: false, errors };
  }

  if (!job.get("Date")) {
    errors.push("Date");
    return { success: false, errors };
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const jobData = {
    name: job.get("Name"),
    age: job.get("Age"),
    phone: job.get("Phone"),
    email: job.get("Email"),
    address: job.get("Address"),
    gender: job.get("Gender"),
    past_diseases: job.get("diseases"),
    notes: job.get("Notes"),
    service: job.get("Service"),
    date_appointed: job.get("Date"),
  };

  try {
    // console.log(jobData);
    await addPendingJob(jobData);
  } catch (error) {
    // console.log(error);
    throw new Error(error);
  }

  redirect(`/`);
}

export async function addServiceAction(prevState, service) {
  const errors = [];

  // console.log(typeof service.get("img").name);

  if (!service) {
    errors.push("No service found");
    return { success: false, errors };
  }

  if (service.get("img").name === "undefined" || !service.get("img").name) {
    // console.log("img error");
    errors.push("Please provide an image");
    return { success: false, errors };
  }
  // console.log("Action", service.get("img"));
  // console.log(process, process.env.AWS_SECRET_ACCESS_KEY);

  const s3 = new S3({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const extension = service.get("img").name.split(".").pop();
  const fileName = `${service.get("name")}.${extension}`;

  const bufferedImage = await service.get("img").arrayBuffer();

  s3.putObject({
    Bucket: "shefaa-demo",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: service.get("img").type,
  });

  const serviceFormData = {
    name: service.get("name"),
    price: service.get("price"),
    duration: service.get("duration"),
    description: service.get("description"),
    img: fileName,
    type: service.get("type"),
  };

  try {
    // console.log(serviceFormData);
    const response = await addService(serviceFormData);
    // console.log(response);
    // return response
  } catch (error) {
    // console.log(error);
    throw new Error(error.message);
    // return { success: false, error: error.message };
  }

  redirect("/Admin");
}

export async function addSocialMediaAction(prevState, formData) {
  const errors = [];

  if (!formData) {
    errors.push("No social media provided");
    return { success: false, errors };
  }

  let isNew = formData.get("isNewObject");

  // console.log("str", isNew);

  if (isNew == "true") {
    isNew = true
  }
  else {
    isNew = false
  }

  // console.log(isNew);

  if (!formData.get("name")) {
    errors.push("Name");
    return { success: false, errors };
  }

  if (!formData.get("link")) {
    errors.push("Link");
    return { success: false, errors };
  }

  const socialMedia = {
    name: formData.get("name"),
    link: formData.get("link"),
  };

  try {
    // console.log(socialMedia, isNew);
    if (isNew) {
      console.log("Add");
      return await addSocialMedia(socialMedia);
    }
    else {
      console.log("Edit");
      return await editSocialMedia(socialMedia.name, socialMedia)
    }
  } catch (error) {
    // console.log(error);
    throw new Error(error.message);
  }
}

export async function addUpcomingJobAction(prevState, job) {
  const errors = [];

  if (!job) {
    errors.push("Invalid input data");
    return { success: false, errors };
  }

  if (!job.get("Name")) {
    errors.push("Name");
    return { success: false, errors };
  }

  if (!job.get("Age")) {
    errors.push("Age");
    return { success: false, errors };
  }

  if (!job.get("Phone")) {
    errors.push("Phone");
    return { success: false, errors };
  }

  if (!job.get("Email")) {
    errors.push("Email");
    return { success: false, errors };
  }

  if (!job.get("Address")) {
    errors.push("Address");
    return { success: false, errors };
  }

  if (!job.get("Gender")) {
    errors.push("Gender");
    return { success: false, errors };
  }

  if (!job.get("diseases")) {
    errors.push("diseases");
    return { success: false, errors };
  }

  if (!job.get("Notes")) {
    errors.push("Notes");
    return { success: false, errors };
  }

  if (!job.get("Service")) {
    errors.push("Service");
    return { success: false, errors };
  }

  if (!job.get("Date")) {
    errors.push("Date");
    return { success: false, errors };
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const jobData = {
    name: job.get("Name"),
    age: job.get("Age"),
    phone: job.get("Phone"),
    email: job.get("Email"),
    address: job.get("Address"),
    gender: job.get("Gender"),
    past_diseases: job.get("diseases"),
    notes: job.get("Notes"),
    service: job.get("Service"),
    date_appointed: job.get("Date"),
  };

  try {
    // console.log(jobData);
    return await addUpcomingJob(jobData);
  } catch (error) {
    // console.log(error);
    throw new Error(error);
  }
}
