FOR /L %%A IN (1,1,40) DO (
timeout 2
if exist "Y:\vs_code_msedge\Cache" (
	echo No need to create Cache folder. It is exists.
 ) else (
	mkdir Y:\vs_code_msedge
	mkdir "Y:\vs_code_msedge\Cache"
	rmdir /s /q "D:\UsersD\User1\AppData\Roaming\Code\User\workspaceStorage\87fd3398442ae84cb55fe49c8ed9bc3c\ms-vscode.js-debug-companion\.profile\Default\Cache"
	mklink /D "D:\UsersD\User1\AppData\Roaming\Code\User\workspaceStorage\87fd3398442ae84cb55fe49c8ed9bc3c\ms-vscode.js-debug-companion\.profile\Default\Cache" "Y:\vs_code_msedge\Cache"
 )
)