"use server";

import {
  editAddress,
  editPhoneNumber,
  editService,
  getService,
} from "./services";
import { S3 } from "@aws-sdk/client-s3";
import { redirect } from "next/navigation";

export async function editPhoneNumberAction(prevState, formData) {
  const errors = [];

  if (!formData) {
    // console.log("No form data");
    errors.push("Invalid Input data");
    return { success: false, errors };
  }

  if (formData.get("phone") === "" || !formData.get("phone")) {
    errors.push("Please provide a phone number");
    return { success: false, errors };
  }
  // console.log("Phone");

  const phoneId = formData.get("id");
  const phoneData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
  };

  try {
    // console.log(+phoneId, phoneData);
    return await editPhoneNumber(+phoneId, phoneData);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function editAddressAction(prevState, formData) {
  const errors = [];

  if (!formData) {
    // console.log("No form data");
    errors.push("Invalid Input data");
    return { success: false, errors };
  }

  if (formData.get("city") === "" || !formData.get("city")) {
    errors.push("Please provide a city");
    return { success: false, errors };
  }

  const addressId = formData.get("id");
  const addressData = {
    city: formData.get("city"),
    address: formData.get("address"),
  };

  try {
    // console.log(addressId, addressData);
    return await editAddress(+addressId, addressData);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function editServiceAction(prevState, service) {
  const errors = [];

  // console.log(typeof service.get("img").name);

  if (!service) {
    errors.push("No service found");
    return { success: false, errors };
  }

  if (!service.get("id")) {
    errors.push("No service ID found");
    return { success: false, errors };
  }

  if (service.get("img").name === "undefined") {
    console.log("img error");
    errors.push("Please provide an image");
    return { success: false, errors };
  }

  const prevService = await getService(service.get("id"));
  const serviceImg = prevService.img;

  const s3 = new S3({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const params = {
    Bucket: "shefaa-demo",
    Key: serviceImg, // The key (name) of the object you want to delete
  };

  s3.deleteObject(params, async (err) => {
    if (err) {
      console.error("Error deleting object", err);
      return { success: false, error: err };
    }

    // console.log("Success");
  });

  // console.log(service.get("img"));

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
    await editService(service.get("id"), serviceFormData);
  } catch (error) {
    throw new Error(error.message);
    // console.log(error);
    // return { success: false, error: error.message };
  }

  redirect("/Admin");
}
