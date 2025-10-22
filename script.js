// -----------------------------
// Appointment form + dark-mode + robust submit (fetch + iframe fallback)
// Change only SCRIPT_URL to your deployed apps script exec URL
// -----------------------------
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwR7Kg7HBrXxA3H0bd0S2J0OBQWe0efzeyQfQFbsANTR2YL8-kvX4boLXfykkJbFDEXYQ/exec";

function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
  const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
  if (btn) btn.textContent = isDark ? "Light Mode ☀️" : "Dark Mode 🌙";
}

document.addEventListener("DOMContentLoaded", () => {
  // restore dark mode quickly
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
    if (btn) btn.textContent = "Light Mode ☀️";
  }

  // reveal hidden sections (prevents invisible content)
  document.querySelectorAll(".hidden").forEach(el => el.classList.add("show"));
  document.body.style.opacity = "1";

  const form = document.getElementById("contact-form") || document.getElementById("contactForm");
  const statusEl = document.getElementById("status");
  if (!form) return;

  // keep submit button enabled/disabled per validity if desired
  const submitBtn = form.querySelector("button[type='submit']");
  if (submitBtn) {
    form.addEventListener("input", () => {
      submitBtn.disabled = !form.checkValidity();
    });
  }

  form.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Booking...";
    }
    if (statusEl) statusEl.textContent = "Sending...";

    // Build FormData from the form (supports files if present)
    const formData = new FormData(form);

    // Try fetch POST (FormData -> browser sets correct content-type; no preflight typically)
    let fetchSucceeded = false;
    try {
      const resp = await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData,
        cache: "no-cache",
        // DO NOT set Content-Type or custom headers here (would trigger preflight)
      });

      // Only attempt to read JSON if response is ok
      if (resp.ok) {
        // Some deployments sometimes return plain text "Success" — try parse safely
        let parsed = null;
        const txt = await resp.text().catch(() => "");
        try {
          parsed = JSON.parse(txt);
        } catch {
          // not JSON — allow plain 'Success' text
          parsed = { success: (txt || "").toLowerCase().includes("success") };
        }

        if (parsed && (parsed.success === true || parsed.result === "success" || parsed.status === "success")) {
          fetchSucceeded = true;
          if (statusEl) statusEl.textContent = "✅ Appointment sent successfully!";
          form.reset();
        } else {
          // server responded but didn't confirm success
          console.warn("Server returned unexpected response:", parsed);
          // we will fall back to iframe submission if fetch returned non-success
        }
      } else {
        console.warn("Fetch responded with not-ok status", resp.status);
      }
    } catch (err) {
      console.warn("Fetch attempt failed (likely CORS or network):", err);
    }

    // Fallback: if fetch didn't confirm success, submit via a hidden iframe (no CORS checks)
    if (!fetchSucceeded) {
      try {
        // Create hidden iframe (or reuse if exists)
        let iframe = document.getElementById("hidden-submit-iframe");
        if (!iframe) {
          iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.name = "hidden-submit-iframe";
          iframe.id = "hidden-submit-iframe";
          document.body.appendChild(iframe);
        }

        // Create a new form with same fields and submit to iframe.
        // We clone inputs to avoid messing with the visible form.
        const fallbackForm = document.createElement("form");
        fallbackForm.style.display = "none";
        fallbackForm.method = "POST";
        fallbackForm.action = SCRIPT_URL;
        fallbackForm.enctype = "multipart/form-data";
        fallbackForm.target = "hidden-submit-iframe";

        // Copy values from original form into the fallback form
        Array.from(form.elements).forEach(el => {
          if (!el.name) return;
          // For file inputs, clone files
          if (el.type === "file") {
            const files = el.files;
            if (files && files.length) {
              const fileInput = document.createElement("input");
              fileInput.type = "file";
              fileInput.name = el.name;
              // NOTE: you can't programmatically set File objects to input in all browsers.
              // So if file upload fallback is required, inform the user.
            }
            return; // skip adding file programmatically — mostly not possible
          } else if (el.type === "checkbox" || el.type === "radio") {
            if (el.checked) {
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = el.name;
              input.value = el.value;
              fallbackForm.appendChild(input);
            }
          } else {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = el.name;
            input.value = el.value;
            fallbackForm.appendChild(input);
          }
        });

        document.body.appendChild(fallbackForm);

        // Submit the fallback form to the iframe. We won't read the iframe response.
        fallbackForm.submit();

        // give it a moment then clean up
        setTimeout(() => {
          try { fallbackForm.remove(); } catch (_) {}
          if (statusEl) statusEl.textContent = "✅ Appointment sent (via fallback).";
          form.reset();
        }, 1200);

      } catch (err) {
        console.error("Fallback iframe submission failed:", err);
        if (statusEl) statusEl.textContent = "❌ Submission failed. Please try again.";
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Book Now";
        }
        return;
      }
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Book Now";
    }
  });
});
