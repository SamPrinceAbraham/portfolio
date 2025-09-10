// Initialize VANTA.BIRDS background
VANTA.BIRDS({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  quantity: 3.00,
  backgroundColor: 0x0f172a,
  color1: 0x2563eb,
  color2: 0x7c3aed,
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Simple form validation
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (nameInput.value.trim() === "") {
      alert("Please enter your name");
      nameInput.focus();
      return;
    }

    if (emailInput.value.trim() === "" || !emailInput.value.includes("@")) {
      alert("Please enter a valid email address");
      emailInput.focus();
      return;
    }

    if (messageInput.value.trim() === "") {
      alert("Please enter your message");
      messageInput.focus();
      return;
    }

    alert("Thank you for your message! I will get back to you soon.");
    this.reset();
  });
}

// Add animation to skills on scroll
const skillItems = document.querySelectorAll(".skill-item");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 }
);

skillItems.forEach((item) => {
  item.style.opacity = 0;
  item.style.transform = "translateY(20px)";
  item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(item);
});
const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "⏳ Please wait...";

  fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: json
  })
  .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
          result.style.color = "green";
          result.innerHTML = "✅ Form submitted successfully!";
      } else {
          console.log(response);
          result.style.color = "red";
          result.innerHTML = "❌ " + json.message;
      }
  })
  .catch(error => {
      console.log(error);
      result.style.color = "red";
      result.innerHTML = "⚠️ Something went wrong!";
  })
  .then(function() {
      form.reset();
      setTimeout(() => {
          result.style.display = "none";
      }, 4000);
  });
});

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  // Minimum 2.5s before fade-out
  setTimeout(() => {
    preloader.classList.add("fade-out");
  }, 2500);
});
