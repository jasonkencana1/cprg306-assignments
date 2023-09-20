import Link from "next/link";
import MyComp from "./StudentInfo";

export default function Home() {
  return (
    <main>
      <h1>
        CPRG 306: Web Development 2 - Assignments
      </h1>
      <MyComp />
      <Link href="week2">Week 2 Page</Link>
    </main>
  )
}
