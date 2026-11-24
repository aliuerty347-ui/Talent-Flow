import connectDB from "@/lib/db";
import reqq from "@/model/re";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        await connectDB()
        const data =await reqq.find({})
        return NextResponse.json({success:true,data:data})
    }catch(e:any){
        return NextResponse.json({success:false,error:e.message})
    }
    
}
export async function POST(req:Request) {
     try{
        await connectDB()
        const body:any=await req.json()
        console.log(body.text)
        console.log(body.cv)
        if(!body.text && !body.cv){
        return NextResponse.json({success:false,data:"لا يوجد text or cv"})

        }
        const data =await reqq.create(body)
        return NextResponse.json({success:true,data:data})
    }catch(e:any){
        return NextResponse.json({success:false,error:e.message})
    }
}
export async function DELETE(req:Request) {
     try{ await connectDB()
        const body:any=await req.json()
        if(!body.id){
        return NextResponse.json({success:false,data:"id error"})

        }
        const data =await reqq.findByIdAndDelete(body.id)
        return NextResponse.json({success:true,data:"تم حذف"})
}catch(e:any){
        return NextResponse.json({success:false,error:e.message})
}}