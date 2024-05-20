import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  return NextResponse.json({
    username: body.username,
    password: body.password,
    message: "You are logged in."
  });
}

export async function GET() {
  return Response.json({ username: "Nischay", email: "nv@gmail.com" });
}
