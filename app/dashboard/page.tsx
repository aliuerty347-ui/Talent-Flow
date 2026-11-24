"use client"
import "./page.css"
import Link from "next/link"

export default function dashemp(){
    return(<div>
      <div>  <Link href="/dashboard/employ"><button>employ</button></Link></div>
       <div> <Link href="/dashboard/create"><button>career</button></Link></div>
       {/* <div> <Link href="/cv"><button>cv</button></Link></div> */}
    </div>)
}