rsync -avv --progress --password-file=/home/yoo/rsync_pass /home/yoo/cms/master_v_balashihe/ rsync_d1@192.168.0.50::master_v_balashihe
rsync -avv --progress --password-file=/home/yoo/rsync_pass /home/yoo/cms/master_v_balashihe_graphql_api/ rsync_d1@192.168.0.50::master_v_balashihe_graphql_api
ssh 'safeuser@192.168.0.50' << EOF
cd /var/www/master_v_balashihe && /home/safeuser/.local/share/pnpm/pnpm install
cd /var/www/master_v_balashihe_graphql_api && /home/safeuser/.local/share/pnpm/pnpm install
cd /var/www/master_v_balashihe_graphql_api && /home/safeuser/.local/share/pnpm/pnpm build
EOF
rsync -avv --progress --password-file=/home/yoo/rsync_pass rsync_d1@192.168.0.50::master_v_balashihe/public/ /home/yoo/cms/master_v_balashihe/public
