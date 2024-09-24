import { auth } from "@/auth";
import SignIn from "@/components/ui/sign-in";
import { SignOut } from "@/components/ui/sign-out";
import Image from "next/image";
import Link from "next/link";

export async function Header() {
  const session = await auth();
  return (
    <div
      className="bg-gray-700 py-4
    "
    >
      <div className="Container flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href={"/"} className="hover:underline flex items-center gap-1">
            <Image src="/MAZAD-MA.svg" alt="logo" width={250} height={250} />
          </Link>
          <Link
            href={"/bids/create"}
            className="hover:underline flex items-center gap-1"
          >
            Auction an Item
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div>{session?.user?.name}</div>
          <div>{session ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </div>
  );
}
