import { Appbar } from "@/components/Appbar";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/app/lib/auth";

export default async function () {
  const session = await getServerSession(NEXT_AUTH);
  return (
    <div>
      <Appbar />
      User Component  {JSON.stringify(session)}
    </div>
  )
}