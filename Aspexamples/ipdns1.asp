<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
<p>
<b>您正在通过这款浏览器访问我们的站点：</b>
<%Response.Write(Request.ServerVariables("http_user_agent"))%>
</p>
<p>
<b>您的 IP 地址是：</b>
<%Response.Write(Request.ServerVariables("remote_addr"))%>
</p>
<p>
<b>IP 地址的 DNS 查询是：</b>
<%Response.Write(Request.ServerVariables("remote_host"))%>
</p>
<p>
<b>调用该页面所用的方法是：</b>
<%Response.Write(Request.ServerVariables("request_method"))%>
</p>

</body>
</html>
