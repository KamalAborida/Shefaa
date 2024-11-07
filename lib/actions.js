"use server";

import { authenticateUser } from "./services";
// import { S3 } from "@aws-sdk/client-s3";

export async function authenticateUserAction(prevState, formData) {
  if (!formData) {
    return { message: "No data sent" };
  }

  if (!formData.get("Username") || !formData.get("Password")) {
    return { message: "Incomplete data" };
  }

  const userData = {
    username: formData.get("Username"),
    password: formData.get("Password"),
  };

  try {
    // console.log(jobData);
    // console.log(userData.username, userData.password);
    return await authenticateUser(userData.username, userData.password);
  } catch (error) {
    // console.log(error);
    return "Error in action";
  }
}
