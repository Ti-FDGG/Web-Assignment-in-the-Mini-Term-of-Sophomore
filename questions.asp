<%@ Language=VBScript %>
<%
Response.CodePage = 65001 ' 设置响应的代码页为 UTF-8
Response.Charset = "UTF-8" ' 设置响应的字符集为 UTF-8
Response.ContentType = "application/json" ' 设置响应的内容类型为 JSON

Dim conn, rs, sql, jsonResult
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & Server.MapPath("sources/questions.mdb")

sql = "SELECT * FROM Questions"
Set rs = conn.Execute(sql)

Dim questions, fieldNames
questions = rs.GetRows()

' 获取字段名称
fieldNames = Array()
For i = 0 To rs.Fields.Count - 1
    ReDim Preserve fieldNames(i)
    fieldNames(i) = rs.Fields(i).Name
Next

rs.Close
conn.Close
Set rs = Nothing
Set conn = Nothing

jsonResult = ConvertToJSON(questions, fieldNames)
Response.Write jsonResult ' 输出 JSON 数据
Response.End ' 结束响应
%>

<%
Function ConvertToJSON(arr, fieldNames)
    Dim json, i, j
    json = "["
    For i = 0 To UBound(arr, 2)
        json = json & "{"
        For j = 0 To UBound(arr, 1)
            json = json & """" & fieldNames(j) & """: """ & arr(j, i) & """"
            If j < UBound(arr, 1) Then json = json & ", "
        Next
        json = json & "}"
        If i < UBound(arr, 2) Then json = json & ", "
    Next
    json = json & "]"
    ConvertToJSON = json
End Function
%>