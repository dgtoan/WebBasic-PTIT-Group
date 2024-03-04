let userAnswer = JSON.parse(localStorage.getItem("userAnswer"));
let correctAnswer = JSON.parse(localStorage.getItem("correctAnswer"));

let numCorrect = 0; // Số câu đúng
let scores = 0; // Điểm

// Tính số câu đúng
for (let i = 0; i < userAnswer.length; i++) {
    if (userAnswer[i] === correctAnswer[i]) {
        numCorrect++;
    }
}

// Tính điểm
scores = (numCorrect / userAnswer.length) * 10;

// Hiển thị số câu đúng và điểm
document.getElementById("correct-count").textContent = numCorrect;
document.getElementById("user-score").textContent = scores.toFixed(2);

let questions = [];

fetch('/data/questions.json')
    .then(response => response.json())
    .then(data => {
        // Replace the inline questions array with the fetched data
        questions = data;
        // Load questions and perform other initialization
        resultDetail();
    })
    .catch(error => console.error('Error fetching questions:', error));

const res = document.getElementById("quizDetails");

function resultDetail() {
    for (let index = 0; index < questions.length; index++) {
        const selectedOption = userAnswer[index];
        const isCorrect = selectedOption === questions[index].correct;
        const questionClass = isCorrect ? 'correct-answer' : 'incorrect-answer';
        const questionDetail = document.createElement('div');
        questionDetail.innerHTML += `
            <div class="question-result">
            <p>Câu hỏi ${questions[index].question}</p>
            <p>Câu trả lời của bạn: ${selectedOption ? questions[index][selectedOption] : 'Chưa chọn'}</p>
            ${isCorrect ? '' : `<p>Đáp án đúng:${questions[index][questions[index].correct]}</p>`}
            <p>${isCorrect ? 'Đúng' : 'Sai'}</p>
        </div>`;
        res.appendChild(questionDetail);
    }

}
