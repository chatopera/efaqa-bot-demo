#! /bin/bash 
###########################################
#
###########################################

# constants
baseDir=$(cd `dirname "$0"`;pwd)
appHome=$baseDir/..
imagename=chatopera/efaqa-bot-tc
# functions

# main 
[ -z "${BASH_SOURCE[0]}" -o "${BASH_SOURCE[0]}" = "$0" ] || return
cd $appHome/app

# Version key/value should be on his own line
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' | xargs)

cd $appHome

docker build \
    --no-cache=true \
    --force-rm=true --tag $imagename:$PACKAGE_VERSION .
docker tag $imagename:$PACKAGE_VERSION $imagename:develop
