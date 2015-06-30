import colors from "styles/colors";

const commonStyles = new Map();

commonStyles.set("link", {
  color: colors.get("tint"),

  ":hover": {
    color: colors.get("tintAction")
  }
});

export default commonStyles;
