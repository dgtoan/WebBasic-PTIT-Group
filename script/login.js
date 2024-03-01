let isLogin = true;
let isAdmin = true;

function showAdminMenu() {
    if (isAdmin) {
        document.getElementById('admin-menu').style.display = 'block';
    }
}