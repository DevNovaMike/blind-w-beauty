document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("appointmentForm");
  const scriptURL = "https://script.google.com/macros/s/AKfycbwR7Kg7HBrXxA3H0bd0S2J0OBQWe0efzeyQfQFbsANTR2YL8-kvX4boLXfykkJbFDEXYQ/exec";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("🚀 Sending form data...");

    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      message: form.message.value,
    };

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("✅ Server response:", result);

      if (result.success) {
        alert("✅ Appointment sent successfully!");
        form.reset();
      } else {
        alert("⚠️ Failed to send appointment. Please try again.");
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("❌ There was an error sending your appointment.");
    }
  });
});
