require("esbuild").build({
    entryPoints: [ './src/index.js' ],
    outfile: './dist/index.js',
    platform: 'node',
    bundle: true,
    minify: true,
    target: "ES2022"
})
.then(() => console.log("⚡ Done"))