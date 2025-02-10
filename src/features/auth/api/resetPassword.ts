import { postRequest } from "../../../../libs/lib-sync-wise-utils";

export type ResetPasswordDto = {
  password: string;
  hash: string;
};

export async function resetPassword(data: ResetPasswordDto) {
  const res = await postRequest({
    url: "persons/reset-password",
    data: data,
  });
  return res.status === 200 || res.status === 201;
}
