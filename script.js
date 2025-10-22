document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      message: document.querySelector("#message").value,
    };

    try {
      console.log("🚀 Sending data:", formData);

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
        alert("✅ Message sent successfully!");
        form.reset();
      } else {
        alert("⚠️ Something went wrong.");
      }
    } catch (err) {
      console.error("❌ Submission error:", err);
      alert("Error sending message.");
    }
  });
});
