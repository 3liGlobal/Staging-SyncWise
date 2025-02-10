import { postRequest } from "../../../../libs/lib-sync-wise-utils";

export async function resendEmail() {
  return await postRequest({
    url: "persons/resend-verification-email",
    data: {},
    useAuth: true,
  });
}
