@echo off
SET PATH=C:\cygwin\bin;%PATH%

cd %~dp0\..\
if errorlevel 1 goto error

:http_only
@echo Please go to http://localhost:5103
python -m SimpleHTTPServer 5103
if errorlevel 1 (
	python2.5.exe -m SimpleHTTPServer 5103
	if errorlevel 1 goto error
)

goto end

:error
pause

:end


