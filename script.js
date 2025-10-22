document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM fully loaded and parsed");

  // Make all hidden sections visible immediately (safety check)
  document.querySelectorAll(".hidden").forEach(el => {
    el.classList.add("show");
  });

  // Scroll animation observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  // Observe all hidden elements
  document.querySelectorAll(".hidden").forEach(el => observer.observe(el));

  // Contact form submission (if you have one)
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbwR7Kg7HBrXxA3H0bd0S2J0OBQWe0efzeyQfQFbsANTR2YL8-kvX4boLXfykkJbFDEXYQ/exec", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Network response was not ok");
        console.log("✅ Form submitted successfully");
        alert("Message sent successfully!");
        form.reset();
      } catch (error) {
        console.error("❌ Submission error:", error);
        alert("There was an error sending your message. Please try again later.");
      }
    });
  }

  // Optional: Video modal logic (if you use videos)
  const videoModal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");

  document.querySelectorAll(".video-thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
      const videoSrc = thumb.dataset.video;
      modalVideo.src = videoSrc + "?autoplay=1&mute=1"; // ensure muted autoplay
      videoModal.style.display = "flex";
    });
  });

  const closeBtn = document.getElementById("closeModal");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      videoModal.style.display = "none";
      modalVideo.pause();
      modalVideo.src = "";
    });
  }
});
