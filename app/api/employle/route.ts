import connectDB from "@/lib/db";
import employCard from "@/model/empSch";
import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";
export async function GET(req:any){
    try{
        await connectDB()
        const { searchParams } =new URL(req.url);
        const qu = searchParams.get('s')
        const data =await employCard.findById(qu)

       return NextResponse.json({success:true,data:data})
    }
    catch(e:any){
      return NextResponse.json({success:false,error:e.message})
    }
}



export async function POST(req:any){
  try{
        await connectDB()
        const body=await req.json();
        const data =await employCard.create(body)
    if (body.userId) {
      const client = await clerkClient();
      
      await client.users.updateUserMetadata(body.userId, {
        publicMetadata: {
          role: body.role
        },
      });
    }
    return NextResponse.json({success:true,data:data})

  }catch(e:any){
    return NextResponse.json({success:false,error:e.message})
  }
}
export async function DELETE (req:Request) {
    await connectDB();
    try{
      const body=await req.json();
        const data=await employCard.findByIdAndDelete(body.id)
        return NextResponse.json({success:true,data:data})
    }
    catch(e:any){
        return NextResponse.json({success:false,error:e.message})
    }
    
}