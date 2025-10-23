document.getElementById("appointment-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  console.log("📤 Sending data:", formData);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzqqEPRwXvYVsux1MLQjnQx41-RCMgX2u4nnNZxnSvhR86PKwrT-kTrxj4G0AeStBfTag/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    console.log("✅ Server response:", result);

    alert(result.message || "Message sent successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
    alert("There was an error sending your message.");
  }
});
