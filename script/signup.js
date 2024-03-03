let apiUser = "http://localhost:3000/user";

const username = document.querySelector(".input-signup-username");
const password = document.querySelector(".input-signup-password");
const confirmPassword = document.querySelector(".input-confirm-password");
const email = document.querySelector(".input-signup-email");
const bntSignup = document.querySelector(".signup__signInButton");

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate password format
function isValidPassword(password) {
  return password.length >= 8;
}

// Function to check if passwords match
function doPasswordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

// Function to check if any input field is empty
function isAnyFieldEmpty(username, password, confirmPassword, email) {
  return !username || !password || !confirmPassword || !email;
}

// Event listener for the signup form
bntSignup.addEventListener("click", (e) => {
  e.preventDefault();

  // Lấy giá trị từ các trường input
  const enteredUsername = username.value;
  const enteredPassword = password.value;
  const enteredConfirmPassword = confirmPassword.value;
  const enteredEmail = email.value;

  // Kiểm tra xem có ô nào để trống không
  if (isAnyFieldEmpty(enteredUsername, enteredPassword, enteredConfirmPassword, enteredEmail)) {
    alert('Hãy nhập đầy đủ thông tin');
    return;
  }

  // Kiểm tra tính hợp lệ của email
  if (!isValidEmail(enteredEmail)) {
    alert('Sai định dạng email');
    return;
  }

  // Kiểm tra tính hợp lệ của mật khẩu
  if (!isValidPassword(enteredPassword)) {
    alert('Mật khẩu phải có ít nhất 8 ký tự');
    return;
  }

  // Kiểm tra xác thực mật khẩu
  if (!doPasswordsMatch(enteredPassword, enteredConfirmPassword)) {
    alert('Mật khẩu không khớp');
    return;
  }

  // Nếu thông tin đăng ký hợp lệ, bạn có thể thực hiện các hành động khác ở đây (ví dụ: gửi dữ liệu đăng ký đến máy chủ)
  const user = {
    username: enteredUsername,
    password: enteredPassword,
    email: enteredEmail,
  };

  fetch(apiUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    alert('Hoàn tất đăng ký');
  });
});
