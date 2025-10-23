const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxkvxSQYyvCD3omOK6crkgeyrxt1jY62EeXO9jzm6hdJ8UgE3mkpB7B9FVlI1QZJNzY/exec";

document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  const formData = { name, phone, message };
  console.log("🚀 Sending data:", formData);

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log("✅ Success:", result);
    alert("Message sent!");
  } catch (error) {
    console.error("❌ Fetch error:", error);
    alert("Something went wrong.");
  }
});
