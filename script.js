window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const button = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    button.disabled = true;
    button.textContent = "Booking...";

    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyzefOAw9DFzL5qA2nG5SeXsJQBNa1WMtMV4tyuazW3uFz-mQBomygXt9d8WOlNs_C7/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Server response:", data);

      Swal.fire({
        icon: "success",
        title: "✨ Appointment Sent!",
        text: "We'll contact you soon to confirm your booking.",
        confirmButtonColor: "#ff69b4",
      });

      form.reset();
    } catch (err) {
      console.error("❌ Form submission error:", err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#ff69b4",
      });
    } finally {
      button.disabled = false;
      button.textContent = "Book Now";
    }
  });
});
