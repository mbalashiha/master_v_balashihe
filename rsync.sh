#!/bin/bash

rsync -avv --progress --password-file=/home/yoo/rsync_pass /home/yoo/cms/ rsync_master@192.168.0.50::cms
ssh 'safeuser@192.168.0.50' <<-'ENDSSH'
export PATH=/home/safeuser/.local/share/pnpm:/home/safeuser/.nvm/versions/node/v18.16.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
cd /var/www/cms/master_v_balashihe && pnpm install
cd /var/www/cms/master_v_balashihe_graphql_api && pnpm install
echo 'compiling graphql-api backend now...'
cd /var/www/cms/master_v_balashihe_graphql_api && pnpm build
echo 'compiling of graphql-api backend finished.'
chown -R safeuser /var/www/cms
chmod -R 700 /var/www/cms
chmod u=rwx,go=rX /var/www/cms
chmod u=rwx,go=rX /var/www/cms/master_v_balashihe
chmod u=rwx,go=rX /var/www/cms/master_v_balashihe/.next
chmod -R u=rwx,go=rX /var/www/cms/master_v_balashihe/public
chmod -R u=rwx,go=rX /var/www/cms/master_v_balashihe/.next/static
pm2 kill; pm2 start /home/safeuser/ecosystem.config.js;
ENDSSH
rsync -a --password-file=/home/yoo/rsync_pass rsync_master@192.168.0.50::cms/master_v_balashihe/public/ /home/yoo/cms/master_v_balashihe/public
###rsync -a --password-file=/home/yoo/rsync_pass rsync_master@192.168.0.50::cms/master_v_balashihe_graphql_api/mysql-full-dump/ /home/yoo/cms/master_v_balashihe_graphql_api/mysql-full-dump
