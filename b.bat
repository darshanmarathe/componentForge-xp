cls 
call npr build
IF not [%1]==[] (
    Xcopy js "I:\manotr\work\Website\app\src\assets\WC" /E /H /C /I /Y
)