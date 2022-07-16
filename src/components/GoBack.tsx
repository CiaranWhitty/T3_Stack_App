import { useRouter } from "next/router";
import Link from "next/link";

interface props {
  type: string;
  url?: string;
  text?: string;
}

export default function GoBack(props: props) {
  const router = useRouter();
  return (
    <div className="m-3">
      {props.type === "Normal" && (
        <Link href={`/${props.url}`}>
          <button className=" bg-gray-500 p-2 rounded-md  w-max hover:bg-gray-700 ">
            <h4>{props.text ? props.text : "Go Back"}</h4>
          </button>
        </Link>
      )}
      {props.type === "Router" && (
        <Link href="#">
          <button
            onClick={() => router.back()}
            className=" bg-gray-500 p-2 rounded-md  w-max hover:bg-gray-700 "
          >
            <h4>Go Back</h4>
          </button>
        </Link>
      )}
    </div>
  );
}
