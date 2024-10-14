import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function UserSessionProvider() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  console.log("User data:", user);
  return user;
}

// To properly execute the async function:
UserSessionProvider()
  .then(user => {
    console.log("User session retrieved:", user);
  })
  .catch(error => {
    console.error("Error retrieving user session:", error);
  });