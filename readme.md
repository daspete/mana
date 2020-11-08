# mana

This is the monorepo for a fullstack application with a frontend, an api, and an admin interface. You can deploy this on heroku out of the box.



## Heroku deploy

There is a ``` doh ``` script (Deploy On Heroku) which automates the deploy process for a testing instance.

example: ``` doh api mana nightly ``` will create an api instance at the url https://api-mana-nightly.herokuapp.com

### heroku configuration

You have to create an environment setup at the folder ``` /.heroku ```. There is an example at ``` /.heroku.example ```