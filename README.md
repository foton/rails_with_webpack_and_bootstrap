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







