// =============================
//  FORM SUBMISSION HANDLER
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("appointmentForm");

  if (!form) {
    console.error("❌ appointmentForm not found in HTML");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ====== Replace with your actual deployed Apps Script URL ======
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwR7Kg7HBrXxA3H0bd0S2J0OBQWe0efzeyQfQFbsANTR2YL8-kvX4boLXfykkJbFDEXYQ/exec";

    // ====== Get form data ======
    const formData = {
      name: document.getElementById("name")?.value.trim() || "",
      email: document.getElementById("email")?.value.trim() || "",
      phone: document.getElementById("phone")?.value.trim() || "",
      message: document.getElementById("message")?.value.trim() || "",
    };

    console.log("🚀 Sending data to Apps Script:", formData);

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Apps Script response:", result);

      if (result.success) {
        alert("✅ Your appointment has been sent successfully!");
        form.reset();
      } else {
        alert("⚠️ Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("❌ Error sending to Apps Script:", error);
      alert("❌ Failed to send. Please check your connection and try again.");
    }
  });
});
