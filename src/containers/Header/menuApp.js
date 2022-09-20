export const adminMenu = [
  {
    //quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
        // subMenus: [
        //   {
        //     name: "menu.system.system-administrator.user-manage",
        //     link: "/system/user-manage",
        //   },
        //   {
        //     name: "menu.system.system-administrator.user-redux",
        //     link: "/system/user-redux",
        //   },
        // ],
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/user-doctor",
      },
      {
        name: "menu.admin.manage-admin",
        link: "/system/user-admin",
      },

      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ],
  },
  {
    // quan ly phong kham
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/user-clinic",
      },
    ],
  },
  {
    // quan ly chuyen khoa
    name: "menu.admin.speciality",
    menus: [
      {
        name: "menu.admin.manage-speciality",
        link: "/system/manage-speciality",
      },
    ],
  },
  {
    // quan ly cam nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];
