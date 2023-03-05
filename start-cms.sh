#!/bin/bash

kill -9 $(lsof -t -i:3000) &> /dev/null 
kill -9 $(lsof -t -i:4402) &> /dev/null
kill -9 $(lsof -t -i:9934) &> /dev/null
parallel --ungroup --retries 30 ::: 'sudo service mariadb start' 'cd ~/cms/master_v_balashihe_graphql_api && code .' 'cd ~/cms/master_v_balashihe && sleep 0.3 && code .' 'cd ~/cms/master_v_balashihe_graphql_api && pnpm start:dev' 'cd ~/cms/master_v_balashihe && pnpm next dev'


