import { auth, signOut } from "@/auth/nextauth";

async function Dashboard() {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out?</button>
      </form>
    </div>
  );
}

export default Dashboard;
