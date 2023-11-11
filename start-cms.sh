#!/bin/bash

ps -fe | grep 'master_v_balashihe' | grep '/node ' | awk '{print $2}' | xargs kill -9 &> /dev/null
ps -fe | grep 'master_v_balashihe' | grep '/nodemon.' | awk '{print $2}' | xargs kill -9 &> /dev/null
kill -9 $(lsof -t -i:3000) &> /dev/null 
kill -9 $(lsof -t -i:4402) &> /dev/null
kill -9 $(lsof -t -i:9229) &> /dev/null
kill -9 $(lsof -t -i:9934) &> /dev/null
cd ~/cms/master_v_balashihe_graphql_api && code .
cd ~/cms/master_v_balashihe && code .
parallel --ungroup --retries 256 --halt never ::: 'cd ~/cms/master_v_balashihe && pnpm css:watch' 'cd ~/cms/master_v_balashihe_graphql_api && pnpm start:dev' 'cd ~/cms/master_v_balashihe && pnpm dev'