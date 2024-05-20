import { NextRequest } from "next/server";
import client from "../../../db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await client.user.create({
    data: {
      username: body.username,
      password: body.password,
    },
  });

  console.log(user);

  return Response.json({
    message: "You are logged in!",
  });
}

export async function GET() {
  const user = await client.user.findFirst({});
  return Response.json({ username: user?.username, password: user?.password })
}
