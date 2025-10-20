document.addEventListener("DOMContentLoaded", () => {
  // Dark Mode
  function toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
    if (btn) btn.textContent = isDark ? "Light Mode ☀️" : "Dark Mode 🌙";
  }
  window.toggleDarkMode = toggleDarkMode;

  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
    if (btn) btn.textContent = "Light Mode ☀️";
  }

  document.querySelectorAll(".hidden").forEach(el => el.classList.add("show"));

  // Appointment Form
  const form = document.getElementById('contactForm');
const button = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  button.disabled = true;
  button.textContent = "Booking...";

  const formData = new FormData(form);

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxJ9DKj-zLcAVkqSTyZUy-HujS1xZWCZVIWjePV8Y8z5VFCTrGu0ax0iz7sAX7UntlT/exec', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      Swal.fire('✨ Appointment Sent!', 'We will contact you soon.', 'success');
      form.reset();
    } else {
      Swal.fire('⚠️ Error', result.error || 'Something went wrong', 'error');
    }
  } catch (err) {
    Swal.fire('❌ Network Error', 'Check your connection and try again', 'error');
    console.error(err);
  } finally {
    button.disabled = false;
    button.textContent = "Book Now";
  }
});
});
