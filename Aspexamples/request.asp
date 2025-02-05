<html>
<%
dim cars
cars=Request.Form("cars")
%>
<body>
<form method="post" action="request.asp" >
<p>请选择您喜欢的汽车：</p>

<input type="radio" name="cars"
<%if cars="Volvo" then response.write("checked")%>
value="Volvo">Volvo</input>
<br />
<input type="radio" name="cars"
<%if cars="Saab" then response.write("checked")%>
value="Saab">Saab</input>
<br />
<input type="radio" name="cars"
<%if cars="BMW" then response.write("checked")%>
value="BMW">BMW</input>
<br /><br />
<input type="submit" value="提交" />
</form>
<%if cars<>"" then response.write("<p>我喜欢的" & cars & "</p>")%>
</body>
</html>
