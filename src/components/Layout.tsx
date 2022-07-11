import { useSession } from "next-auth/react";

export default function Layout({ children }: any) {
  const session = useSession();
  return (
    <>
      {session.status === "loading" ? (
        <h1>Loading</h1>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
}
