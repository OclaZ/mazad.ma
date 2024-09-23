import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SignIn from "@/components/ui/sign-in";
import { SignOut } from "@/components/ui/sign-out";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { revalidatePath } from "next/cache";
export default async function HomePage() {
  const allItems = await database.query.items.findMany();
  const session = await auth();
  if (!session) return null;
  if (!session.user) return null;
  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Items For Sale</h1>

      <div className="grid grid-cols-4 gap-4">
        {allItems.map((item) => (
          <div className="border p-8 rounded-xl" key={item.id}>
            {item.name}
          </div>
        ))}
      </div>
    </main>
  );
}
