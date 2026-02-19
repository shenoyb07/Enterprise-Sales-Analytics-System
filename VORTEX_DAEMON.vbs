Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c cd sales-dashboard && npm start", 0, False
