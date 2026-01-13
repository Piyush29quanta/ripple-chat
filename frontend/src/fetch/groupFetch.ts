import { CHAT_GROUP_URL, CHAT_GROUP_USERS } from "@/lib/apiEndPoints";

export async function fetchGroupChats(token: string) {
  const res = await fetch(CHAT_GROUP_URL, {
    headers: {
      Authorization: token,
    },
    next: {
      revalidate: 60 * 60,
      tags: ["dashboard"],
    },
  });
  if (!res.ok) {
    throw new Error("An error occurred while fetching the group chats");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return [];
}

export async function fetchGroupChat(id: string) {
  const res = await fetch(`${CHAT_GROUP_URL}/${id}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("An error occurred while fetching the group chats");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return null;
}

export async function fetchGroupChatUsers(id: string) {
  console.log(`Fetching: ${CHAT_GROUP_USERS}?group_id=${id}`);

  const res = await fetch(`${CHAT_GROUP_USERS}?group_id=${id}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return [];
}
