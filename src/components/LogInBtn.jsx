import Link from "next/link";

function LogInBtn() {
  return (
    <Link
      className="text-white bg-red-300 font-semibold border-2 rounded-md px-2 py-1 ml-4 hover:bg-sky-900"
      href="/api/auth/login"
    >
      Log In
    </Link>
  );
}

export default LogInBtn;
