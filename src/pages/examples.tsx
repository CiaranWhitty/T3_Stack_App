import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import { trpc } from "../utils/trpc";

import LoadingSVG from "../assets/puff.svg";
import LoggedOut from "../components/LoggedOut";

export default function Examples() {
  const { data: currentSession } = useSession();
  const [name, setName] = useState("");

  const { mutate: mutateSubmit } = trpc.proxy.example.submit.useMutation();
  const { mutate: mutateEdit } = trpc.proxy.example.edit.useMutation();
  const { mutate: mutateDelete } = trpc.proxy.example.remove.useMutation();

  const { data, isLoading } = trpc.proxy.example.getAll.useQuery();
  
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
        <div className="border rounded p-10  m-3 bg-gray-700">
          <h1 className="pb-6 text-3xl text-white underline">Examples:</h1>

          {/* Add Button And Input */}
          <div className="flex justify-around items-center p-2 rounded-md bg-slate-600">
            <input
              placeholder="Name"
              className=" w-1/3 p-1 px-2 text-gray-800 rounded-md "
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="  bg-blue-500 p-2 pl-5 pr-5 rounded-md hover:bg-blue-400"
              onClick={() => {
                if (!name) return;
                mutateSubmit({
                  userId: String(currentSession?.user?.id),
                  name,
                });
                setName("");
              }}
            >
              Add
            </button>
          </div>

          {/* Listing Examples And Edit/Delete */}
          <div className="flex flex-wrap justify-center text-white pt-6 ">
            {data?.map((ex) => {
              return (
                <div
                  key={ex.id}
                  className="w-full p-2 mb-2 rounded-md bg-slate-600"
                >
                  <hr />
                  <div className="flex mb-5">
                    {/* <li>Id: {ex.id}</li> */}
                    <Link href={`/examples/${ex.name}`}>
                      <a>
                        <div className="text-2xl hover:underline">
                          {ex.name}
                        </div>
                      </a>
                    </Link>
                  </div>
                  <div className=" w-1/2 m-auto flex justify-evenly items-center">
                    <button
                      className="  bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                      onClick={() => {
                        if (!name) return;
                        mutateEdit({ id: ex.id, name });
                        setName("");
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="  bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                      onClick={() => {
                        mutateDelete({ id: ex.id });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
          {/* Listing Examples And */}
        </div>
      ) : (
        <LoggedOut />
      )}
    </>
  );
}
