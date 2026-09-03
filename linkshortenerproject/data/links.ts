import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { links } from "@/db/schema";

export async function getLinksForUser(userId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));
}

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);

  return link;
}

function generateShortCode() {
  return crypto.randomUUID().replaceAll("-", "").slice(0, 8);
}

export async function createLinkForUser(userId: string, originalUrl: string) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const [link] = await db
        .insert(links)
        .values({ userId, originalUrl, shortCode: generateShortCode() })
        .returning();

      return link;
    } catch (error) {
      if (attempt === 2) {
        throw error;
      }
    }
  }

  throw new Error("Unable to create link");
}

export async function updateLinkForUser(userId: string, linkId: string, originalUrl: string) {
  const [link] = await db
    .update(links)
    .set({ originalUrl })
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning();

  if (!link) {
    throw new Error("Link not found");
  }

  return link;
}

export async function deleteLinkForUser(userId: string, linkId: string) {
  const [link] = await db
    .delete(links)
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning({ id: links.id });

  if (!link) {
    throw new Error("Link not found");
  }
}
