import Link from "next/link";
import MyComp from "../StudentInfo";

export default function Page(){
    return (
        <main>
            <h1>My Shopping List</h1>
            <MyComp />
            <Link href="..">&lt;- Back</Link>
        </main>
    );
}