import client from "../db";

async function getUserDetails() {
  try {
    const user = await client.user.findFirst({
      where: {
        id: 3,
      },
    });
    return {
      name: user?.username,
      password: user?.password,
    };
  } catch (e) {
    console.log(e);
  }
}

export default async function Home() {
  const userData = await getUserDetails();

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>Name: {userData?.name}</div>
          <div>Password: {userData?.password}</div>
        </div>
      </div>
    </div>
  );
}
