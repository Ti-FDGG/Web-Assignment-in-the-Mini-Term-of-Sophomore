<%
Response.ContentType = "text/html"
Response.Charset = "UTF-8"

Dim conn, sql, nickname, score, totaltime, posttime

' 获取表单数据
nickname = Request.Form("nickname")
score = Request.Form("score")
totaltime = Request.Form("totaltime")
posttime = Request.Form("posttime")

' 创建数据库连接
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & Server.MapPath("sources/score.mdb")

' 构建 SQL 语句
sql = "INSERT INTO score (s_name, s_score, s_totaltime, s_posttime) VALUES ("
sql = sql & "'" & Replace(nickname, "'", "''") & "', "
sql = sql & score & ", "
sql = sql & "'" & Replace(totaltime, "'", "''") & "', "
sql = sql & "'" & Replace(posttime, "'", "''") & "')"

' 执行 SQL 语句
conn.Execute(sql)

' 设置 Cookie 并添加 SameSite=None 属性
Response.Cookies("ASPSESSIONIDSQCQRTBS") = "your_cookie_value"
Response.Cookies("ASPSESSIONIDSQCQRTBS").Expires = DateAdd("d", 1, Now())
Response.Cookies("ASPSESSIONIDSQCQRTBS").Path = "/"
Response.Cookies("ASPSESSIONIDSQCQRTBS").Secure = True
Response.AddHeader "Set-Cookie", "ASPSESSIONIDSQCQRTBS=your_cookie_value; SameSite=None; Secure"

' 关闭连接
conn.Close
Set conn = Nothing

Response.Write("Score saved successfully.")
%>