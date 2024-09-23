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
        <div>
          <Link href={"/"} className="hover:underline flex items-center gap-1">
            <Image src="/MAZAD-MA LOGO.svg" alt="logo" width={50} height={50} />
            Mazad.ma
          </Link>
          <Link
            href={"/bids/create"}
            className="hover:underline flex items-center gap-1"
          >
            Auction Items
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
