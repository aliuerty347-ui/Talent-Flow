import connectDB from "@/lib/db";
import Career from "@/model/Career";
import { NextResponse } from "next/server";

export async function GET(req:any) {
    try {
        await connectDB()
        const id = req.nextUrl.searchParams.get("d");

        if (id) {
            const data = await Career.findById(id);
            if (!data) {
                return NextResponse.json({ success: false, error: "العنصر غير موجود" }, { status: 404 });
            }
            return NextResponse.json({ success: true, data: data });
        } else {
            const data = await Career.find({});
            return NextResponse.json({ success: true, data: data });
        }
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message })
    }

}
export async function POST(req: any) {
    try {
        await connectDB()
        const body = await req.json();
        const data = await Career.create(body)
        return NextResponse.json({ success: true, data: data })
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message })
    }

}
export async function DELETE(req: any) {
    try {
        await connectDB()
        const body = await req.json();
        const data = await Career.findByIdAndDelete(body.id)
        return NextResponse.json({ success: true, data: data })
    }
    catch (e: any) {
        return NextResponse.json({ success: false, error: e.message })
    }

}