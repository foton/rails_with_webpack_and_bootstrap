# Ruby on Rails with Webpack(er) and Bootstrap for noobies

0) For work with Webpacker you have to install [Node.js](https://nodejs.org/en/download/package-manager/)
and [Yarn](https://yarnpkg.com/lang/en/docs/install/).
1.1) Create some directory and cd in it.
1.2) Run `bundler init` which will create `Gemfile`.
1.3) Insert `gem 'rails', '~> 5.1.3'` into `Gemfile`.
1.4) Run `bundle` to install rails gem.
1.5) Run `rails new myapp --webpack`. It wil create RoR app structure in folder `myapp` and then initialize Webpack(er) and download required NPM packs.
1.6) Go into `myapp` folder
1.7) Congratulations, you can run rails server by `bundle exec rails s`.
1.8) Open http://localhost:3000 in your browser and You will see 'Yay! You’re on Rails!' page. Frankly, I do not know where it came from. Some magic.

2.1) Copy file `w3.....` to `myapp/public/index.html`.
2.3) If you refresh http://localhost:3000 you will see nice page with bootstrap allerts which fading on close. Something to work with.
2.4) Page (in source code) download `JQuery` (JS) and `Bootstrap` (JS + CSS) from net. I you stop your internet connection it will not be pretty anymore. BUT! With Webpacker it can!

3.1) `Webpacker` uses `Webpack`, which is package of Javascript (run by `Node.js`) to squash JS modules (aka packages) You need in your app, into one big JS file. In short. `Webpack` itself is undependent on RoR, `Webpacker` add support for it into Rails app. `Webpack(er)` can replace (or coexists with) Rails assets pipeline, which alos build big JS file from many.

4.1) Let's make page ugly permanently until we supply Bootstrap by Webpacker. Delete lines with `<link rel="stylesheet" ...` and `<script src= .....`.
4.2) Because files in `public` are not processed by Rails stack we have to create some structe inside Rails app.
4.3) run `rails g controller bootstrap index` in `myapp` folder
4.4) Restart rails server to take changes in routes.
4.5) Open http://localhost:3000/bootstrap/index. It is just template. Notice where you can find it.
4.6) Replace content of `app/views/bootstrap/index.html.erb` with whole `<div class="container">
 ....</div>` from `public/index.html`.
4.7) Now we have two ugly pages! But one of them is using whole Rails stack. If you open source code of `/bootstrap/index`, you will see, that there are plenty on JavaScript inclusions. Last one,`/assets/application.self-.....js` comming from Rails assets pipeline and is empty (comments only).

5.1) If we need Bootstrap from Webpack, we have to:
5.2) Add it's package to ours: run `bin/yarn add bootstrap` in `myapp` directory. This will add bootstrap line to `myapp/packages.json`, something like Gemfile for node.js/npm/yarn, and content of package (and it's dependencies) to `myapp/node_modules`.
5.3) Require it in our 'entry point' (see Webpack(er) documentation). By default it is file `myapp/javascript/packs/application.js`. Insert lines `import {} from 'bootstrap';` and  `import 'bootstrap/dist/css/bootstrap.min.css';` into it. Yes, we import CSS in JavaScript file!
5.4) Run Webpack in `myapp` directory: `bundle exec bin/webpack`. This will create file (by default) `myapp/public/packs/application-:hash:.js` and `myapp/public/packs/application-:hash:.css`.
5.5) Make Rails to load this file by adding `<%= javascript_pack_tag 'application' %>` and `<%= stylesheet_pack_tag 'application' %>` into `myapp/app/views/layouts/application.html.erb` after `<%= javascript_include_tag ... %>`.
5.6) If you open http://localhost:3000/bootstrap/index now, page is pretty again.










