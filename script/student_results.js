let studentResultsData;

function loadStudentResultsData() {
    const jsonFile = 'data/studentResults.json';
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            studentResultsData = data.studentResults;
        });
}

function searchByEnter(input) {
    if (event.key === 'Enter') {
        searchStudentResults();
    }
}

function searchStudentResults() {
    const searchInput = document.getElementById('search-student-input').value;
    if (!searchInput) {
        showStudentResults();
        return;
    }
    const data = studentResultsData.filter(student =>
        removeVietnameseTones(student.studentName.toLowerCase()).includes(removeVietnameseTones(searchInput.toLowerCase())) ||
        student.studentId.toLowerCase().includes(searchInput.toLowerCase())
    );
    showStudentResults(data);
}

function showStudentResults(data = null) {
    if (!isAdmin) return;
    if (!data) data = studentResultsData;

    document.getElementById('introduce-container').style.display = 'none';
    const container = document.getElementById('main-container');

    container.innerHTML = '';
    container.style.display = 'block';
    let html = `<div class="d-flex mb-4">
                    <h2 class="text-start col">Kết quả học tập</h2>
                    <div class="col"></div>
                    <div class="input-group mb-3 col">
                        <input id="search-student-input" type="text" class="form-control" placeholder="Tên hoặc MSV" onkeydown="searchByEnter(this)" aria-label="Recipient's username" aria-describedby="button-addon2">
                        <button class="btn btn-primary btn-outline-ptit" type="button" onclick="searchStudentResults()">Search</button>
                    </div>
                </div>
                <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">MSV</th>
                    <th scope="col">Họ và Tên</th>
                    <th scope="col">Số kỳ thi tham gia</th>
                    <th scope="col">Detail</th>
                </tr>
                </thead>
                <tbody class="table-group-divider">`;

    data.forEach((student, index) => {
        html += `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${student.studentId}</td>
                    <td>${student.studentName}</td>
                    <td>${student.joinedExams.length}</td>
                    <td><button id="showStudent${index}" type="button" class="btn btn-sm btn-primary btn-outline-ptit" data-bs-toggle="modal" data-bs-target="#studentModal${index}">View</button></td>
                </tr>`;
    });
    html += `</tbody></table>`;

    data.forEach((student, index) => {
        html += `<div class="modal fade" id="studentModal${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">${student.studentName} - ${student.studentId}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="modal-content-${index}">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button id="export-btn-${index}" type="button" class="btn btn-primary">Export</button>
            </div>
          </div>
        </div>
      </div>
        `
    });
    container.innerHTML = html;

    data.forEach((student, index) => {
        document.getElementById(`showStudent${index}`).addEventListener('click', () => showStudent(student, index));
        document.getElementById(`export-btn-${index}`).addEventListener('click', () => exportStudentResults(student, index));
    });

}

function showStudent(student, index) {
    const modalContent = document.getElementById(`modal-content-${index}`);
    modalContent.innerHTML = '';
    let html = `<table id="student-result-table-${index}" class="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Kỳ thi</th>
                    <th scope="col">Điểm</th>
                    <th scope="col">Thời gian</th>
                </tr>
                </thead>
                <tbody class="table-group-divider">`;
    student.joinedExams.forEach((exam, i) => {
        html += `<tr>
                    <th scope="row">${i + 1}</th>
                    <td>${exam.name}</td>
                    <td>${exam.examScore}</td>
                    <td>${exam.date}</td>
                </tr>`;
    });
    html += `</tbody></table>`;
    modalContent.innerHTML = html;
}

function exportStudentResults(student, index) {
    const table = document.getElementById(`student-result-table-${index}`);
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${student.studentName}-${student.studentId}-results.xlsx`);
}

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}