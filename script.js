document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwR7Kg7HBrXxA3H0bd0S2J0OBQWe0efzeyQfQFbsANTR2YL8-kvX4boLXfykkJbFDEXYQ/exec", {
        method: "POST",
        body: formData, // no headers needed!
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();

      if (result.success) {
        alert("✅ Message sent successfully!");
        form.reset();
      } else {
        alert("❌ Error: " + result.error);
      }
    } catch (err) {
      console.error("❌ Submission error:", err);
      alert("Error sending message. Please try again later.");
    }
  });
});
