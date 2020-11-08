#!/bin/bash

heroku apps:destroy $1-$2-$3 --confirm $1-$2-$3
heroku create $1-$2-$3 --remote $1-$2-$3

cp ./.heroku/Procfile.$1 ./Procfile

envInputFile="./.heroku/.environments/env.$1"
while IFS= read -r line
do 
    heroku config:set "$line" -a $1-$2-$3
done < "$envInputFile"

git push $1-$2-$3 master
rm ./Procfile