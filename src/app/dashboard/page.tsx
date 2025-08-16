import { auth } from "@/auth/nextauth";

async function Dashboard() {
  const session = await auth();

  return <div>{JSON.stringify(session)}</div>;
}

export default Dashboard;
