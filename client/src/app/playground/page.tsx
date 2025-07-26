import AppSideBar from "@/components/layout/AppSideBar";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export const Playground = () => {
  return (
    <>
      <SignedIn>
        <main className="h-screen bg-zinc-950 flex flex-col ml-16">
          <div className="flex-1 flex flex-col">
            <AppSideBar />
            <div className="flex flex-col justify-center items-center py-4 border-b-zinc-700 border-b">
              <p className="text-white font-[Bold] text-5xl">
                Context.<span className="text-[#31b8c7]">AI</span>
              </p>
              <p className="text-[#31b8c7] font-[SemiBold]">
                This playground is just for testing purposes.
              </p>
            </div>
            <div className="flex-1 flex h-full">
              <div className="flex-1 flex flex-col border-r border-zinc-700">
                <div className="flex-1 p-4">
                  <h2 className="text-white font-[Bold] text-2xl mb-4">
                    OpenAI
                  </h2>
                </div>
                <div className="p-4 border-t border-zinc-700">
                  <PromptArea />
                </div>
              </div>
              <div className="flex-1 flex flex-col border-r border-zinc-700">
                <div className="flex-1 p-4">
                  <h2 className="text-white font-[Bold] text-2xl mb-4">
                    Gemini
                  </h2>
                </div>
                <div className="p-4 border-t border-zinc-700">
                  <PromptArea />
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex-1 p-4">
                  <h2 className="text-white font-[Bold] text-2xl mb-4">
                    Perplexity Sonar
                  </h2>
                </div>
                <div className="p-4 border-t border-zinc-700">
                  <PromptArea />
                </div>
              </div>
            </div>
          </div>
        </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export const PromptArea = () => {
  return (
    <textarea
      className="w-full min-h-[120px] rounded-xl border-[#31b8c7] bg-neutral-900 outline-[#31b8c7] focus:outline-1 text-white p-4 placeholder:text-md [resize:none] overflow-auto"
      placeholder="Type a prompt here"
    />
  );
};

export default Playground;
