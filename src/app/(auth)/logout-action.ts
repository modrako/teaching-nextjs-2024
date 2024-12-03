"use server";

import { cookies } from "next/headers";

export async function logout() {
  const cookiesStore = cookies();

  cookiesStore.delete("session-user-id");
}
