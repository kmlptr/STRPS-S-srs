document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const forgotForm = document.getElementById("forgotForm");

  // ========== LOGIN ==========
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        localStorage.setItem("user", JSON.stringify(foundUser));
        window.location.href = "index.html"; // masuk ke dashboard
      } else {
        document.getElementById("loginMsg").textContent =
          "❌ Email atau password salah!";
      }
    });
  }

  // ========== REGISTER ==========
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const regUsername = document.getElementById("regUsername").value;
      const regEmail = document.getElementById("regEmail").value;
      const regPassword = document.getElementById("regPassword").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const emailExists = users.some((u) => u.email === regEmail);

      if (emailExists) {
        document.getElementById("registerMsg").textContent =
          "⚠️ Email sudah terdaftar!";
      } else {
        users.push({
          username: regUsername,
          email: regEmail,
          password: regPassword,
        });
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("registerMsg").textContent =
          "✅ Pendaftaran berhasil! Silakan login.";
      }
    });
  }

  // ========== FORGOT PASSWORD ==========
  if (forgotForm) {
    forgotForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const fEmail = document.getElementById("forgotEmail").value;
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const foundUser = users.find((u) => u.email === fEmail);

      if (foundUser) {
        document.getElementById("forgotMsg").textContent =
          "🔑 Password Anda: " + foundUser.password;
      } else {
        document.getElementById("forgotMsg").textContent =
          "❌ Email tidak ditemukan!";
      }
    });
  }

  // CEK LOGIN di Dashboard
  const user = JSON.parse(localStorage.getItem("user"));
  if (document.body.classList.contains("dashboard-body")) {
    if (!user) {
      window.location.href = "login.html"; // kalau belum login → balik ke login
    } else {
      document.getElementById("userName").textContent = user.username;
    }
  }
});

// ========== LOGOUT ==========
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html"; // kembali ke login
}


let stream;

// Nyalakan kamera
function startCamera() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((mediaStream) => {
      stream = mediaStream;
      const video = document.getElementById("camera");
      video.srcObject = stream;
    })
    .catch((err) => {
      alert("Gagal akses kamera: " + err);
    });
}

// Matikan kamera
function stopCamera() {
  if (stream) {
    let tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    document.getElementById("camera").srcObject = null;
  }
}