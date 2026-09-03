import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function Home() {
  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-full bg-background font-sans text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <span className="text-lg font-semibold tracking-tight">shortly</span>
          <nav className="flex items-center gap-3 text-sm font-medium">
            <Show when="signed-out">
              <SignInButton>
                <Button variant="ghost" className="px-3 text-muted-foreground hover:text-foreground">
                  Sign in
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="px-4">
                  Sign up
                </Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </nav>
        </div>
      </header>
      <main className="mx-auto flex max-w-5xl flex-col px-6 py-20">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Link shortener
        </p>
        <h1 className="max-w-xl text-5xl font-semibold tracking-tight sm:text-6xl">
          Make every link easier to share.
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-600">
          Create memorable short links and keep your important URLs in one place.
        </p>
        <div className="mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
          <Input
            className="h-12 min-w-0 flex-1 bg-card px-4"
            placeholder="Paste a long URL"
            type="url"
          />
          <Button className="h-12 px-6 font-medium">
            Shorten link
          </Button>
        </div>
      </main>
    </div>
  );
}
