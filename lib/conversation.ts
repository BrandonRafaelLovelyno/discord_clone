import prismadb from "./orm/prismadb";

async function findConversation(memberOneId: string, memberTwoId: string) {
  try {
    const conversation = await prismadb.conversation.findFirst({
      where: {
        AND: [{ memberOneId }, { memberTwoId }],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
    if (!conversation) {
      throw new Error();
    }
    return conversation;
  } catch (err) {
    return null;
  }
}

export async function getOrCreateConversation(
  memberOneId: string,
  memberTwoId: string
) {
  let conversation =
    (await findConversation(memberOneId, memberTwoId)) ||
    (await findConversation(memberTwoId, memberOneId));

  if (!conversation) {
    conversation = await createNewConversation(memberOneId, memberTwoId);
  }
  return conversation;
}

async function createNewConversation(memberOneId: string, memberTwoId: string) {
  const conversation = await prismadb.conversation.create({
    data: {
      memberOneId,
      memberTwoId,
    },
    include: {
      memberOne: {
        include: {
          profile: true,
        },
      },
      memberTwo: {
        include: {
          profile: true,
        },
      },
    },
  });
  return conversation;
}
