import AppSideBar from "@/components/layout/AppSideBar";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Playground() {
  return (
    <>
      <SignedIn>
        <main className="min-h-screen bg-zinc-950">
          <AppSideBar />
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4 text-white">
              Context.<span></span>
            </h1>
            <p className="text-white">
              This is a simple playground page. You can add your content here.
            </p>
          </div>
        </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
