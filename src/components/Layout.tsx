import { useSession } from "next-auth/react";
import Header from "./Header";

export default function Layout({ children }: any) {
  const { status } = useSession();
  return (
    <>
      {status === "loading" ? (
        <h1>Loading</h1>
      ) : (
        <>
          <Header />
          <main className="max-w-4xl min-w-300 m-auto items-center">
            {children}
          </main>
        </>
      )}
    </>
  );
}
