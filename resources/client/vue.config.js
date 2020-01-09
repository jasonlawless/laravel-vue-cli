module.exports = {
    // ****** Laravel Vue Cli Configuration ****** //
        /** Super important that this block is NOT altered or removed. Customize this ONLY if you know what you're doing! **/
    devServer: {
        proxy: 'http://localhost:8000'
    },
    outputDir: "../../public/assets/app",
    publicPath: process.env.NODE_ENV === "production" ? "/assets/app" : "/",
    indexPath: process.env.NODE_ENV === "production" ? "../../../resources/views/app.blade.php" : "index.html"
    // ****** END: Laravel Vue Cli Configuration ****** //
};
