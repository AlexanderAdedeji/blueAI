import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
  return (
    <main>
      Hello WOlrd
      <UserButton afterSignOutUrl="/" />
    </main>
  );
};

export default DashboardPage;
