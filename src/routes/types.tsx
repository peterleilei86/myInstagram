export type AuthStackList = {
  Auth: undefined;
};

export type AuthenticatedStackList = {
  Home: { token: string };
  Search: undefined;
  Add: undefined;
  Activity: undefined;
  Profile: undefined;
};

export type HomeStackList = {
  Home: { token: string };
};
