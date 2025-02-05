<%
Dim conn, sql, nickname, score, totaltime, posttime

' 获取表单数据
nickname = Request.Form("nickname")
score = Request.Form("score")
totaltime = Request.Form("totaltime")
posttime = Request.Form("posttime")

' 创建数据库连接
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & Server.MapPath("sources/score.mdb")

' 插入数据
sql = "INSERT INTO score (s_name, s_score, s_totaltime, s_posttime) VALUES ('" & Replace(nickname, "'", "''") & "', " & score & ", '" & Replace(totaltime, "'", "''") & "', '" & Replace(posttime, "'", "''") & "')"
conn.Execute(sql)

' 关闭连接
conn.Close
Set conn = Nothing
%>