<%
Response.ContentType = "text/html"
Response.Charset = "UTF-8"

Dim conn, rs, sql

' 创建数据库连接
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & Server.MapPath("sources/score.mdb")

' 清空数据
sql = "DELETE FROM score"
Set rs = conn.Execute(sql)

' 关闭连接
conn.Close
Set conn = Nothing

' 这里似乎不能用中文，否则会报错500
Response.Write("Cleared history successfully.")

%>