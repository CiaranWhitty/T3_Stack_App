import { useSession } from "next-auth/react";

export default function Welcome() {
  const { data: session } = useSession();

  return (
    <>
      <div className=" flex items-center justify-center">
        {session ? (
          <div>Welcome {session?.user?.name}</div>
        ) : (
          <div>Please Sign In</div>
        )}
      </div>
    </>
  );
}
