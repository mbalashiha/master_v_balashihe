#!/bin/bash

ps -fe | grep 'master_v_balashihe' | grep '/node ' | awk '{print $2}' | xargs kill -9 &> /dev/null
ps -fe | grep 'master_v_balashihe' | grep '/nodemon.' | awk '{print $2}' | xargs kill -9 &> /dev/null
kill -9 $(lsof -t -i:3000) &> /dev/null 
kill -9 $(lsof -t -i:4402) &> /dev/null
kill -9 $(lsof -t -i:9229) &> /dev/null
kill -9 $(lsof -t -i:9934) &> /dev/null
parallel --ungroup --retries 0 --halt now,fail=1 ::: 'cd ~/cms/master_v_balashihe_graphql_api && code .' 'cd ~/cms/master_v_balashihe && sleep 0.3 && code .' 'cd ~/cms/master_v_balashihe_graphql_api && pnpm start:dev' 'cd ~/cms/master_v_balashihe && pnpm dev'



