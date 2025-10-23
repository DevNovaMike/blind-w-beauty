document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const status = document.querySelector("#status");

  // 🔗 Your actual Apps Script URL here:
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw2CC60RjdFwHmYnSE7YU8TO-5dUMqbmTikMwT03H3M31vCuc_ifp4b2nwMWoOdG1RYpg/exec";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "⏳ Sending...";

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
    };

    console.log("🚀 Sending:", formData);

    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log("✅ Response:", result);

      if (result.success) {
        status.textContent = "✅ Message saved successfully!";
        form.reset();
      } else {
        status.textContent = "❌ Error: " + (result.error || "Unknown");
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      status.textContent = "⚠️ Network error — check console for details.";
    }
  });
});
