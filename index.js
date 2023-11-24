const express = require('express');
const app = express();
const PORT = 5000; // Define your port
const questions = require('./db.json'); // Load questions from JSON file


app.get('/api/questions', (req, res) => {
    const  totalMarks  = req.query.totalMarks;
    const  easy  = req.query.easyPercentage;
    const  medium  = req.query.mediumPercentage;
    const  hard  = req.query.hardPercentage;

    // Calculate the number of questions for each difficulty based on the total marks
    var easyQuestions = Math.floor((parseInt(totalMarks) * easy) / 5); // Assuming each easy question is 5 marks
    var mediumQuestions = Math.floor((parseInt(totalMarks) * medium) / 10); // Assuming each medium question is 10 marks
    var hardQuestions = Math.floor((parseInt(totalMarks) * hard) / 15); // Assuming each hard question is 15 marks
    // Filter questions based on the calculated number for each difficulty
    const filteredQuestions = questions.filter(q => {
      if (q.difficulty === 'Easy' && easyQuestions > 0) {
        easyQuestions--;
        return true;
      } else if (q.difficulty === 'Medium' && mediumQuestions > 0) {
        mediumQuestions--;
        return true;
      } else if (q.difficulty === 'Hard' && hardQuestions > 0) {
        hardQuestions--;
        return true;
      }
      return false;
    });
  console.log(filteredQuestions)
  res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.json(filteredQuestions);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
