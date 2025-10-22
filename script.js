document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("appointmentForm");
  const scriptURL = "https://script.google.com/macros/s/AKfycbwR7Kg7HBrXxA3H0bd0S2J0OBQWe0efzeyQfQFbsANTR2YL8-kvX4boLXfykkJbFDEXYQ/exec";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
    };
    console.log("🚀 Sending data:", data);

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      console.log("✅ Response:", result);

      if (result.success) {
        alert("✅ Appointment sent successfully!");
        form.reset();
      } else {
        alert("⚠️ Failed: " + (result.error || "unknown error"));
      }
    } catch (err) {
      console.error("❌ Fetch/network error:", err);
      alert("❌ Could not send. Check console for details.");
    }
  });
});
