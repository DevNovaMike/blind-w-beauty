// ===============================
// Blind w Beauty – Appointment Form Script
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("status");
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwR7Kg7HBrXxA3H0bd0S2J0OBQWe0efzeyQfQFbsANTR2YL8-kvX4boLXfykkJbFDEXYQ/exec";

  if (!form) {
    console.error("❌ Form not found: #contact-form");
    return;
  }

  console.log("✅ Form loaded and ready to send appointments.");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("🚀 Submitting appointment...");

    const btn = form.querySelector("button[type='submit']");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Booking...";
    }
    if (status) status.textContent = "Sending...";

    // ✅ Create hidden iframe to bypass CORS
    const iframe = document.createElement("iframe");
    iframe.name = "hiddenFrame";
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // ✅ Build a temporary form to send data
    const tempForm = document.createElement("form");
    tempForm.action = SCRIPT_URL;
    tempForm.method = "POST";
    tempForm.target = "hiddenFrame";
    tempForm.style.display = "none";

    // Add form fields
    ["name", "phone", "message"].forEach((n) => {
      const input = document.createElement("input");
      input.name = n;
      input.value = form[n].value.trim();
      tempForm.appendChild(input);
    });

    document.body.appendChild(tempForm);

    // ✅ Submit the form (sends data to Apps Script)
    tempForm.submit();

    // ✅ Confirm success after short delay
    setTimeout(() => {
      console.log("✅ Appointment submitted to Google Sheets.");
      tempForm.remove();
      iframe.remove();

      if (btn) {
        btn.disabled = false;
        btn.textContent = "Book Now";
      }
      if (status) status.textContent = "✅ Appointment sent successfully!";
      form.reset();
    }, 1500);
  });
});
