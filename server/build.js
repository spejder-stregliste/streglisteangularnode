require("esbuild").build({
    entryPoints: [ './src/index.js' ],
    outfile: './dist/index.js',
    platform: 'node',
    bundle: true,
    minify: true,
    target: "node24",
})
.then(() => console.log("⚡ Done"))