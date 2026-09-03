import {
  Show,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  Clipboard,
  Link2,
  MousePointer2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const features = [
  {
    icon: Link2,
    title: "Short by design",
    description: "Turn unwieldy URLs into clean, memorable links that are ready to share.",
  },
  {
    icon: BarChart3,
    title: "See what lands",
    description: "Keep an eye on clicks and momentum so every link has a little more context.",
  },
  {
    icon: Clipboard,
    title: "One calm workspace",
    description: "Keep your links together, easy to find, and ready for the next conversation.",
  },
];

const steps = [
  { number: "01", title: "Paste", description: "Drop in any long URL." },
  { number: "02", title: "Shorten", description: "Get a link people can remember." },
  { number: "03", title: "Share", description: "Send it out and track the signal." },
];

export default async function Home() {
  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#101313] font-sans text-[#f4f3ec]">
      <header className="relative z-10 border-b border-white/10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a className="flex items-center gap-2 text-lg font-semibold tracking-[-0.04em]" href="#top">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#c9f269] text-[#101313]">
              <Link2 className="size-4" strokeWidth={2.5} />
            </span>
            shortly
          </a>
          <nav className="flex items-center gap-2 text-sm font-medium">
            <Show when="signed-out">
              <SignInButton>
                <Button variant="ghost" className="px-3 text-white/65 hover:bg-white/10 hover:text-white">
                  Sign in
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-[#c9f269] px-4 text-[#101313] hover:bg-[#d8fa87]">
                  Get started <ArrowUpRight />
                </Button>
              </SignUpButton>
            </Show>
          </nav>
        </div>
      </header>
      <main id="top">
        <section className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:pb-32 lg:pt-28">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 border border-[#c9f269]/30 bg-[#c9f269]/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#c9f269]">
              <Sparkles className="size-3.5" />
              Link sharing, made lighter
            </div>
            <h1 className="max-w-3xl text-6xl font-semibold leading-[0.94] tracking-[-0.065em] text-[#f4f3ec] sm:text-7xl lg:text-[6.5rem]">
              Give your links a shorter story.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/60 sm:text-xl">
              Shortly turns long, forgettable URLs into sharp little signposts. Share with confidence, then see what happens next.
            </p>
            <div className="mt-10 max-w-2xl border border-white/15 bg-white/[0.04] p-2 shadow-2xl shadow-black/20 sm:flex sm:items-center">
              <Input
                aria-label="URL to shorten"
                className="h-12 border-0 bg-transparent px-4 text-base text-white placeholder:text-white/35 focus-visible:ring-0"
                placeholder="Paste a long URL to get started"
                type="url"
              />
              <SignUpButton>
                <Button className="mt-2 h-12 w-full shrink-0 bg-[#c9f269] px-5 text-[#101313] hover:bg-[#d8fa87] sm:mt-0 sm:w-auto">
                  Shorten link <ArrowUpRight />
                </Button>
              </SignUpButton>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-white/40">
              <ShieldCheck className="size-3.5 text-[#c9f269]" />
              Free to start. No credit card required.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
            <div className="absolute -right-10 -top-10 size-44 rounded-full border border-[#c9f269]/20" />
            <div className="absolute -bottom-8 -left-8 size-28 rounded-full bg-[#d96b4a]/15 blur-2xl" />
            <div className="relative border border-white/15 bg-[#1b2020] p-5 shadow-2xl shadow-black/40 sm:p-7">
              <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/40">Your workspace</p>
                  <p className="mt-2 text-xl font-medium">Link overview</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-full bg-[#c9f269] text-[#101313]">
                  <Zap className="size-4" fill="currentColor" />
                </div>
              </div>
              <div className="space-y-3">
                {[
                  ["shortly.to/launch", "12,482 clicks", "Today"],
                  ["shortly.to/notes", "4,208 clicks", "Yesterday"],
                  ["shortly.to/brief", "2,946 clicks", "Mon"],
                ].map(([link, clicks, date], index) => (
                  <div className="flex items-center gap-3 border border-white/10 bg-white/[0.03] p-3.5" key={link}>
                    <div className={`flex size-9 items-center justify-center ${index === 0 ? "bg-[#c9f269] text-[#101313]" : "bg-white/10 text-white/60"}`}>
                      <Link2 className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{link}</p>
                      <p className="mt-1 text-xs text-white/40">{date}</p>
                    </div>
                    <p className="text-right text-xs font-medium text-[#c9f269]">{clicks}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-end justify-between border-t border-white/10 pt-5">
                <div>
                  <p className="text-xs text-white/40">Total clicks</p>
                  <p className="mt-1 text-3xl font-semibold tracking-[-0.05em]">19,636</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#c9f269]"><MousePointer2 className="size-3.5" /> 18.4% this week</div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#171b1b]">
          <div className="mx-auto grid max-w-7xl gap-px px-6 lg:grid-cols-3 lg:px-10">
            {features.map(({ icon: Icon, title, description }) => (
              <article className="border-white/10 py-10 lg:border-r lg:px-10 lg:py-14 first:lg:pl-0 last:lg:border-r-0" key={title}>
                <Icon className="size-5 text-[#c9f269]" />
                <h2 className="mt-6 text-xl font-medium tracking-[-0.03em]">{title}</h2>
                <p className="mt-3 max-w-xs text-sm leading-6 text-white/50">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9f269]">A better little ritual</p>
              <h2 className="mt-5 max-w-md text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">From long link to done in three moves.</h2>
            </div>
            <div className="grid gap-0 border-t border-white/15">
              {steps.map((step) => (
                <div className="grid grid-cols-[4rem_1fr] gap-5 border-b border-white/15 py-7 sm:grid-cols-[5rem_1fr] sm:gap-8" key={step.number}>
                  <span className="text-sm text-[#d96b4a]">{step.number}</span>
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <h3 className="text-2xl font-medium tracking-[-0.04em]">{step.title}</h3>
                    <p className="mt-2 text-sm text-white/45 sm:mt-0">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#c9f269] text-[#101313]">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 sm:flex-row sm:items-center sm:justify-between lg:px-10 lg:py-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#101313]/60">Ready when you are</p>
              <h2 className="mt-3 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">Make your next link the easy one.</h2>
            </div>
            <SignUpButton>
              <Button className="h-12 shrink-0 bg-[#101313] px-6 text-[#f4f3ec] hover:bg-[#28302d]">Create free account <Check /></Button>
            </SignUpButton>
          </div>
        </section>
      </main>
      <footer className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 text-xs text-white/35 lg:px-10">
        <span className="font-medium text-white/60">shortly</span>
        <span>Simple links. More signal.</span>
      </footer>
    </div>
  );
}
