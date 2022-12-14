#!/bin/bash
ip="server.watermelon02.cn"
password=$(sed -n '1p' password.txt)
# 传输文件
cp -fR /Users/xigua/Desktop/vue/dist /Users/xigua/Desktop/docker/blog_front
expect -c "
set timeout 500
spawn scp -r /Users/xigua/Desktop/docker/blog_front root@${ip}:/usr/local/docker
expect {
\"*password:\"  {send $password\r}
}
expect eof
"
# 远程部署
expect -c "
spawn ssh  root@$ip
expect {
\"*password:\"  {send $password\r}
}
expect \"#*\"
send \"cd /usr/local/docker/blog_front\r\"
send \"docker build -t watermelon02/blog_front .\r\"
send \"cd ..\r\"
send \"docker-compose up -d\r\"
send \"exit\r\"
interact
"
