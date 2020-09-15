export const user = {
  id: "MENU_USER",
  path: "",
  isPublic: false,
  icon: "PersonIcon",
  text: "Users",
  child: [
    {
      id: "MENU_USER_CREATE",
      path: "/userLogin/create",
      isPublic: false,
      icon: "StarBorder",
      text: "Create new user",
      child: [],
    },
    {
      id: "MENU_USER_LIST",
      path: "/userLogin/list",
      isPublic: false,
      icon: "StarBorder",
      text: "User list",
      child: [],
    },
    {
      id: "MENU_USER_APPROVE_REGISTRATION",
      path: "/user-group/user/approve-register",
      isPublic: false,
      icon: "StarBorder",
      text: "Approve user",
      child: [],
    },
  ],
};
