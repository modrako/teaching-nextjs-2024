import Link from "next/link";
import { createDB } from "../../lib/db";
import { LoginAuth } from "../../lib/Auth";

export default async function UserProfile() {
  const userId = LoginAuth();

  const db = createDB();

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", userId)
    .executeTakeFirstOrThrow();

  return (
    <div className="card bg-base-100 w-96 drop-shadow-md">
      <div className="card-body">
        <p>{user.id}</p>
        <p>{user.email}</p>
        <p>{user.username}</p>
        <p>{user.displayName}</p>
        <Link href="/profile/posts">My Posts</Link>
      </div>
    </div>
  );
}
