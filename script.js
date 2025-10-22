document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      message: document.querySelector("#message").value,
    };

    console.log("🚀 Sending data:", formData);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwR7Kg7HBrXxA3H0bd0S2J0OBQWe0efzeyQfQFbsANTR2YL8-kvX4boLXfykkJbFDEXYQ/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("✅ Server response:", result);

      if (result.status === "success") {
        alert("✅ Appointment sent successfully!");
        form.reset();
      } else {
        alert("⚠️ Server error: " + result.message);
      }
    } catch (err) {
      console.error("❌ Network/Fetch error:", err);
      alert("Network error: Could not send appointment.");
    }
  });
});
