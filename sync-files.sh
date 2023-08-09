#!/bin/bash

rsync -avv --progress --password-file=/home/yoo/rsync_pass /home/yoo/cms/ rsync_master@192.168.0.50::cms
rsync -a --password-file=/home/yoo/rsync_pass rsync_master@192.168.0.50::cms/master_v_balashihe/public/ /home/yoo/cms/master_v_balashihe/public
rsync -a --delete --password-file=/home/yoo/rsync_pass /home/yoo/cms/ rsync_master@192.168.0.50::cms