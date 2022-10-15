const { build } = require("esbuild");
const path = require("path");
const configCommon = {
  entryPoints: ["./index.tsx"],
  bundle: true,
  minify: true,
  loader: {
    ".gif": "dataurl",
    ".svg": "dataurl",
    ".png": "dataurl",
    ".jpg": "dataurl",
    ".jpge": "dataurl",
    ".js": "jsx",
    ".woff": "dataurl",
    ".woff2": "dataurl",
    ".eot": "dataurl",
    ".ttf": "dataurl",
  },
};

build({
  ...configCommon,
  outfile: "public/static/node/bundle.js",
  target: "node16",
  platform: "node",
}).catch((err) => {
  console.error(err);
  process.exit(1);
});

build({
  ...configCommon,
  outfile: "public/static/bundle.js",
  target: ["es2020", "chrome58", "firefox57", "node12", "safari11"],
  platform: "browser",
  inject: [path.resolve(__dirname, "./react-shim.ts")], // auto import react per file
  watch: true,
})
  .then(async () => {
    const servor = require("servor");
    const open = require("open");

    console.log("Initializing server...");

    const { root, protocol, port, ips, url } = await servor({
      root: "./public",
      fallback: "index.html",
      module: false,
      static: true,
      reload: true,
      inject: "",
      credentials: null,
      port: 3000,
    });

    console.clear();
    console.log(`
    📡 Serving:\t${url}\n
    🔗 Local:\t${url}
    ${ips.map((ip) => `🌐 Network:\t${protocol}://${ip}:${port}`).join("\n  ")}
    `);

    open(url);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
