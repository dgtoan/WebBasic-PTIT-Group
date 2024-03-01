let examsData;

function initData() {
    loadExamsData();
}

// ################################################################################################
function loadExamsData() {
    const jsonFile = 'data/resutls.json';
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            examsData = data.exams;
        });
}

function showStatisticsView() {
    document.getElementById('introduce-container').style.display = 'none';
    const container = document.getElementById('main-container');

    container.innerHTML = '';
    container.style.display = 'block';
    let html = `<div class="accordion" id="accordionExample">
                    <h2 class="text-center mb-3">Thống kê kỳ thi</h2>`;

    for (let i = 0; i < examsData.length; i++) {
        let exam = examsData[i];
        html += `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                ${exam.name}
                </button>
            </h2>
            <div id="collapse${i}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <h2 class="text-center mb-5">${exam.name}</h2>
                    <div class="row">
                        <div class="my-3 col-4">
                            <canvas id="bieuDoThamGia${i}"></canvas>
                            <h5 class="text-center my-3">Tỉ lệ hoàn thành bài thi</h5>
                        </div>
                        <div class="my-3 col-8">
                        
                            <canvas id="bieuDoKhoangDiem${i}"></canvas>
                            <h5 class="text-center my-3">Thống kê khoảng điểm</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    html += `</div>`;
    container.innerHTML = html;

    for (let i = 0; i < examsData.length; i++) {
        showExamsStatisticsView(examsData[i], i);
    }
}

function showExamsStatisticsView(examsData, index) {
    const bdThamGia = document.getElementById('bieuDoThamGia' + index);
    new Chart(bdThamGia, {
        type: 'doughnut',
        data: {
            labels: [
                'Hoàn thành',
                'Không hoàn thành',
            ],
            datasets: [{
                label: 'Số lần thi',
                data: [examsData.soLanHoanThanh, examsData.soLanThi - examsData.soLanHoanThanh],
                backgroundColor: [
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)',
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
        }
    });

    let scoreData = examsData.diem;
    let khoangDiem = [0, 0, 0, 0];
    for (let i = 0; i < scoreData.length; i++) {
        if (scoreData[i] >= 0 && scoreData[i] < 4) {
            khoangDiem[0]++;
        } else if (scoreData[i] >= 4 && scoreData[i] < 6) {
            khoangDiem[1]++;
        } else if (scoreData[i] >= 6 && scoreData[i] < 8) {
            khoangDiem[2]++;
        } else if (scoreData[i] >= 8 && scoreData[i] <= 10) {
            khoangDiem[3]++;
        }
    }

    const bdKhoangDiem = document.getElementById('bieuDoKhoangDiem' + index);
    new Chart(bdKhoangDiem, {
        type: 'bar',
        data: {
            labels: ['0-4', '4-6', '6-8', '8-10'],
            datasets: [{
                label: '# số lần thi',
                data: khoangDiem,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// ################################################################################################
function loadStudentResultsData() {
    const jsonFile = 'data/studentResutls.json';
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            examsData = data.exams;
        });
}

function showStudentResultsView() {

}