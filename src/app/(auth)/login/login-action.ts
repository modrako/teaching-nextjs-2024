"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createDB } from "../../../lib/db";

export async function login(email: string, password: string) {
  console.log(`Logging in email: ${email}, password: ${password}`);

  const db = createDB();

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();

  if (user == null) {
    throw new Error("User not found");
  }

  console.log("User found:", user.id);

  if (password != user.password) {
    throw new Error("Incorrect password");
  }

  const cookiesStore = cookies();

  cookiesStore.set("session-user-id", `${user.id}`);
  
  console.log("Login successful");

  redirect("/");
}
