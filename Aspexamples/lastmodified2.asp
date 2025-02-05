<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>

<%

Set fs = Server.CreateObject("Scripting.FileSystemObject")
Set rs = fs.GetFile(Server.MapPath("lastmodified2.asp"))
modified = rs.DateLastModified
%>
本文件的最新修改时间是：<%response.write(modified)
Set rs = Nothing
Set fs = Nothing
%>

</body>
