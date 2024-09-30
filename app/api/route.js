import { connectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";

const loadDB = async()=>{
    await connectDB();
}

loadDB();

export async function GET(request){
    
    const todos = await TodoModel.find({});
    
    return NextResponse.json({todos:todos})
}

export async function POST(request){
    // Destructuring
    const {title,description} = await request.json();

    if(!title || !description){
        return NextResponse.json({msg: "All fields are required"})
    }

    await TodoModel.create({title,description})

    return NextResponse.json({msg: "TODO IS CREATED SUCCESSFULLY"})
}

export async function DELETE(request){
    
    const mongoId = await request.nextUrl.searchParams.get('mongoId')
    await TodoModel.findByIdAndDelete(mongoId)

    return NextResponse.json({msg: "TODO IS DELETED SUCCESSFULLY"})
}

export async function PUT(request){
    const mongoId = await request.nextUrl.searchParams.get('mongoId')
    await TodoModel.findByIdAndUpdate(mongoId,{
        $set: {
            isCompleted: true,
        }
    })

    return NextResponse.json({msg: "TODO IS UPDATED SUCCESSFULLY"})

}