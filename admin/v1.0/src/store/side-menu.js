const state = () => {
  return {
    menu: [
      {
        icon: "UserIcon",
        pageName: "Artist",
        title: "Artist",
      },
      // {
      //   icon: "UserIcon",
      //   pageName: "Collector",
      //   title: "Collector",
      // },
      {
        icon: "UserIcon",
        pageName: "Customer",
        title: "Customer",
      },

      // {
      //   icon: "BoxIcon",
      //   pageName: "Product",
      //   title: "Product",
      //   subMenu: [
      //     {
      //       icon: "BoxIcon",
      //       pageName: "ProductAdd",
      //       title: "Regist",
      //     },
      //     {
      //       icon: "BoxIcon",
      //       pageName: "Product",
      //       title: "List",
      //     },
      //   ],
      // },

      {
        icon: "ImageIcon",
        pageName: "Product",
        title: "Product",
      },

      {
        icon: "FileTextIcon",
        pageName: "Order",
        title: "Order",
      },
      {
        icon: "DollarSignIcon",
        pageName: "Bids",
        title: "Bids",
      },
      // {
      //   icon: "BoxIcon",
      //   pageName: "CMSCarousel",
      //   title: "CMS",
      //   subMenu: [
      //     {
      //       icon: "BoxIcon",
      //       pageName: "CMSSlide",
      //       title: "Slide",
      //     },
      //     {
      //       icon: "BoxIcon",
      //       pageName: "CMSTetris",
      //       title: "Tetris",
      //     },
      //     {
      //       icon: "BoxIcon",
      //       pageName: "CMSCarousel",
      //       title: "Carousel",
      //     },
      //   ],
      // },
      {
        icon: "LinkIcon",
        pageName: "System",
        title: "Chain & Contract",
        subMenu: [
          {
            icon: "FileTextIcon",
            pageName: "Asset",
            title: "Asset",
          },
          {
            icon: "LinkIcon",
            pageName: "Blockchain",
            title: "Blockchain",
          },
          {
            icon: "FileTextIcon",
            pageName: "Contract",
            title: "Contract",
          },
        ],
      },
      {
        icon: "SettingsIcon",
        pageName: "",
        title: "Setting",
        subMenu: [
          {
            icon: "BoxIcon",
            pageName: "Admin",
            title: "Admin Management",
          },
        ],
      },
    ],
  };
};

// getters
const getters = {
  menu: (state) => state.menu,
};

// actions
const actions = {};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
