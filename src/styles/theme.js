const colors = {
  light1: "#FFFFFF",
  light2: "#F0F0F0",
  lightGray: "#808080",
  gray: "#404040",
  dark: "#000000",

  textLight: "#FFFFFFE0",
  textMedium: "#FFFFFF60",
  textGray: "#909090",
  textDark: "#000000",

  backgroundActive: "#FFFFFFFF",
  backgroundInactive: "rgba(0, 0, 0, 0.4)",

  red: "#BD0909",
  green: "#38B700",
  blue: "#0094FF",

  lightActive: "#ECC344",
  fanActive: "blue",
};

export const theme = {
  colors: colors,
  card: {
    size: "138px",
    borderRadius: "16px",
    background: {
      colorActive: colors.backgroundActive,
      colorInactive: colors.backgroundInactive,
    },
    name: {
      size: "15px",
      weight: 600,
      colorActive: colors.textDark,
      colorInactive: "rgba(255, 255, 255, 0.4)",
    },
    state: {
      size: "15px",
      weight: 600,
      colorActive: colors.textGray,
      colorInactive: colors.textGray,
    },
    light: {
      colorActive: colors.lightActive,
      colorInactive: colors.textMedium,
    },
    fan: {
      colorActive: colors.fanActive,
      colorActive: colors.textMedium,
    },
  },
  cameraCard: {
    width: "396px",
    height: "240px",
  },
  sceneCard: {
    width: "206px",
    height: "48px",
    name: {
      size: "14px",
      weight: 600,
    },
  },
  badgeCount: {
    color: colors.red,
  },
  title: {
    size: "22px",
    weight: 600,
    color: colors.textLight,
  },
  modal: {
    background: colors.backgroundActive,
    header: {
      title: {
        size: "12px",
        weight: "bold",
        color: colors.dark,
      },
      subtitle: {
        size: "12px",
        weight: "bold",
        color: colors.lightGray,
      },
    },
  },
};
