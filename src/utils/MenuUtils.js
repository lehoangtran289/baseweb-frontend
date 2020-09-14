export function buildMapPathMenu(menuConfig) {
  let listMenu = [];

  // console.log("list menu");
  for (let i = 0; i < menuConfig.length; i++) {
    listMenu.push(...buildFromItem(menuConfig[i]));
  }
  // console.log(listMenu);

  let map = new Map();
  for (let i = 0; i < listMenu.length; i++) {
    let menu = listMenu[i];
    map.set(menu.path, menu);
  }

  return map;
}

function buildFromItem(config) {
  // console.log(config);
  // console.log("\n----------\n");
  let res = [];

  if (config.path !== "" && config.path !== undefined && config.path !== null) {
    res.push(config);
  }

  if (
    config.child !== null &&
    config.child !== undefined &&
    config.child.length > 0
  ) {
    let parent = Object.assign({}, config);

    parent["child"] = null;
    let childs = config.child;

    for (let i = 0; i < childs.length; i++) {
      let menu = childs[i];
      menu["parent"] = parent;

      res.push(...buildFromItem(menu));
    }
  }

  return res;
}
