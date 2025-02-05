<%
Dim conn, rs, sql

' 创建数据库连接
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & Server.MapPath("sources/score.mdb")

' 查询数据
sql = "SELECT s_name, s_score, s_totaltime, s_posttime FROM score"
Set rs = conn.Execute(sql)
%>

<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="keywords" content="Touhou考试系统">
    <meta name="description" content="Touhou考试系统">
    <!-- 避免跨源请求被拦截 -->
    <!-- <meta http-equiv="Access-Control-Allow-Origin" content="*"> -->
    <title>成绩展示</title>
    <link rel="stylesheet" href="styles/fundamental.css">
    <link rel="stylesheet" href="styles/nav.css">
    <link rel="stylesheet" href="styles/cursor.css">
    <link rel="stylesheet" href="styles/style_display_scores.css">
    <link rel="stylesheet" href="node_modules/aos/dist/aos.css" />
    <!-- Font Awesome图标库 -->
    <link rel="stylesheet" href="https://cdn.staticfile.net/font-awesome/5.15.4/css/all.css">
    <link rel="stylesheet" href="styles/bgrparticlestars.css">
    <link rel="icon" href="images/favicon.png">
    <!-- <script src="scripts/bounceball.js" defer></script> -->
    <script src="scripts/nav.js" defer></script>
    <script src="scripts/scripts_display_scores.js" defer></script>
    <!-- 星空背景 -->
    <script src="scripts/bgrparticlestars.js" defer></script>
    <script src="scripts/three.js/three.min.js"></script>
</head>
<body>
    <nav id="main-nav">
        <ul>
            <li><a href="index.html"><i class="fas fa-home"></i>&nbsp;首页</a></li>
            <li><a href="documents.html"><i class="fas fa-folder"></i>&nbsp;归档</a></li>
            <li><a href="about.html"><i class="fas fa-user-circle"></i>&nbsp;关于</a></li>
            <li><a href="friends.html"><i class="fas fa-user-friends"></i>&nbsp;友链</a></li>
            <li>
                <i class="fas fa-pen-fancy"></i>&nbsp;考试系统&nbsp;<i class="fas fa-caret-down"></i>
                <div id="test-system">
                    <a href="onlinetest.html">考试系统</a>
                    <a href="display_scores.asp">历史成绩</a>
                </div>
            </li>
        </ul>
    </nav>
    <div id="particle-container"></div>
    <div id="content">
        <h1 style="text-align: center;">成绩展示</h1>
        <div id="sort-buttons">
            <button id="sort-by-score" type="button">按得分排序</button>
            <button id="sort-by-totaltime" type="button">按总用时排序</button>
            <button id="sort-by-posttime" type="button">按提交时间排序</button>
            <button id="clear-history" type="button">清空历史数据</button>
        </div>
        <table id="score-table">
            <tr>
                <th>姓名</th>
                <th>得分</th>
                <th>总用时</th>
                <th>提交时间</th>
            </tr>
            <% Do While Not rs.EOF %>
            <tr>
                <td><%= rs("s_name") %></td>
                <td><%= rs("s_score") %></td>
                <td><%= rs("s_totaltime") %></td>
                <td><%= rs("s_posttime") %></td>
            </tr>
            <% rs.MoveNext %>
            <% Loop %>
        </table>
        <%
        ' 关闭记录集和连接
        rs.Close
        Set rs = Nothing
        conn.Close
        Set conn = Nothing
        %>
    </div>
    <hr />
    <footer>
      <!-- 随机格言。内含大量引流狗内容，所以谨慎观看。 -->
      <div id="footer-motto" class="motto"></div>
    </footer>
    <!-- D-Sketon大大的鼠标烟花效果。我也不知道为什么必须要移动到底部才能够正常加载 -->
    <script src="https://www.unpkg.com/mouse-firework@latest/dist/index.umd.js"></script>
    <script src="scripts/mousefirework.js"></script>
</body>
</html>