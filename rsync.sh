#!/bin/bash

rsync -avv --progress --password-file=/home/yoo/rsync_pass /home/yoo/cms/ rsync_master@192.168.0.50::cms
ssh 'safeuser@192.168.0.50' << EOF
cd /var/www/cms/master_v_balashihe && /home/safeuser/.local/share/pnpm/pnpm install
cd /var/www/cms/master_v_balashihe_graphql_api && /home/safeuser/.local/share/pnpm/pnpm install
cd /var/www/cms/master_v_balashihe_graphql_api && /home/safeuser/.local/share/pnpm/pnpm build
EOF
rsync -avv --progress --password-file=/home/yoo/rsync_pass rsync_d1@192.168.0.50::cms/master_v_balashihe/public/ /home/yoo/cms/master_v_balashihe/public
rsync -avv --progress --password-file=/home/yoo/rsync_pass rsync_d1@192.168.0.50::cms/master_v_balashihe_graphql_api/mysql-full-dump/ /home/yoo/cms/master_v_balashihe_graphql_api/mysql-full-dump
