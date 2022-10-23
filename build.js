const { build } = require("esbuild");
const path = require("path");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const postcssPresetEnv = require("postcss-preset-env");
const { sassPlugin } = require("esbuild-sass-plugin");
const { ESLint } = require("eslint");

const eslint = () => ({
  name: "eslint",
  setup(build) {
    let codeResult = "";
    const eslint = new ESLint({
      cwd: path.resolve(__dirname, "./"),
    });

    build.onStart(() => {
      codeResult = "";
      console.clear();
      console.log("Checking your code...");
    });

    build.onEnd(() => {
      console.clear();
      console.log(codeResult);
    });

    build.onLoad({ filter: /\.(tsx?|jsx?)$/ }, async ({ path: ruta }) => {
      if (ruta.includes(path.resolve(__dirname, "node_modules"))) return;
      try {
        const result = await eslint.lintFiles(ruta);
        const formatter = await eslint.loadFormatter("stylish");
        const output = formatter.format(result);
        if (output.length > 0) {
          codeResult += output + "\n";
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
});

const configCommon = {
  entryPoints: ["./index.tsx"],
  bundle: true,
  minify: true,
  sourcemap: false,
  incremental: true,
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
  plugins: [
    sassPlugin({
      async transform(source) {
        const { css } = await postcss([
          autoprefixer,
          postcssPresetEnv({ stage: 0 }),
        ]).process(source, { from: undefined });
        return css;
      },
    }),
    eslint(),
  ],
};

// build({
//   ...configCommon,
//   outfile: "public/static/node/bundle.js",
//   target: "node16",
//   platform: "node",
// }).catch((err) => {
//   console.error(err);
//   process.exit(1);
// });

build({
  ...configCommon,
  outfile: "public/static/bundle.js",
  target: ["es2020", "chrome58", "firefox57", "node12", "safari11"],
  platform: "browser",
  inject: [path.resolve(__dirname, "./react-shim.ts")],
  watch: true,
})
  .then(async () => {
    const servor = require("servor");
    const open = require("open");

    console.log("Initializing server...");

    const { protocol, port, ips, url } = await servor({
      root: "./public",
      fallback: "index.html",
      module: false,
      static: true,
      reload: true,
      inject: "",
      credentials: null,
      port: 3000,
    });

    console.log(`
    - Serving:\t${url}\n
    - Local:\t${url}
    ${ips.map((ip) => `+ Network:\t${protocol}://${ip}:${port}`).join("\n  ")}
    `);

    open(url);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
