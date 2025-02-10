import { postRequest } from "../../../../libs/lib-sync-wise-utils";

export type ForgotPasswordDto = {
  email: string;
};

export async function forgotPassword(data: ForgotPasswordDto) {
  const res = await postRequest({
    url: "persons/forgot-password",
    data: data,
  });
  return res.status === 200 || res.status === 201;
}
