document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");

  // 👇 Change this to your real deployed Apps Script URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwR7Kg7HBrXxA3H0bd0S2J0OBQWe0efzeyQfQFbsANTR2YL8-kvX4boLXfykkJbFDEXYQ/exec";

  // ✅ Quick test when page loads
  console.log("🔍 Testing Google Apps Script URL:", SCRIPT_URL);
  fetch(SCRIPT_URL)
    .then(r => r.json())
    .then(d => console.log("✅ Connected to Apps Script:", d))
    .catch(e => console.error("❌ Could not connect to Apps Script:", e));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      message: document.querySelector("#message").value,
    };

    console.log("🚀 Sending data:", formData);

    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("📡 Response status:", res.status);
      const data = await res.json();
      console.log("✅ Server replied:", data);

      if (data.status === "success") {
        alert("✅ Appointment sent successfully!");
        form.reset();
      } else {
        alert("⚠️ Error: " + data.message);
      }
    } catch (err) {
      console.error("❌ Fetch/network error:", err);
      alert("❌ Could not send appointment. Check console for details.");
    }
  });
});
