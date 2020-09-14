// const order = {
//   id: "MENU_ORDER",
//   path: "",
//   isPublic: false,
//   icon: "DescriptionOutlinedIcon",
//   text: "Đơn hàng",
//   child: [
//     {
//       id: "MENU_ORDER_CREATE",
//       path: "/orders/create",
//       isPublic: false,
//       icon: "StarBorder",
//       text: "Tạo mới",
//       child: [],
//     },
//     {
//       id: "MENU_ORDER_LIST",
//       path: "/orders/list",
//       isPublic: false,
//       icon: "StarBorder",
//       text: "DS Đơn Hàng",
//       child: [],
//     },
//   ],
// };
//
// const user = {
//   id: "MENU_USER",
//   path: "",
//   isPublic: false,
//   icon: "PersonIcon",
//   text: "Tài khoản",
//   child: [
//     {
//       id: "MENU_USER_CREATE",
//       path: "/userlogin/create",
//       isPublic: false,
//       icon: "StarBorder",
//       text: "Tạo mới",
//       child: [],
//     },
//     {
//       id: "MENU_USER_LIST",
//       path: "/userlogin/list",
//       isPublic: false,
//       icon: "StarBorder",
//       text: "Danh sách",
//       child: [
//         {
//           id: "MENU_USER_LIST2",
//           path: "/userlogin/list2",
//           isPublic: false,
//           icon: "StarBorder2",
//           text: "Danh sách2",
//           child: [],
//         },
//         {
//           id: "MENU_USER_LIST3",
//           path: "/userlogin/list3",
//           isPublic: false,
//           icon: "StarBorder3",
//           text: "Danh sách3",
//           child: [],
//         },
//       ],
//     },
//     {
//       id: "MENU_USER_APPROVE_REGISTRATION",
//       path: "/user-group/user/approve-register",
//       isPublic: false,
//       icon: "StarBorder",
//       text: "Phê duyệt",
//       child: [],
//     },
//   ],
// };
//
// function buildMapPathMenu(menuConfig) {
//   let listMenu = [];
//
//   console.log("list menu");
//   for (let i = 0; i < menuConfig.length; i++) {
//     listMenu.push(...buildFromItem(menuConfig[i]));
//   }
//   console.log(listMenu);
//
//   let map = new Map();
//   for (let i = 0; i < listMenu.length; i++) {
//     let menu = listMenu[i];
//     map.set(menu.path, menu);
//   }
//
//   return map;
// }
//
// function buildFromItem(config) {
//   console.log(config);
//   console.log("\n----------\n");
//   let res = [];
//
//   if (config.path !== "" && config.path !== undefined && config.path !== null) {
//     res.push(config);
//   }
//
//   if (
//     config.child !== null &&
//     config.child !== undefined &&
//     config.child.length > 0
//   ) {
//     let parent = Object.assign({}, config);
//
//     parent["child"] = null;
//     let childs = config.child;
//
//     for (let i = 0; i < childs.length; i++) {
//       let menu = childs[i];
//       menu["parent"] = parent;
//
//       res.push(...buildFromItem(menu));
//     }
//   }
//
//   return res;
// }
//
// const MENU_LIST = [];
// MENU_LIST.push(user);
// MENU_LIST.push(order);
//
// const mapPathMenu = buildMapPathMenu(MENU_LIST);
// console.log("\n---------------------result------------------------------\n");
// console.log(mapPathMenu);
