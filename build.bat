IF not [%1]==[] (
   start http-server -o -c-1
) 
call rimraf js 
call rimraf dist
call npr watch