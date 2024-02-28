import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex text-center items-center justify-center gap-2 bg-green-400 text-white p-2 text-lg">
    <Link href="/">Home</Link>
    <Link href="/todo">Todo App</Link>
  </nav>
  )
}
