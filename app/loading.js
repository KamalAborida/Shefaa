import Logo from "@/assets/Logo";

export default async function LoadingPage() {
  return (
    <main>
      <div className="loadingDiv">
        <Logo color={"#596EA6"}/>
        <p>Loading your content please wait.</p>
      </div>
    </main>
  );
}
