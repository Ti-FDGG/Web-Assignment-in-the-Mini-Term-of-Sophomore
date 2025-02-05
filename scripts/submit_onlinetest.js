/**提交按钮 */
document.querySelector('.submit').addEventListener('click', async function() {
  try {
    const form = document.querySelector('.questions');
    const formData = new FormData(form);
    const userAnswers = {};
    const unansweredQuestions = new Set();

    // 遍历所有表单元素
    form.querySelectorAll('input, textarea, select').forEach(element => {
      const name = element.name;
      const value = element.value.trim();

      if (name) {
        if (element.type === 'checkbox' || element.type === 'radio') {
          if (!userAnswers[name]) {
            userAnswers[name] = [];
          }
          if (element.checked) {
            userAnswers[name].push(value);
          }
        } else if (element.type === 'select-multiple') {
          userAnswers[name] = Array.from(element.selectedOptions).map(option => option.value);
        } else {
          userAnswers[name] = value;
        }

        // 检查是否未回答
        if (userAnswers[name] === '' || (Array.isArray(userAnswers[name]) && userAnswers[name].length === 0)) {
          unansweredQuestions.add(name);
        } else {
          unansweredQuestions.delete(name);
        }
      }
    });

    console.log(userAnswers);

    // 提示用户确认提交
    let confirmMessage = '您确定要提交吗？';
    if (unansweredQuestions.size > 0) {
      confirmMessage += ` 还有 ${unansweredQuestions.size} 道题未回答。`;
    }

    if (!confirm(confirmMessage)) {
      return;
    }

    // 从服务器获取题目和答案
    const response = await fetch('../questions.asp');
    const questions = await response.json(); // 确保返回JSON格式的数据
    console.log(questions);

    let totalScore = 0;
    const totalQuestions = questions.length;
    const scorePerQuestion = 100 / totalQuestions;

    questions.forEach(question => {
      const questionType = question['题型'];
      let correctAnswer = question['答案'];
      const userAnswer = userAnswers[question['题号']];

      if (userAnswer === undefined) {
        console.warn(`User answer for question ${question['题号']} is undefined`);
        return;
      }

      // 如果数据库中的答案字段为空，则一律得分
      if (!correctAnswer) {
        totalScore += scorePerQuestion;
        return;
      }

      if (questionType === '多选题') {
        const correctAnswers = correctAnswer.split('');
        const userAnswersArray = Array.isArray(userAnswer) ? userAnswer : userAnswer.split('');
        const correctCount = userAnswersArray.filter(answer => correctAnswers.includes(answer)).length;
      
        // 如果用户的答案中有一个不包含在正确答案中，则该题不得分
        const hasWrongAnswer = userAnswersArray.some(answer => !correctAnswers.includes(answer));
      
        if (hasWrongAnswer) {
          // 用户错选，该题不得分
          totalScore += 0;
        } else if (correctCount === correctAnswers.length && correctCount === userAnswersArray.length) {
          totalScore += scorePerQuestion;
        } else if (correctCount > 0 && correctCount < correctAnswers.length) {
          totalScore += scorePerQuestion * 0.4;
        }
      } else {
        // 将 correctAnswer 转换为一个只有一个元素的数组
        correctAnswer = Array.isArray(correctAnswer) ? correctAnswer[0] : correctAnswer;
        if (userAnswer[0] === correctAnswer) {
          totalScore += scorePerQuestion;
        }
      }

      console.log(userAnswer[0] === correctAnswer);
      console.log(question['题号'], correctAnswer);
      console.log(question['题号'], userAnswer);
      console.log(question['题号'], totalScore);
    });

    // 读取昵称
    const nameElement = document.getElementById('your-name-text');
    const nickname = nameElement ? nameElement.textContent.trim() : '未知';
    console.log(`昵称： ${nickname}`);

    // 读取总用时
    const timeCostElement = document.getElementById('time-cost-display');
    const totalTime = timeCostElement ? timeCostElement.textContent : '未知';

    // 读取提交时间
    const nowDateElement = document.getElementById('now-time-display-date');
    const nowTimeElement = document.getElementById('now-time-display-time');
    const postTimeDate = nowDateElement ? nowDateElement.textContent : '未知';
    const postTimeTime = nowTimeElement ? nowTimeElement.textContent : '未知';
    const postTime = `${postTimeDate} ${postTimeTime}`;

    console.log(`总分： ${totalScore}`);
    console.log(`总用时： ${totalTime}`);
    console.log(`提交时间： ${postTime}`);
    alert(`总分：${totalScore}\n总用时： ${totalTime}\n提交时间： ${postTime}`);

    // 将姓名、得分、总用时和提交时间发送到 ASP 脚本
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_score.asp', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('Score saved successfully');
        // 打开 display_scores.asp 页面查看历史成绩
        window.location.href = 'display_scores.asp';
      }
      else if (xhr.readyState === 4 && xhr.status !== 200) {
        console.error('Error saving score:', xhr.status, xhr.responseText);
        window.location.href = 'display_scores.asp';
      }
    };
    xhr.send(`nickname=${encodeURIComponent(nickname)}&score=${totalScore}&totaltime=${encodeURIComponent(totalTime)}&posttime=${encodeURIComponent(postTime)}`);

    // 清除所有 cookies
    document.cookie.split(";").forEach(function(c) {
      document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=None;Secure";
    });

  } catch (error) {
    console.error('Error fetching questions:', error);
    alert('Error fetching questions: ' + error.message); // 使用对话框显示错误提示

    // 清除所有 cookies
    document.cookie.split(";").forEach(function(c) {
      document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=None;Secure";
    });

    location.reload(); // 刷新页面
  }
});