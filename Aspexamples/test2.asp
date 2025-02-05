< %@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<%
dim cars
cars=Request.Form("cars")
%>
</head>
<body>
<form action="test2.asp" method="post">
<p>请选择您喜欢的汽车：</p>

<input type="radio" name="cars"
<%if cars="Volvo" then Response.Write("checked")%>
value="Volvo">Volvo</input>
<br />
<input type="radio" name="cars"
<%if cars="Saab" then Response.Write("checked")%>
value="Saab">Saab</input>
<br />
<input type="radio" name="cars"
<%if cars="BMW" then Response.Write("checked")%>
value="BMW">BMW</input>
<br /><br />
<input type="submit" value="提交" />
</form>
<%
if cars<>"" then
   Response.Write( cars )
end if
%>
</body>
</html>
