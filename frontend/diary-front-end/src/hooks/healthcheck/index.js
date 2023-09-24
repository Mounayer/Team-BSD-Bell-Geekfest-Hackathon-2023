import { getUser } from "@/src/auth";

/**
 *
 * Simple health check to verify server is running
 */
export default async function healthCheck() {
  try {
    const { idToken } = await getUser();

    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_API_URL}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    const res = await response.text();

    console.log(`Received: ${res}`);

    // You might also want to check the response status or handle the response data
    if (response.ok && res != null) {
      return res;
    } else {
      return null; // or handle the error based on response status or data
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}
