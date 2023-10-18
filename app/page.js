import Link from "next/link";
import MyComp from "./StudentInfo";

export default function Home() {
  return (
    <main>
      <h1>
        CPRG 306: Web Development 2 - Assignments
      </h1>
      <MyComp />
        <ul>
          <li><Link href="week2">Week 2 Page</Link></li>
          <li><Link href="week3">Week 3 Page</Link></li>
          <li><Link href="week4">Week 4 Page</Link></li>  
          <li><Link href="week5">Week 5 Page</Link></li>  
          <li><Link href="week6">Week 6 Page</Link></li>  
        </ul>
    </main>
  )
}
