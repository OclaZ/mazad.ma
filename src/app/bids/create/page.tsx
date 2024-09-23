import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemAction } from "./actions";

export default async function CreatePage() {
  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Post a new item</h1>
      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg "
        action={createItemAction}
      >
        <Input name="name" placeholder="Name your item" className="max-w-lg" />
        <Button className="self-end" type="submit">
          Post item
        </Button>
      </form>
    </main>
  );
}
