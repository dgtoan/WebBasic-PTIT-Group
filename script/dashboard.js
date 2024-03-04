function loadStudentResultsData() {
    const jsonFile = 'data/studentResults.json';
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            studentResultsData = data.studentResults;
        });
}

function showDashBoard(data = null) {
    if (!isAdmin) return;
    if (!data) data = studentResultsData;

    document.getElementById('introduce-container').style.display = 'none';
    const container = document.getElementById('main-container');

    container.innerHTML = '';
    container.style.display = 'block';
    let html = `<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active nav-link2" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Danh sách kỳ thi</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link nav-link2" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Danh sách sinh viên</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link nav-link2" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" onclick="showStatistics()">Thống kê</button>
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
    <div class="d-flex mb-4">
                    <h2 class="text-start col">Danh sách kỳ thi</h2>
                    <div class="col"></div>             
                </div>
                <div class="d-flex pb-3">
                <button type="button" class="btn btn-add btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
                Thêm mới
</button>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Năm học</label>
        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="năm học...">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Kỳ thi</label>
        <input type="email" class="form-control" id="exampleInputEmail1"  placeholder="kỳ thi...">
      </div>
      <div class="form-group">
    <label for="exampleInputDate">Thời gian</label>
    <input type="date" class="form-control" id="exampleInputDate" >
</div>
    </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
        <button type="button" class="btn btn-primary">Thêm</button>
      </div>
    </div>
  </div>
</div>
                </div>
                <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">Năm học</th>
                    <th scope="col">Giữa Kỳ I</th>
                    <th scope="col">Cuối kỳ I</th>
                    <th scope="col">Giữa Kỳ II</th>
                    <th scope="col">Cuối Kỳ II</th>
                    <th scope="col">Sửa</th>
                    <th scope="col">Xoá</th>
                </tr>
                </thead>
                <tbody class="table-group-divider">

                <tr>
                <th scope="row">2023-2024</th>
                <td>2023-10-10</td>
                <td>2023-12-18</td>
                <td>2024-04-15</td>
                <td>2024-06-28</td>
                <td><button  type="button" class="btn btn-sm btn-primary btn-outline-ptit" data-bs-toggle="modal" ><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button  type="button" class="btn btn-sm btn-primary btn-outline-ptit" data-bs-toggle="modal" ><i class="fa-solid fa-trash-can"></i></button></td>
            </tr>`;
    html += `</tbody></table>`;

    html+= `</div>`;
        html += `<div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
        <div class="d-flex mb-4">
                    <h2 class="text-start col">Danh sách sinh viên</h2>
                    <div class="col"></div>        
                </div>
                <div class="d-flex pb-3">
                <button type="button" class="btn btn-add btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Thêm mới
            </button>

            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Thêm mới</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                  <form>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Họ và tên</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="họ và tên...">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">MSV</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="msv...">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Tài khoản</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="tài khoản...">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Email</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="email...">
                  </div>
                </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary">Thêm</button>
                  </div>
                </div>
              </div>
            </div>
                </div>
                <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">MSV</th>
                    <th scope="col">Họ và Tên</th>
                    <th scope="col">Tài khoản</th>
                    <th scope="col">Email</th>
                    <th scope="col">Sửa</th>
                    <th scope="col">Xoá</th>
                </tr>
                </thead>
                <tbody class="table-group-divider">`;

    data.forEach((student, index) => {
        html += `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${student.studentId}</td>
                    <td>${student.studentName}</td>
                    <td>${student.userName}</td>
                    <td>${student.email}</td>
                    <td><button id="showStudent${index}" type="button" class="btn btn-sm btn-primary btn-outline-ptit" data-bs-toggle="modal" data-bs-target="#studentModal${index}"><i class="fa-solid fa-pen-to-square"></i></button></td>
                    <td><button id="showStudent${index}" type="button" class="btn btn-sm btn-primary btn-outline-ptit" data-bs-toggle="modal" data-bs-target="#studentModal${index}"><i class="fa-solid fa-trash-can"></i></button></td>
                </tr>`;
    });
    html += `</tbody></table>`;

    html+= `</div>
    
    </div>
        </div>`;
    

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