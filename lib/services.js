"use server";

import { S3 } from "@aws-sdk/client-s3";
import sql from "better-sqlite3";
import { revalidatePath } from "next/cache";
const db = sql("database.db");

// console.log(process, process.env.AWS_SECRET_ACCESS_KEY);

// Function to get all services
export async function getServices() {
  return db.prepare("SELECT * FROM services").all();
}

// Function to get all phones
export async function getPhones() {
  return db.prepare("SELECT * FROM phones").all();
}

export async function getAddresses() {
  return db.prepare("SELECT * FROM addresses").all();
}

// Function to get all social media entries
export async function getSocialMedia() {
  return db.prepare("SELECT * FROM social_media").all();
}

export async function getService(id) {
  return db.prepare("SELECT * FROM services WHERE id = ?").get(id);
}

// Function to get pending jobs
export async function getPendingJobs() {
  return db.prepare("SELECT * FROM pending_jobs").all();
}

export async function getUpcomingJobs() {
  return db.prepare("SELECT * FROM upcoming_jobs").all();
}

export async function getUserByUserName(username) {
  return db.prepare('SELECT * FROM employees WHERE username = ?').get(username)
}

export async function editPhoneNumber(phoneId, phoneData) {
  const stmt = db.prepare(`
    UPDATE phones
    SET name = @name,
        phone = @phone
    WHERE id = @id
  `);

  try {
    const result = stmt.run({ id: phoneId, ...phoneData });
    if (result.changes === 0) {
      return {
        success: false,
        error: "No phone number found with the provided ID",
      };
    }
    revalidatePath("/Admin")
    return { success: true, changes: result.changes };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function editSocialMedia(name, socialMediaData) {
  console.log(name, socialMediaData);
  const stmt = db.prepare(`
    UPDATE social_media
    SET name = @newName,
        link = @link
    WHERE name = @name
  `);

  try {
    const result = stmt.run({ name, newName: socialMediaData.name, link: socialMediaData.link });
    if (result.changes === 0) {
      return { success: false, error: "No social media entry found with the provided name" };
    }
    revalidatePath("/Admin");
    return { success: true, changes: result.changes };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


export async function editAddress(addressId, addressData) {
  const stmt = db.prepare(`
    UPDATE addresses
    SET city = @city,
        address = @address
    WHERE id = @id
  `);

  try {
    const result = stmt.run({ id: addressId, ...addressData });
    if (result.changes === 0) {
      return { success: false, error: "No address found with the provided ID" };
    }
    revalidatePath("/Admin")
    return { success: true, changes: result.changes };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function addPendingJob(job) {
  const result = db
    .prepare(
      `
    INSERT INTO pending_jobs (
      name, age, phone, email, address, gender, past_diseases, notes, service, date_appointed
    ) VALUES (
      @name,
      @age,
      @phone,
      @email,
      @address,
      @gender,
      @past_diseases,
      @notes,
      @service,
      @date_appointed
    )
  `
    )
    .run(job);

  await new Promise((resolve) => setTimeout(resolve, 10000));

  if (result.lastInsertRowid) {
    // If lastInsertRowid is truthy, the insertion was successful
    return { success: true, jobId: result.lastInsertRowid };
  } else {
    // If lastInsertRowid is falsy, the insertion failed
    return { success: false };
  }
}

export async function addService(service, bufferedImage) {
  // console.log(service);

  // const s3 = new S3({
  //   region: 'eu-north-1',
  //   credentials: {
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // },
  // })

  // const extension = service.img.name.split(".").pop();
  // const fileName = `${service.name}.${extension}`;

  // const bufferedImage = await service.img.arrayBuffer();

  // s3.putObject({
  //   Bucket: 'shefaa-demo',
  //   Key: fileName,
  //   Body: Buffer.from(bufferedImage),
  //   ContentType: service.img.type,
  // });

  // service.img = fileName

  const result = db
    .prepare(
      `
    INSERT INTO services (
      name, price, duration, description, img, type
    ) VALUES (
      @name,
      @price,
      @duration,
      @description,
      @img,
      @type
    )
  `
    )
    .run(service);

  if (result.lastInsertRowid) {
    // If lastInsertRowid is truthy, the insertion was successful
    revalidatePath("/Admin")
    return { success: true };
  } else {
    // If lastInsertRowid is falsy, the insertion failed
    return { success: false };
  }
}

export async function addSocialMedia(socialMedia) {
  const stmt = db.prepare(`
    INSERT INTO social_media (name, link) 
    VALUES (@name, @link)
  `);

  try {
    const result = stmt.run(socialMedia);
    revalidatePath("/Admin")
    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function editService(serviceId, serviceData) {
  // console.log("edit", serviceData);
  const stmt = db.prepare(`
    UPDATE services 
    SET 
      name = @name, 
      price = @price, 
      duration = @duration, 
      description = @description, 
      img = @img, 
      type = @type 
    WHERE id = @id
  `);

  try {
    const result = stmt.run({ id: serviceId, ...serviceData });
    if (result.changes === 0) {
      return { success: false, error: "No service found with the provided ID" };
    }
    revalidatePath("/Admin")
    return { success: true, changes: result.changes };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteService(serviceId) {
  // console.log("delete", serviceId);
  const stmt = db.prepare(`
    DELETE FROM services 
    WHERE id = ?
  `);

  try {
    const result = stmt.run(serviceId);
    if (result.changes === 0) {
      return { success: false, error: "No service found with the provided ID" };
    }
    revalidatePath("/Admin")
    return { success: true, changes: result.changes };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deletePendingJob(pendingJobId) {
  const stmt = db.prepare(`
    DELETE FROM pending_jobs
    WHERE id = ?
  `);

  try {
    const result = stmt.run(pendingJobId);
    if (result.changes === 0) {
      return {
        success: false,
        error: "No pending job found with the provided ID",
      };
    }
    revalidatePath("/Admin")
    return { success: true, changes: result.changes };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteUpcomingJob(jobId) {
  const stmt = db.prepare(`
    DELETE FROM upcoming_jobs 
    WHERE id = ?
  `);

  try {
    const result = stmt.run(jobId);
    if (result.changes === 0) {
      return { success: false, error: "No job found with the provided ID" };
    }
    revalidatePath("/Admin")
    return { success: true, changes: result.changes };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function addUpcomingJob(job) {
  // console.log(job);
  const stmt = db.prepare(`
    INSERT INTO upcoming_jobs (
      name, age, phone, email, address, gender, past_diseases, notes, service, date_appointed, date_scheduled
    ) VALUES (
      @name,
      @age,
      @phone,
      @email,
      @address,
      @gender,
      @past_diseases,
      @notes,
      @service,
      @date_appointed,
      @date_scheduled
    )
  `);

  try {
    const result = stmt.run(job);
    revalidatePath("/Admin")
    return { success: true, jobId: result.lastInsertRowid };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function authenticateUser(username, password) {
  // console.log("pop", username, password);
  const stmt = db.prepare(`
    SELECT * FROM employees
    WHERE username = ? AND password = ?
  `);

  const user = stmt.get(username, password);

  if (user) {
    // console.log("Success");
    return {
      username: user.username,
      authenticated: true,
      isAdmin: user.is_admin === 1,
    };
  } else {
    return {
      authenticated: false,
      isAdmin: false,
    };
  }
}

export async function deleteSocialMedia(name) {
  const stmt = db.prepare(`
    DELETE FROM social_media
    WHERE name = ?
  `);

  try {
    const result = stmt.run(name);
    if (result.changes === 0) {
      return { success: false, error: "No social media entry found with the provided name" };
    }
    revalidatePath("/Admin");
    return { success: true, changes: result.changes };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
