document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form[action^='https://formspree.io/f/xeorybbv']");
  const status = document.getElementById("status");
  const button = form.querySelector("button");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Sending...";
    button.disabled = true;
    button.textContent = "Booking...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        status.textContent = "✅ Appointment sent successfully!";
        form.reset();
      } else {
        status.textContent = "❌ Something went wrong. Please try again.";
      }
    } catch (error) {
      status.textContent = "⚠️ Network error. Please try again later.";
    } finally {
      button.disabled = false;
      button.textContent = "Book Now";
    }
  });
});
