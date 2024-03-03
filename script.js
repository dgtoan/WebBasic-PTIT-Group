var listExam = [
    
];

// generate exam list into exam-list element, use bootstrap card, edit and delete button beside and margin each card
function generateList() {
    var examList = document.getElementById("exam-list");
    examList.innerHTML = "";
    listExam.forEach(exam => {
        var card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${exam.name}</h5>
                <p class="card-text">Start: ${
                    exam.start ? new Date(exam.start).toLocaleString() : "Not set"
                }</p>
                <p class="card-text">Duration: ${exam.duration} minutes</p>
                <a href="#" class="btn btn-primary">Edit</a>
                <a href="#" class="btn btn-danger">Delete</a>
                <div class="mt-4">
                <a href="/admin/exams/start?id=${exam.id}" class="btn btn-success">Start</a>
            </div>
            <div class="mt-4">
        `;
            
        examList.appendChild(card);
    });
}

generateList();

// delete exam button
var deleteButtons = document.querySelectorAll(".btn-danger");
deleteButtons.forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault();
        var confirmDelete = confirm("Are you sure to delete this exam?");
        if (confirmDelete) {
            var examId = this.getAttribute("href").split("=")[1];
            var examIndex = listExam.findIndex(exam => exam.id == examId);
            listExam.splice(examIndex, 1);
            this.parentElement.remove();
        }
    });
});

var addExamForm = document.getElementById("add-exam-form");

addExamForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var examName = document.getElementById("exam-name").value;
    var examDate = document.getElementById("exam-date").value;
    var examTime = document.getElementById("exam-time").value;
    var examDuration = document.getElementById("exam-duration").value;
    var typeExam = document.getElementById("exam-type").value;


    var newExam = {
        id: listExam.length + 1,
        name: examName,
        start: (typeExam == "free") ? null : new Date(`${examDate}T${examTime}`).getTime(),
        duration: examDuration,
        questions: []
    };

    listExam.push(newExam);
    generateList();

    // dismiss modal
    var modal = bootstrap.Modal.getInstance(document.getElementById("add-exam-modal"));
    modal.hide();
});

