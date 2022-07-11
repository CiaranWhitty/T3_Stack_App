import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

import Header from "../components/Header";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  const bye = trpc.useQuery(["example.bye", { text: "from tRPC", number: 12 }]);
  // console.log("bye", bye);

  // const exampleData = trpc.useQuery(["example.getAll"]);
  // console.log("exampleData", exampleData);

  // const currentSession = trpc.useQuery(["auth.getSession"]);
  // console.log("currentSession", currentSession);

  // const currentSessionSecret = trpc.useQuery(["auth.getSecretMessage"]);
  // console.log("currentSessionSecret", currentSessionSecret);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen w-screen items-stretch relative">
        <Head>
          <title>Home</title>
        </Head>

        <Header />

        <div className="flex flex-col justify-center items-center">
          <h2 className="text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold">
            Create <span className="text-purple-300">T3</span> App
          </h2>

          <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
            {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
          </div>

          <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
            {bye.data ? <p>{bye.data.full}</p> : <p>Loading..</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
