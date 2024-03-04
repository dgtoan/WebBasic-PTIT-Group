let isLogin = true;
let isAdmin = false;

function showAdminMenu() {
  if (isAdmin) {
      document.getElementById('admin-menu').style.display = 'block';
  }
}

let apiUser = "http://localhost:3000/user";

//login
const username = document.querySelector(".input-login-username");
const password = document.querySelector(".input-login-password");
const bntLogin = document.querySelector(".login__signInButton");

// get user
const getUser = async () => {
  const response = await fetch(apiUser);
  const data = await response.json();
  return data;
};

// login
// login
bntLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (username.value == "" || password.value == "") {
    alert("Hãy điền đầy đủ thông tin");
  } else {
    getUser().then((data) => {
      const user = data.find(
        (user) =>
          user.username == username.value && user.password == password.value
      );
      if (user) {
        alert("Đăng nhập thành công");
        
        // Kiểm tra nếu là admin
        if (user.username === "admin" && user.password === "admin123") {
          isAdmin = true;
          localStorage.setItem('isAdmin', 'true');
          localStorage.setItem('isLogin', 'true');
          window.location.href = "./../pages/window_login_admin.html";
          
        }
        else
        {
          localStorage.setItem('isLogin', 'true');
          localStorage.setItem('username', user.username);
          window.location.href = "./../pages/window_login.html";
          
        }
        
      } 
      else {
        alert("Sai thông tin đăng nhập");
      }
    });
  }
});




