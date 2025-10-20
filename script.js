document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const button = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    button.disabled = true;
    button.textContent = "Booking...";

    const formData = new FormData(form);

    try {
      const response = await fetch("YOUR_WEB_APP_URL_HERE", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire("✨ Appointment Sent!", "We'll contact you soon to confirm.", "success");
        form.reset();
      } else {
        Swal.fire("⚠️ Error", result.error || "Something went wrong", "error");
      }
    } catch (err) {
      Swal.fire("❌ Network Error", "Please check your connection and try again.", "error");
      console.error(err);
    } finally {
      button.disabled = false;
      button.textContent = "Book Now";
    }
  });
});
