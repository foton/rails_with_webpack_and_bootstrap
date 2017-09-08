# rails_with_webpack_and_bootstrap

1) Create some directory and cd in it.
2) Run `bundler init` which will create `Gemfile`.
3) Insert `gem 'rails', '~> 5.1.3'` into `Gemfile`.
4) Run `bundle` to install rails gem.
5) Run `rails new myapp --webpack`. It wil create RoR app structure in folder `myapp` and then initialize Webpack(er) and download required NPM packs.
6) Go into `myapp` folder
7) Congratulations, you can run rails server by `bundle exec rails s`.
8) Open http://localhost:3000 in your browser and You will see 'Yay! You’re on Rails!' page.

