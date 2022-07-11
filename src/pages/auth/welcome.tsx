import { useSession } from "next-auth/react";
import Header from "../../components/Header";

export default function Welcome() {
  const { data: session } = useSession();

  return (
    <>
      <Header />
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
