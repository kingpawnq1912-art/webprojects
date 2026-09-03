"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createLinkForUser, deleteLinkForUser, updateLinkForUser } from "@/data/links";

const createLinkSchema = z.object({
  originalUrl: z.url("Enter a valid URL, including https://").max(2048),
});

const linkIdSchema = z.uuid("That link is no longer available.");

export type CreateLinkResult =
  | { success: true; shortCode: string }
  | { success: false; error: string };

export async function createLink(input: { originalUrl: string }): Promise<CreateLinkResult> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in to create a link." };
  }

  const result = createLinkSchema.safeParse(input);

  if (!result.success) {
    return { success: false, error: result.error.issues[0]?.message ?? "Enter a valid URL." };
  }

  try {
    const link = await createLinkForUser(userId, result.data.originalUrl);
    revalidatePath("/dashboard");
    return { success: true, shortCode: link.shortCode };
  } catch {
    return { success: false, error: "We could not create that link. Please try again." };
  }
}

export type UpdateLinkResult =
  | { success: true }
  | { success: false; error: string };

export async function updateLink(input: { linkId: string; originalUrl: string }): Promise<UpdateLinkResult> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in to edit a link." };
  }

  const idResult = linkIdSchema.safeParse(input.linkId);
  const urlResult = createLinkSchema.safeParse({ originalUrl: input.originalUrl });

  if (!idResult.success) {
    return { success: false, error: "That link is no longer available." };
  }

  if (!urlResult.success) {
    return { success: false, error: urlResult.error.issues[0]?.message ?? "Enter a valid URL." };
  }

  try {
    await updateLinkForUser(userId, idResult.data, urlResult.data.originalUrl);
    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return { success: false, error: "We could not update that link. Please try again." };
  }
}

export type DeleteLinkResult =
  | { success: true }
  | { success: false; error: string };

export async function deleteLink(input: { linkId: string }): Promise<DeleteLinkResult> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in to delete a link." };
  }

  const result = linkIdSchema.safeParse(input.linkId);

  if (!result.success) {
    return { success: false, error: "That link is no longer available." };
  }

  try {
    await deleteLinkForUser(userId, result.data);
    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return { success: false, error: "We could not delete that link. Please try again." };
  }
}