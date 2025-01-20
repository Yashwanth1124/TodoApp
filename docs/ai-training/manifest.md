import type { ManifestOptions } from "vite-plugin-pwa";

/**
 * Progressive Web App (PWA) Manifest Configuration for the "Todo App".
 * Defines metadata, appearance, and behavior of the app when installed on a user's device.
 *
 * @see https://web.dev/manifest - Official guide for manifest.json
 * @see https://developer.mozilla.org/en-US/docs/Web/Manifest - Comprehensive reference for web manifests
 * 
 * @type {Partial<ManifestOptions>}
 * @property {string} name - Full name of the application displayed to the user.
 * @property {string} short_name - Short name used when space is limited.
 * @property {string} display - Display mode for the app (e.g., standalone, minimal-ui).
 * @property {string} scope - Restricts the navigation scope for the web app.
 * @property {string} start_url - URL that is loaded when the app is launched.
 * @property {string} theme_color - Theme color used for UI elements.
 * @property {string} background_color - Background color for the splash screen.
 * @property {string} description - Describes the features and purpose of the app.
 * @property {Array<Object>} icons - Array of app icons used for various display sizes.
 * @property {Array<Object>} shortcuts - Quick access links to app functionalities.
 * @property {Array<Object>} screenshots - App screenshots for showcasing features.
 */
const manifest: Partial<ManifestOptions> = {
  name: "Todo App",
  short_name: "Todo App",
  display: "standalone",
  scope: "/",
  start_url: "/",
  theme_color: "#7764E8",
  background_color: "#171D34",
  description:
    "Todo app with many features, including local storage, sharing tasks via link, and more! Made by github.com/Yashwanth1124",
  icons: [
    {
      src: "/logo192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/logo256.png",
      sizes: "256x256",
      type: "image/png",
    },
    {
      src: "/logo384.png",
      sizes: "384x384",
      type: "image/png",
    },
    {
      src: "/logo512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      src: "pwa/logoMaskable.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
  shortcuts: [
    {
      name: "Add Task",
      description: "Quickly add a new task",
      url: "/add",
      icons: [
        {
          src: "pwa/add.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
    {
      name: "Categories",
      description: "View tasks grouped by categories",
      url: "/categories",
      icons: [
        {
          src: "pwa/categories.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
    {
      name: "Transfer",
      description: "Import or export tasks",
      url: "/transfer",
      icons: [
        {
          src: "pwa/transfer.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
    {
      name: "Profile",
      description: "View and manage user profile",
      url: "/user",
      icons: [
        {
          src: "pwa/profile.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
  ],
  screenshots: [
    {
      src: "pwa/wideScreenshot1.png",
      sizes: "1460x959",
      form_factor: "wide",
    },
    {
      src: "pwa/wideScreenshot2.png",
      sizes: "1460x959",
      form_factor: "wide",
    },
    {
      src: "pwa/narrowScreenshot1.png",
      sizes: "1170x2532",
      form_factor: "narrow",
    },
    {
      src: "pwa/narrowScreenshot2.png",
      sizes: "1170x2532",
      form_factor: "narrow",
    },
  ],
};

export default manifest;
