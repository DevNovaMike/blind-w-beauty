document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  // -----------------------------
  // DOM utility: show hidden sections
  // -----------------------------
  const DOM = {
    showHiddenSections: () => {
      const hiddenSections = document.querySelectorAll(".hidden");
      hiddenSections.forEach((section, index) => {
        // Add staggered animation delay
        setTimeout(() => {
          section.classList.add("show");
        }, index * 100);
      });
    },
  };

  // Show all sections on page load
  DOM.showHiddenSections();

  // -----------------------------
  // Contact form submission
  // -----------------------------
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwR7Kg7HBrXxA3H0bd0S2J0OBQWe0efzeyQfQFbsANTR2YL8-kvX4boLXfykkJbFDEXYQ/exec",
        {
          method: "POST",
          body: formData,
        }
      );

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
