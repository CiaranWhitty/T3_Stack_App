import { CtxOrReq } from "next-auth/client/_utils";
import { signIn, getProviders, useSession } from "next-auth/react";


export default function SignIn({ providers }: any) {
  const { data: session } = useSession();
  return (
    <>
      <div className=" flex justify-center items-center">
        {session && <h1>Logged In</h1>}
        {!session && (
          <div className="border rounded p-20 pt-56 pb-56 m-3 bg-gray-700">
            {providers &&
              Object.values(providers).map((provider: any) => (
                <div key={provider.name} className="">
                  <hr />
                  <button
                    className="bg-gray-900 hover:bg-sky-700 rounded-md p-3 m-3 font-bold"
                    onClick={() => {
                      signIn(provider.id);
                    }}
                  >
                    Sign in with {provider.name}
                  </button>
                  <hr />
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(ctx: CtxOrReq) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
