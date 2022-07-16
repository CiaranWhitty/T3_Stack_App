import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();

  return (
    <>
      <header className="header p-3 flex flex-row items-center justify-between max-w-4xl min-w-300 m-auto">
        <Link href={"/"}>
          <a>
            <h1 className="text-3xl font-bold">T3 Stack</h1>
          </a>
        </Link>
        {session ? (
          <div className="flex h-12">
            <div className="flex flex-col items-center mr-2">
              <Image
                className="rounded-md"
                src={session.user?.image!}
                alt={session.user?.name!}
                height="25"
                width="25"
              />
              {session.user?.name} <br />
            </div>
            <button
              className="bg-red-300 rounded text-black p-2 font-bold"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex">
            <div className="flex flex-col items-center mr-2">
              Not signed in <br />
            </div>
            <button
              className="bg-blue-300 rounded text-black p-2 font-bold"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </div>
        )}
      </header>
    </>
  );
}
