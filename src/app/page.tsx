import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SignIn from "@/components/ui/sign-in";
import { SignOut } from "@/components/ui/sign-out";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function HomePage() {
  const allItems = await database.select().from(items); // Fetch items from the database
  const session = await auth();

  if (!session || !session.user) return <SignIn />;

  return (
    <main className="">
      <SignOut />
      <p>Welcome, {session?.user?.name}</p>

      <form
        action={async (formData: FormData) => {
          "use server";
          const name = formData.get("name");
          if (!name) {
            throw new Error("Name is required");
          }

          await database.insert(items).values({
            name: name as string,
            userId: session?.user?.id,
          });

          revalidatePath("/"); // Revalidate the path to show the new item
        }}
      >
        <Input name="name" placeholder="Name your item" />
        <Button type="submit">Post item</Button>
      </form>

      <div>
        {allItems.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </main>
  );
}
