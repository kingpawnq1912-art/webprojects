"use client";

import { useState } from "react";
import { ArrowUpRight, LoaderCircle, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createLink } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function CreateLinkDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsPending(true);

    const result = await createLink({ originalUrl });

    setIsPending(false);
    if (!result.success) {
      setError(result.error);
      return;
    }

    setOriginalUrl("");
    setOpen(false);
    router.refresh();
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setError("");
      setOriginalUrl("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button className="bg-[#c9f269] text-[#101313] hover:bg-[#d8fa87]" />}>
        <Plus />
        Create link
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a short link</DialogTitle>
          <DialogDescription>Paste the destination URL and we will give you a cleaner link to share.</DialogDescription>
        </DialogHeader>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="original-url">Destination URL</label>
            <Input
              autoFocus
              className="h-11 border-white/15 bg-white/[0.04] text-white placeholder:text-white/30"
              id="original-url"
              onChange={(event) => setOriginalUrl(event.target.value)}
              placeholder="https://example.com/your-page"
              type="url"
              value={originalUrl}
            />
            {error ? <p className="text-sm text-[#f08b70]" role="alert">{error}</p> : null}
          </div>
          <div className="flex justify-end gap-3">
            <DialogClose render={<Button type="button" variant="ghost" className="text-white/60 hover:bg-white/10 hover:text-white" />}>Cancel</DialogClose>
            <Button disabled={isPending || !originalUrl.trim()} type="submit" className="bg-[#c9f269] text-[#101313] hover:bg-[#d8fa87]">
              {isPending ? <LoaderCircle className="animate-spin" /> : <ArrowUpRight />}
              {isPending ? "Creating..." : "Create link"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}