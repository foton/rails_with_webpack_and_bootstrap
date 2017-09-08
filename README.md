# Ruby on Rails with Webpack(er) and Bootstrap for noobies
0. Prerequisities
   1. For work with Webpacker you have to install [Node.js](https://nodejs.org/en/download/package-manager/)
and [Yarn](https://yarnpkg.com/lang/en/docs/install/). And [Ruby](https://www.ruby-lang.org/en/) will be nice too.

1. New Ruby on Rails app
   1. Create some directory and `cd` in it.
   2. Run `bundler init` which will create `./Gemfile`.
   3. Insert `gem 'rails', '~> 5.3'` into `./Gemfile`.
   4. Run `bundle` to install rails gem.
   5. Run `rails new myapp --webpack`. It wil create RoR app structure in folder `./myapp` and then initialize Webpack(er) and download required NPM packs.
   6. Go into `./myapp` folder
   7. Congratulations, you can run rails server by `bundle exec rails s`.
   8. Open http://localhost:3000 in your browser and You will see _'Yay! You’re on Rails!'_ page. Frankly, I do not know where it came from. Some magic.

2. Get some Bootstrap page
   1. Copy file https://github.com/foton/rails_with_webpack_and_bootstrap/blob/master/myapp/w3schools_bootstrap_example.html to `./myapp/public/index.html`.
   2. If you refresh http://localhost:3000, you will see nice page with bootstrap alerts, which are fading on close. Something to work with. This page (in it's source code) download `JQuery` (JS) and `Bootstrap` (JS + CSS) from internet. If you stop your internet connection, it will not be pretty anymore. BUT! With Webpacker it can!

3. What (I think) is Webpack(er)
   1. Gem `Webpacker` uses `Webpack`, which is package of JavaScript (executed by `Node.js`) to squash JS modules (aka packages) needed by your app, into one big JS file. In short. `Webpack` itself is independent on Rails, `Webpacker` just add support for it into Rails app. `Webpack(er)` can replace (or coexists with) Rails assets pipeline, which also build big JS file from many (and do more things).

4. We need ugly page to make it beautiful!
   1. Let's make page ugly permanently, until we supply Bootstrap by Webpacker. Delete lines with `<link rel="stylesheet" ...` and `<script src= .....` in source code file `./myapp/public/index.html`.
   2. Because files in `./myapp/public` folder are not processed by Rails stack, we have to create some structure inside Rails app.
   3. Run `rails g controller bootstrap index` in `./myapp` folder.
   4. Restart rails server to get changes in routes.
   5. Open http://localhost:3000/bootstrap/index. It is just template, notice where you can find it.
   6. Replace content of `app/views/bootstrap/index.html.erb` with whole `<div class="container">....</div>` from `./myapp/public/index.html`.
   7. Now we have two ugly pages! But one of them is using whole Rails stack. If you look at source code of http://localhost:3000/bootstrap/index, you will see, that there are plenty of JavaScript inclusions. Last one,`/assets/application.self-.....js` comming from Rails assets pipeline and is empty (comments only).

5. Take Webpack and Bootstrap into play
   If we need Bootstrap from Webpack, we have to:
   1. Add it's package to ours: run `bin/yarn add bootstrap` in `myapp` directory. This will add bootstrap line to `myapp/packages.json`, something like `Gemfile` for `node.js | npm | yarn`, and content of package (and it's dependencies) to `./myapp/node_modules` folder.
   2. Require it in our _'entry point'_ (see Webpack(er) documentation). By default it is file `./myapp/javascript/packs/application.js`. Insert lines `import {} from 'bootstrap';` and  `import 'bootstrap/dist/css/bootstrap.min.css';` into it. Yes, we import CSS in JavaScript file!
   3. Run Webpack in `./myapp` directory: `bundle exec bin/webpack`. This will create file (by default) `./myapp/public/packs/application-:hash:.js` and `./myapp/public/packs/application-:hash:.css`.
   4. Make Rails to load this file by adding
      ```
      <%= javascript_pack_tag 'application' %>
      <%= stylesheet_pack_tag 'application' %>
      ```
      into `./myapp/app/views/layouts/application.html.erb` after `<%= javascript_include_tag ... %>`.
   5. If you open http://localhost:3000/bootstrap/index now, page is pretty again. But, no fading on alert close!

6. jQuery is not automagically included
   1. Bootstrap needs jQuery for it. It is dependency, but it is not installed along (_golden Bundler!_).
We have to install it: `bin/yarn add jquery` and  `bin/yarn add popper` (it is mentioned at [Bootstrap page](http://getbootstrap.com/docs/ 0./getting-started/webpack/)).
   2. Now we have to _inject_ jQuery module as `$` or `jQuery` into other modules with Webpack plugin `ProvidePlugin`. Insert this code into `./myapp/config/webpack/environment.js` (shared between all others envs.js) right before `module.exports = environment`:
        ```
        const  webpack = require("webpack");
        environment.plugins.set(
          'Provide Global Variables',
          new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default'],
          })
        )
        ```
   3. Run Webpack in `./myapp` directory again: `bundle exec bin/webpack` and now the alerts can fade on close.

7. Do we need it in browser console too?[OPTIONAL]
   1. Another BUT! If you open browser development console, You cann't use `$()` or `jQuery()`. They are not set as global variables (see [response](https://stackoverflow.com/a/30766733/1223501)). They are injected into modules at bundling time. To have `$()` in console, You must expose it with `expose-loader`.
   2. Install it by `bin/yarn add expose-loader` and then add code after `const { environment } = require('@rails/webpacker')` in `./myapp/config/webpack/environment.js`:
        ```
        environment.loaders.set(
            'expose jQuery object to global space',
            { test: require.resolve("jquery"), loader: "expose-loader?$!expose-loader?jQuery" }
        )
        ```
   2. Run Webpack in `./myapp` directory again: `bundle exec bin/webpack`. Refresh page and now You have access to `$()` in browser console (try `$().jquery` for example).

## Why all this?
* You don't have to use ruby gem for pure JavaScript stuff in your app. No need to wait, when maintainer add new version of bootstrap.
* You don't have to insert tons of `<script>` in your page.
* Webpack is used outside Ruby world too, so updates are more frequent.
* Webpack can bundle (and process) images, fonts, CSS and many other assets. For example, You can set rule: _For all PNG images smaller than 50 kB, stick them into page as Base64 encoded_. But that's another story.

But there is one *con*: If gem is half ruby, half JS it's code have to be bundled by Rails asset pipeline (into `./myapp/public/assets/appilication-:hash:.js`). Webpack cannot see into gems, so You cannot import JS from them.
If you want to take out all JavaScripts (or actually anything) from Rails asset pipeline, you have to either extract JS part from gem into `./myapp/javascript` (sub)folder and import it by relative path. Or You can try to find NPM package derived from gem  and add it to  Your collection with Yarn.










