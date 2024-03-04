// Mock data for exams
const exams = [
    { id: 1, name: 'Luyện Tập 1', type: 'Luyện Tập', status: 'Đang mở' },
    { id: 2, name: 'Giữa Kỳ 1', type: 'Giữa Kỳ', status: 'Chưa tới lịch' },
    { id: 3, name: 'Cuối Kỳ 1', type: 'Cuối Kỳ', status: 'Chưa tới lịch' },
    // Add more exam data as needed
];

function redirectToAnotherPage() {
    window.location.href = "https://dgtoan.github.io/WebBasic-PTIT-Group/pages/index.html";
}


function updateExamStatus() {
    const currentTime = new Date();

    exams.forEach(exam => {
        if (exam.type === 'Luyện Tập') {
            // Bài luyện tập 1 luôn mở
            exam.status = 'Đang mở';
        } else {
            const accessTime = new Date("2024-03-10T12:00:00");
            if (currentTime < accessTime) {
                // Bài thi chưa tới thời gian
                exam.status = 'Chưa tới lịch';
            } else {
                // Bài thi mở sau thời gian nhất định
                exam.status = 'Đang mở';
            }
        }
    });
}

// Call the function to update exam status
updateExamStatus();

// Function to display exams based on filters
function filterExams() {
    const examType = document.getElementById('examType').value;
    const examStatus = document.getElementById('examStatus').value;
    const searchQuery = document.getElementById('searchExam').value.toLowerCase();

    const filteredExams = exams.filter(exam => {
        const isTypeMatch = examType === 'all' || exam.type === examType;
        const isStatusMatch = examStatus === 'all' || exam.status === examStatus;
        const isSearchMatch = exam.name.toLowerCase().includes(searchQuery);

        return isTypeMatch && isStatusMatch && isSearchMatch;
    });

    displayExams(filteredExams);
}

function startExam(examId) {
    const currentExam = exams.find(exam => exam.id === examId);

    if (currentExam) {
        if (currentExam.status === 'Chưa tới lịch') {
            alert('Chưa tới thời gian yêu cầu');
        } else {
            alert(`Bắt đầu làm bài thi số ${examId}`);
            window.location.href = "https://dgtoan.github.io/WebBasic-PTIT-Group/pages/quiz.html";
        }
    }
}


function manageExam() {
    var currentTime = new Date();
    var accessTime = new Date("2024-03-10T12:00:00");
              
    if (currentTime < accessTime) {
        
    } else {
        window.location.href = "link_den_trang_quan_ly_ky_thi.html";
    }
}

// Function to display exams on the webpage
function displayExams(exams) {
    const examListContainer = document.getElementById('examList');
    examListContainer.innerHTML = '';

    exams.forEach(exam => {
        const examCard = document.createElement('div');
        examCard.classList.add('examCard');
        examCard.innerHTML = `<h3>${exam.name}</h3><p>Loại: ${exam.type}</p><p>Trạng Thái: ${exam.status}</p><button onclick="startExamAndManageExam(${exam.id})">Bắt đầu làm</button>`;
        examListContainer.appendChild(examCard);
    });
}

// Function to simulate starting an exam


function startExamAndManageExam(examId) {
    startExam(examId);
    manageExam();
}

// Initial display of all exams
displayExams(exams);


