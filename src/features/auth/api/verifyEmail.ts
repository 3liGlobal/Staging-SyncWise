import { postRequest } from "../../../../libs/lib-sync-wise-utils";

export type VerifyEmailDto = {
  id: string;
  hash: string;
};

export async function verifyEmail(data: VerifyEmailDto) {
  return await postRequest({
    url: "persons/verify-account",
    data: data,
  });
}
