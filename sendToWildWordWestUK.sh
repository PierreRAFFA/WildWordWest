#!/bin/bash
echo "Send to WildWordWest SoYouStart Prod"
echo "YCVxTTHCAg3P";

#move to the correct folder
cd src

#Sync Files
rsync -avz --delete-after server/* root@188.165.251.163:/var/www/wildwordwest

#back to the start folder
cd ..