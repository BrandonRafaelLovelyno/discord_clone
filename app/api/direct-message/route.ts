import prismadb from "@/lib/orm/prismadb";
import { id } from "date-fns/locale";
import { NextResponse } from "next/server";

const DIRECT_MESSAGE_BATCH = 10;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const conversationId = url.searchParams.get("conversationId");
    const cursor = url.searchParams.get("cursor");
    if (!conversationId || !cursor) {
      throw new Error("Missing fields");
    }
    let direct_messages;
    if (cursor !== "-1") {
      direct_messages = await prismadb.directMessage.findMany({
        where: {
          conversationId: conversationId,
        },
        take: DIRECT_MESSAGE_BATCH,
        cursor: {
          id: cursor,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        skip: 0,
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      direct_messages = await prismadb.directMessage.findMany({
        where: {
          conversationId: conversationId,
        },
        take: DIRECT_MESSAGE_BATCH,
        skip: 1,
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }
    let nextCursor = null;
    if (direct_messages.length == DIRECT_MESSAGE_BATCH) {
      nextCursor = direct_messages[DIRECT_MESSAGE_BATCH - 1].id;
    }
    return NextResponse.json({
      success: true,
      message: "",
      data: {
        messages: direct_messages,
        nextCursor: nextCursor,
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: (err as Error).message,
        data: {},
      },
      { status: 400 }
    );
  }
}
