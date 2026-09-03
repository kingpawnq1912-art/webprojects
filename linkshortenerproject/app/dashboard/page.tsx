import { SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ArrowUpRight, Link2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CreateLinkDialog } from "@/app/dashboard/create-link-dialog";
import { LinkActions } from "@/app/dashboard/link-actions";
import { getLinksForUser } from "@/data/links";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const userLinks = await getLinksForUser(userId);

  return (
    <main className="min-h-screen bg-[#101313] text-[#f4f3ec]">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 lg:px-10">
          <a className="flex items-center gap-2 text-lg font-semibold tracking-[-0.04em]" href="/dashboard">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#c9f269] text-[#101313]">
              <Link2 className="size-4" strokeWidth={2.5} />
            </span>
            shortly
          </a>
          <SignOutButton redirectUrl="/">
            <Button variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white">
              Sign out
            </Button>
          </SignOutButton>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-20">
        <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9f269]">Your workspace</p>
            <h1 className="mt-4 text-5xl font-semibold leading-none tracking-[-0.06em] sm:text-6xl">Your links.</h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/50">
              Every short link you have created, gathered in one place.
            </p>
          </div>
            <CreateLinkDialog />
        </div>

        <section className="pt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white/70">All links</h2>
            <span className="text-xs text-white/40">{userLinks.length} {userLinks.length === 1 ? "link" : "links"}</span>
          </div>

          {userLinks.length > 0 ? (
            <div className="border-y border-white/10">
              {userLinks.map((link) => (
                <article className="grid gap-5 border-b border-white/10 py-6 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center" key={link.id}>
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center bg-[#c9f269] text-[#101313]">
                      <Link2 className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <a className="inline-flex max-w-full items-center gap-2 truncate text-base font-medium text-[#c9f269] hover:text-[#d8fa87]" href={`/${link.shortCode}`}>
                        <span className="truncate">/{link.shortCode}</span>
                        <ArrowUpRight className="size-4 shrink-0" />
                      </a>
                      <a className="mt-2 block truncate text-sm text-white/45 hover:text-white/70" href={link.originalUrl}>
                        {link.originalUrl}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <time className="text-xs text-white/35 sm:text-right" dateTime={link.createdAt.toISOString()}>
                      {link.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </time>
                    <LinkActions linkId={link.id} originalUrl={link.originalUrl} />
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-white/15 px-6 py-16 text-center">
              <Link2 className="mx-auto size-6 text-[#c9f269]" />
              <h3 className="mt-5 text-lg font-medium">No links yet</h3>
              <p className="mt-2 text-sm text-white/45">Your shortened links will appear here.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
