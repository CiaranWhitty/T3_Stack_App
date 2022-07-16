import Image from "next/image";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";

import GoBack from "../../components/GoBack";
import LoggedOut from "../../components/LoggedOut";

import LoadingSVG from "../../assets/puff.svg";

export default function ExamplesName() {
  const { query } = useRouter();
  if (!query.name || typeof query.name !== "string") {
    return null;
  }
  const { data, isLoading } = trpc.proxy.example.getByName.useQuery({
    name: query.name,
  });

  const { data: currentSession } = useSession();

  if (isLoading || !data) {
    return (
      <div className="flex animate-fade-in-delay justify-center p-8">
        <Image src={LoadingSVG} alt="loading..." width={200} height={200} />
      </div>
    );
  }

  return (
    <>
      {currentSession ? (
        <>
          <GoBack type="Normal" url="examples" />
          <div className="border rounded p-10  m-3 bg-gray-700">
            <h1 className="pt-6 text-3xl text-blue-300 flex justify-center items-center">
              Example: {query.name}
            </h1>
            <div className="pt-6 text-2xl text-blue-500 ">
              <h1 className="pt-6 text-3xl text-blue-300 flex justify-center items-center">
                Details:
              </h1>
              <div className="flex flex-wrap justify-center text-center text-blue-500 pt-6 text-2xl ">
                {[data]?.map((ex) => {
                  return (
                    <div key={ex?.id} className=" w-10/12">
                      <ul>
                        <li>Id: {ex?.id}</li>
                        <li>Name: {ex?.name}</li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <LoggedOut />
      )}
    </>
  );
}
