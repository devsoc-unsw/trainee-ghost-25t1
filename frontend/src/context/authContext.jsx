import { createContext } from "react";

// NOTE to people using this: We can do user.team_id to determine if the user
// is on a team. It will be null if they are not
export const AuthContext = createContext({
  user: null,
  loading: true,
  refetchUser: async () => {},
});
