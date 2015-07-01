import Color from 'color';

const white = "white";
const black = "black";
const tint = "#e43a2c";
const notification = "#fffccc";

const colors = new Map();

// Base
colors.set("white", Color(white));
colors.set("black", Color(black));

// Tint
colors.set("tint", Color(tint));
colors.set("tintAlt", Color(tint).darken(0.5));
colors.set("tintAction", Color(tint).darken(0.2));

// Background
colors.set("background", Color(white).darken(0.05));

// Text
colors.set("text", Color(white).darken(0.4));
colors.set("textPronounced", Color(white).darken(0.7));
colors.set("textUnpronounced", Color(white).darken(0.25));

// Divider
colors.set("divider", Color(black).alpha(0.05));

// Shadow
colors.set("shadow", Color(black).alpha(0.1));

// Notification
colors.set("notificationBackground", Color(notification));
colors.set("notificationText", Color(notification).darken(0.8));
colors.set("notificationTextAlt", Color(notification).darken(0.55));

colors.forEach(function(value, key) {
  colors.set(key, value.rgbString());
});

export default colors;
