"use server";

import { items } from "@/db/schema";
import { database } from "@/db/database";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createItemAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = session.user;
  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  // Insert the new item into the database
  await database.insert(items).values({
    name: formData.get("name") as string,
    userId: user.id,
  });

  // Revalidate the path to reflect the changes
  revalidatePath("/");
}
