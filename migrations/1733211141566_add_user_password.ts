import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await sql`ALTER TABLE users ADD COLUMN password TEXT;`.execute(db);
}

