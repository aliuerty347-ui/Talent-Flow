import connectDB from "@/lib/db";
import employCard from "@/model/empSch";
import { NextResponse } from "next/server";

export async function GET(req:any){
    try{
        await connectDB()
    
        const data =await employCard.find({})

       return NextResponse.json({success:true,data:data})
    }
    catch(e:any){
      return NextResponse.json({success:false,error:e.message})
    }
}