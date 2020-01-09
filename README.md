<p align="center"><img src="https://i.ibb.co/jgwD0Fh/laravel-vue-cli.png" width="400"></p>

<p align="center">
<img src="https://img.shields.io/badge/laravel-v6.10.0-orange">
<img src="https://img.shields.io/badge/vue--cli-v4.1.0-brightgreen">
<img src="https://img.shields.io/badge/babel--eslint-v10.0.3-blue">
<img src="https://img.shields.io/badge/eslint-v5.16.0-green">
</p>

<hr>

## Laravel + Vue-CLI Boilerplate

This Laravel setup gives you the additional benefits of a Vue-CLI setup. As you may know, Vue-CLI and similar environment 
setups are ushering web developers into a whole new era. And for those Laravel lovers out there, it's been hard to find
that delicate balance of integrating that modern environment into the Laravel framework. Look no further, you have come to the
right place!

This guide will explain a few things that you should know if you wish to use this setup. And you can either clone it and 
jump in, or if you feel more comfortable, I posted a step by step on how to replicate this setup in case you wish to 
integrate your own configuration.

The setup in this repo has a few features that are pre-configured (to my liking). If you're advanced and would like
to customize your own setup, please read **Option B** below to setup your own configuration. Mostly this will occur in 
*Step 5* of **Option B**

*<sub>**NOTE:** If you don't know what you're doing, I suggest you follow this guide to the letter.</sub>*

### Important Things to Note:
**Short summary:** 
>Run `php artisan` commands from project root like always. But run `npm` commands from `/resources/client`.

**Longer summary:**
> * Forget about running `npm` commands from your Project Root.
>   * Now you will run your `npm` commands from `/resources/client`
>   * This includes `npm install` commands as well.
>   * Your `package.json` file is also seated at `/resources/client`
> * You will have two `serve` sources.
>   * When running the Vue-CLI `npm run serve`, your front end project will be served at `localhost:8080`
>   * You will also have LAN network access to that via `10.0.0.27:8080` (I know cool).
>       * However you should note some issues with CSRF Tokens (More on that below)
>   * And you also have your usual no place like home `php artisan serve`
>       * All `php artisan` commands still must be called from project root!
> * This repo ships with Babel/ESLint preconfigured. If you do not know what the heck `ESLint` does, you should
>start learning as this is the modern approach. *ESLint configuration is located in `resources/client/eslintrc.js`.*
>   * I added a little info in `eslintrc.js` that you SHOULD read if you wish to use this repo and don't know how to 
>use *ESLint*.
> * When configuring **Vue Router**, make sure `base: '/'`.
> * Your front-end scaffolding entry file is `resources/client/src/main.js`.

#### Why the NPM move?
If you are familiar with Vue-CLI, then you should know that upon creating a project, Vue-CLI creates its own scaffolding
structure (apart from Laravel's front-end scaffolding). And because of that, you get rid of Laravel's scaffolding all 
together, this includes the need for `laravel-mix`, and all the `node_modules` at the root directory. So when you clone
this repo, fight the urge to `npm install` on the project root (NOT RECOMMENDED). The node packages will be managed by 
the Vue-CLI scaffold, where it will automatically handle minifying code and chunking it for you out of the box!

#### What's with the `serve`ants?
Well, again, Vue-CLI has it's own internal development server that it loads. With this configuration, Vue-CLI will know
to send all *GET* requests and *XHR* calls through Laravel's `localhost:8000`. It might seem like something extra to 
keep track off, but I assure you, it's a lot more easier once you get started. With this setup, you will now have
Hot Module Reload (HMR) feature, as well as a few other things that don't come stock with Laravel's Vue preset.

## Option A: Clone Repo
1. Clone repo.
2. Setup your `.env` file, don't forget to `php artisan key:generate`
3. Run `composer install`.
4. `cd /resources/client`
5. `npm install`
6. Install any other front-end packages you want just like before `npm install -D doworkforme@latest`
    * You may view your `package.json` at `/resources/client/package.json`
7. Run any `vue` commands also from `/resources/client` directory. (i.e. `vue install somethingcool`)
8. Project Root Directory: `php artisan serve`
9. `/resources/client` Directory: `npm run serve`
10. You're welcome.

* DO NOT worry about creating a blade `view` file. This is handled automatically for you when you run `npm run build`
* In `resources/client/vue.config.js` file, MAKE SURE to backup the configuration somewhere (marked between the comments).
    * This is because there are some Vue plugins that will overwrite these settings because they have no idea that you
    have seated them in the Laravel kingdom. So after each `vue install someplugin` just verify `vue.config.js` marked 
    configurations are still the same before the install.
    * Of course you may add whatever else configurations to `vue.config.js` you see fit, it will all work.
* **CSRF Issue:** If you first load `localhost:8080`, it will NOT have the current CSRF token saved in the cookie. 
You must first load `localhost:8000` (doesn't matter if it throws error because you haven't `build` front-end yet), but 
it will save the CSRF into the browser's session cookie, which `localhost:8080` will pick up. So if you run these on 
**Private Browsing** make sure to just load `8000` before you load `8080`. No need to re-`serve` either.
* **CORS Policy:** Also know that CORS policy might reject requests from `8080` going to `8000`, you have to make sure
the URL has `8080` in it instead of `8000`, or you can configure CORS on server side yourself if you are a jedi, unlike
me. You can simply just put `APP_URL=http://localhost:8080` into your `.env` dev file to circumvent this.
* **Deployment:** When you are ready to "`npm run production`" your front-end, run `npm run build` from `/resources/client` 
directory. And when it's done, view it at `localhost:8000` and NOT `8080`. Port `8080` is strictly for Vue's development
server with *HMR*. Once it's `build`, the compiler will place all files into Laravel's public folder and create 
`/resources/views/app.blade.php` for you so that `localhost:8000` will read from there. 

## Option B: Some Assembly Required
**PRE-REQUISITES**<br>
1. Node.js version 8.9+. Minimum Recommendation 8.11.0.
    * NVM is a great tool for managing Node.js versions. Not required though.
2. `npm install --global core-js@latest @vue/cli@latest`
    * Verify that `vue` command is accessible from any directory in your terminal.
3. Trust! There are some steps that might seem like a sin against Laravel, but I assure you, it's for a higher purpose.
If you don't know what you're doing, just trust this guide.

**Let's Get Started!**<br>
1. Setup your Laravel project. Either via your IDE or terminal `composer create-project laravel/laravel laravel-vue-cli`
2. Make sure the following files/folders are *DELETED*: `/package.json`|`/webpack.mix.js`|`/yarn.lock`|`/resources/sass/`|`/resources/js/`
|`/public/js/`|`/public/css/`|`/resources/views/welcome.blade.php`
3. In Terminal project root directory: `cd resources`
4. Terminal: `vue create client --no-git`
    * You may substitute `client` for whatever your heart desires. This will create a directory of that name in the 
    *resources* folder. Other common names are `app`, `frontend`, `front`, `spa`.
    * Why `--no-git`? Vue will automatically init a git repo in the *resources* folder. This guide assumes you have a git
    repo at the root project. But again, it's up to you.
    * IMPORTANT! Although you may run `vue create` where ever you wish, this guide assumes it is `resources/client` since
    there will be configurations you will have to make relative to **vue-cli** root directory.
5. Follow Vue-CLI's terminal prompts. This guide has done the following:
    * Preset: Manual.
    * Selected Presets: &bull;Babel &bull;Router &bull;Vuex &bull;CSS Pre-processors &bull;Linter / Formatter
    * Use history mode for router? **Y**
    * Pick a CSS pre-processor: **Sass/SCSS (with node-sass)**
    * Pick a linter / formatter config: **ESLint with error prevention only**
    * Pick additional lint features: **Lint on save**
    * Where do you prefer placing config for Babel, ESLint, etc.? **In dedicated config files**
    * Save this as a preset for future projects? **Up to you mate**
6. You should see a folder named `client` (or whatever you named in `vue create [name]`). Open that directory.
    * For the remainder of this guide, I will refer to `/resources/client` as `vue root` directory.
7. In vue root directory, create a file and name it `vue.config.js`. (Must be that name exactly).
8. Paste the following in that file:
    ```javascript
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
    ```
    * The `devServer.proxy` will tell the vue app where to send all server side requests.
    * The `outputDir` is where all the public files will be generated when you `npm run build`. `localhost:8000` will be 
    reading from those files. `localhost:8080` will NOT. You basically need not to ever touch those files, let vue-cli
    handle them for you.
    * The `indexPath` is the file that `npm run build` will build for you. No need to manually create a `app.blade.php` 
    in the `resources/views` directory. 
9. Please take a moment to note that all `vue` and `npm` commands must now be run from `resources/client` directory! 
`php artisan` commands are still to be run from root. If you create `package.json` in project root, and alias the command
`"npm run watch": "cd resources/client && npm run serve"`, this will only work partially. Although `npm` will execute the
`npm run serve` from the correct directory, it will still attempt to search vue root node modules from the project root
node modules directory (if you have it). This can throw a bunch of weird errors and very hard to debug. Use command aliasing
only if you know what you are doing and be aware of this issue.
10. Edit your `/routes/web.php` file. Delete the `Route::get('/')` configuration and paste this instead:
    * `Route::get('/{any}', 'SpaController@app')->where('any', '^(?!api).*$');`
        * This will 'forward all calls' back to vue app, which the `vue router` should handle.
        * Of course you can name your controller `SpaController` whatever you wish, as well as the method `app`
11. You can probably guess this step. Open Terminal from *project* root and `php artisan make:controller SpaController`. 
Edit that controller and slap in:
    ```php
    public final function app() 
    { 
        return view('app');
        // Don't create app.blade.php manually. Vue-CLI 'npm run build' will do it for you.
    }
    ```
12. Terminal: *Project Root:* `php artisan serve` & *Vue Root:* `npm run serve` for development
    * Remember to request the page `localhost:8000` at least once so that CSRF will get stored in the browser's session, 
    otherwise `localhost:8080` XHR requests will complain about `csrf token mismatch`. While developing, stick with
    `localhost:8080` to watch for changes made. Uses Hot Module Reload (HMR), which will refresh the page for you 
    when you save any changes in your code.
13. When ready for production, Vue Root Terminal: `npm run build`. Once it's done, view the result in `localhost:8000`.
    * No need to turn off `npm run serve` while building. Neither processes conflict with one another.
14. You're welcome!
