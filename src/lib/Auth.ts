import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function LoginAuth() {
  const cookieStore = cookies();

  const sessionUserId = cookieStore.get("session-user-id");
  console.log("Session user id:", sessionUserId);

  if (sessionUserId == null) {
    redirect("/login");
  }

  const userId = parseInt(sessionUserId.value);
  if (isNaN(userId)) {
    redirect("/login");
  }

  return userId;
}
