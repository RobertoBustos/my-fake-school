/**
 *
 * THIS CONFIG IS NEEDED BECAUSE THIS PROYECT WAS CREATED USING THE CREATE REACT APP TOOL
 * AND IN ORDER TO OVERRIDE THE WEBPACK CONFIG NORMALLY WE NEED TO EJECT OUR PROYECT
 * BUT ONCE EJECTED ALL THE CONFIGURATION WILL BE MANAGED BY THE USER AND CRACO PACKAGE
 * ALLOW TO OVERRIDE THE WEBPACK CONFIG WITHOUT EJECTING
 *
 */

const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@config": path.resolve(__dirname, "src/config"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@styles": path.resolve(__dirname, "src/css"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@actions": path.resolve(__dirname, "src/redux/actions"),
      "@reducers": path.resolve(__dirname, "src/redux/reducers"),
      "@selectors": path.resolve(__dirname, "src/redux/selectors"),
      "@router": path.resolve(__dirname, "src/router"),
      "@services": path.resolve(__dirname, "src/services"),
      "@customTypes": path.resolve(__dirname, "src/types"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
};
