document.addEventListener("DOMContentLoaded", () => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle("reveal", entry.isIntersecting);
        });
      }, { threshold: 0.1 });

      document.querySelectorAll("section").forEach(section => observer.observe(section));
    });

    // Active nav link highlight
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
      let closest = null;
      let closestDistance = Infinity;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = section;
        }
      });

      if (closest) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${closest.id}`);
        });
      }
    });

    // Starfield canvas
    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");
    let width, height, stars = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    for (let i = 0; i < 400; i++) {
      stars.push({ x: Math.random() * width - width / 2, y: Math.random() * height - height / 2, z: Math.random() * width });
    }

    function draw() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);

      for (const star of stars) {
        star.z -= 2;
        if (star.z <= 0) star.z = width;

        const k = 128 / star.z;
        const sx = star.x * k + width / 2;
        const sy = star.y * k + height / 2;

        if (sx >= 0 && sx < width && sy >= 0 && sy < height) {
          const size = (1 - star.z / width) * 2;
          ctx.beginPath();
          ctx.arc(sx, sy, size, 0, Math.PI * 2);
          ctx.fillStyle = "white";
          ctx.fill();
        }
      }

      requestAnimationFrame(draw);
    }
    draw();

    // Contact form submission
    function handleFormSubmit(form) {
      const formData = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          alert("Thank you! Your message has been sent.");
          form.reset();
          window.location.href = "#";
        } else {
          alert("Oops! There was a problem submitting your form");
        }
      }).catch(() => {
        alert("Oops! There was a problem submitting your form");
      });
    }
