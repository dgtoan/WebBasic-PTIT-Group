let questions = [];
fetch('/data/questions.json')
        .then(response => response.json())
        .then(data => {
            // Replace the inline questions array with the fetched data
            questions = data;
            // Load questions and perform other initialization
            loadQuestions();
        })
        .catch(error => console.error('Error fetching questions:', error));


function startQuiz() {
    const startButton = document.getElementById('checkStart');
    const quizContainer = document.getElementById('quiz-container');

    startButton.style.display = "none";
    quizContainer.style.display = "block";
    startTimer();
}


const quizContainer = document.getElementById('question-container');
const countdownDisplay = document.getElementById('countdown');
let timeLeft = 600; // 10 phút

// Hiển thị câu hỏi
function loadQuestions() {
    const quizContainer = document.getElementById('question-container');

    for (let index = 0; index < questions.length; index++) {
        const questionObj = questions[index];
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `
            <p>${questionObj.question}</p>
            <label><input type="radio" name="question${index}" value="a"> ${questionObj.a}</label><br>
            <label><input type="radio" name="question${index}" value="b"> ${questionObj.b}</label><br>
            <label><input type="radio" name="question${index}" value="c"> ${questionObj.c}</label><br>
            <label><input type="radio" name="question${index}" value="d"> ${questionObj.d}</label><br>
        `;
        quizContainer.appendChild(questionElement);
    }
}


// Bắt đầu đếm ngược thời gian
function startTimer() {
    const countdown = setInterval(function() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        countdownDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert('Hết giờ! Bài thi đã được tự động nộp.');
            submitQuiz();
        }

        timeLeft--;  // Giảm thời gian sau khi hiển thị
    }, 1000);
}


// Nộp bài
function showOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
}

function hideOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

function submitQuiz() {
    // Dừng đếm ngược thời gian
    clearInterval(countdown);
    
    // Hiển thị bảng thông báo xác nhận
    if(timeLeft > 0){     
        showOverlay();
    }else{
        getUserAnswer();
        localStorage.setItem("userAnswer", JSON.stringify(userAnswers));
        getCorrectAnswer();
        localStorage.setItem("correctAnswer", JSON.stringify(correctAnswers));
        window.location.href = "/pages/results.html";
    }
}

function confirmSubmission() {
    console.log('run here')
    // Ẩn bảng thông báo sau khi xác nhận
    hideOverlay();
    // Hiển thị thông báo nếu muốn
    alert('Bài thi đã được nộp. Cảm ơn bạn đã tham gia!');    
    getUserAnswer();
    localStorage.setItem("userAnswer", JSON.stringify(userAnswers));
    getCorrectAnswer();
    localStorage.setItem("correctAnswer",JSON.stringify(correctAnswers));
    window.location.href = "./pages/results.html";
}

function cancelSubmission() {
    // Tiếp tục đếm ngược thời gian nếu người dùng hủy bỏ
    startTimer();

    // Ẩn bảng thông báo
    hideOverlay();
    // window.location.href = "results.html";
}

//lấy đáp án người dùng
let userAnswers = [];

function getUserAnswer() {
    questions.forEach((_, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        console.log(selectedOption)
        userAnswers[index] = selectedOption ? selectedOption.value : null;
    });
}

//lấy đáp chính xác
let correctAnswers = [];

function getCorrectAnswer() {
    for(let i = 0; i < questions.length; i++) {
        correctAnswers.push(questions[i].correct)
    }
}

window.onload = function() {
    loadQuestions();
};
