"use client";

import { useState } from "react";
import { Check, LoaderCircle, Pencil, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteLink, updateLink } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type LinkActionsProps = {
  linkId: string;
  originalUrl: string;
};

export function LinkActions({ linkId, originalUrl }: LinkActionsProps) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [url, setUrl] = useState(originalUrl);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleEdit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsPending(true);

    const result = await updateLink({ linkId, originalUrl: url });

    setIsPending(false);
    if (!result.success) {
      setError(result.error);
      return;
    }

    setEditOpen(false);
    router.refresh();
  }

  async function handleDelete() {
    setError("");
    setIsPending(true);

    const result = await deleteLink({ linkId });

    setIsPending(false);
    if (!result.success) {
      setError(result.error);
      return;
    }

    setDeleteOpen(false);
    router.refresh();
  }

  function openEdit() {
    setUrl(originalUrl);
    setError("");
    setEditOpen(true);
  }

  function handleEditOpenChange(open: boolean) {
    setEditOpen(open);
    if (!open) {
      setError("");
      setIsPending(false);
    }
  }

  function handleDeleteOpenChange(open: boolean) {
    setDeleteOpen(open);
    if (!open) {
      setError("");
      setIsPending(false);
    }
  }

  return (
    <div className="flex items-center gap-2 sm:justify-end">
      <Button aria-label="Edit link" onClick={openEdit} size="icon-sm" title="Edit link" variant="ghost" className="text-white/50 hover:bg-white/10 hover:text-white">
        <Pencil />
      </Button>
      <Button aria-label="Delete link" onClick={() => setDeleteOpen(true)} size="icon-sm" title="Delete link" variant="ghost" className="text-white/50 hover:bg-[#f08b70]/10 hover:text-[#f08b70]">
        <Trash2 />
      </Button>

      <Dialog open={editOpen} onOpenChange={handleEditOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit your short link</DialogTitle>
            <DialogDescription>Update the destination URL for this short link.</DialogDescription>
          </DialogHeader>
          <form className="space-y-5" onSubmit={handleEdit}>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor={`edit-url-${linkId}`}>Destination URL</label>
              <Input autoFocus className="h-11 border-white/15 bg-white/[0.04] text-white placeholder:text-white/30" id={`edit-url-${linkId}`} onChange={(event) => setUrl(event.target.value)} type="url" value={url} />
              {error ? <p className="text-sm text-[#f08b70]" role="alert">{error}</p> : null}
            </div>
            <div className="flex justify-end gap-3">
              <DialogClose render={<Button type="button" variant="ghost" className="text-white/60 hover:bg-white/10 hover:text-white" />}>Cancel</DialogClose>
              <Button disabled={isPending || !url.trim()} type="submit" className="bg-[#c9f269] text-[#101313] hover:bg-[#d8fa87]">
                {isPending ? <LoaderCircle className="animate-spin" /> : <Check />}
                {isPending ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={handleDeleteOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this short link?</DialogTitle>
            <DialogDescription>This action cannot be undone. The short link will stop working immediately.</DialogDescription>
          </DialogHeader>
          {error ? <p className="text-sm text-[#f08b70]" role="alert">{error}</p> : null}
          <div className="flex justify-end gap-3">
            <DialogClose render={<Button type="button" variant="ghost" className="text-white/60 hover:bg-white/10 hover:text-white" />}>Keep link</DialogClose>
            <Button disabled={isPending} onClick={handleDelete} variant="destructive">
              {isPending ? <LoaderCircle className="animate-spin" /> : <Trash2 />}
              {isPending ? "Deleting..." : "Delete link"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}