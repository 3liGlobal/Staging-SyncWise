import { getRequest } from "../../../../libs/lib-sync-wise-utils";
import { Profile } from "../types";

export async function getProfile(): Promise<Profile> {
  return await getRequest({
    url: "persons/profile",
    useAuth: true,
  });
}
