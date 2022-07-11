import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <>
      <header className="header w-11/12 m-auto p-6 flex justify-between items-center">
        <Link href={"/"}>
          <a>
            <h1 className="text-4xl font-bold">Home</h1>
          </a>
        </Link>
        {session ? (
          <div className="flex h-12">
            <div className="flex flex-col items-center mr-2">
              <img
                className="rounded-md"
                src={session.user?.image}
                alt={session.user?.name}
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
