      // ===== LOADING SCREEN =====
      window.addEventListener("load", () => {
        setTimeout(() => {
          document.getElementById("loader").classList.add("hidden");
        }, 2200);
      });

      // ===== 1. NAVBAR SCROLL EFFECT =====
      const navbar = document.getElementById("navbar");
      window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
      });

      // ===== 2. HAMBURGER MENU =====
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("navLinks");

      hamburger.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        hamburger.classList.toggle("active");
        hamburger.setAttribute("aria-expanded", isOpen);
        document.body.style.overflow = isOpen ? "hidden" : "";
      });

      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("open");
          hamburger.classList.remove("active");
          hamburger.setAttribute("aria-expanded", false);
          document.body.style.overflow = "";
        });
      });

      // ===== 3. HERO BACKGROUND ZOOM =====
      // Triggers the slow zoom animation after page loads
      window.addEventListener("load", () => {
        setTimeout(() => {
          document.getElementById("heroBg").classList.add("zoomed");
        }, 300);
      });

      // ===== 4. SCROLL ANIMATIONS =====
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );

      document
        .querySelectorAll(".fade-up")
        .forEach((el) => observer.observe(el));

      // ===== MENU FILTER TABS =====
      // Place it AFTER the existing scroll observer code

      const tabs = document.querySelectorAll(".menu-tab");
      const cards = document.querySelectorAll(".menu-card");

      tabs.forEach((tab) => {
        tab.addEventListener("click", () =>{
          // Remove active from all tabs, add to clicked one
          tabs.forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");

          const filter = tab.getAttribute("data-filter");

          cards.forEach((card) => {
            const category = card.getAttribute("data-category");

            if (filter === "all" || category.includes(filter)) {
              // Show card with animation
              card.style.display = "block";
              card.style.animation = "fadeInUp 0.4s ease forwards";
            } else {
              // Hide card
              card.style.display = "none";
            }
          });
        });
      });

      // ===== BRANCHES MAP (Leaflet) =====

      const branches = [
        {
          name: "Mandi Manzil — Calicut",
          district: "Kozhikode",
          lat: 11.2588,
          lng: 75.7804,
          phone: "+91 62350 22055",
          address: "Opposite BSNL, Cheruvannur, Calicut",
        },
        {
          name: "Mandi Manzil — Kaipamangalam",
          district: "Thrissur",
          lat: 10.5276,
          lng: 76.2144,
          phone: "+91 81380 22055",
          address: "Panvel–Kochi–Kanyakumari Hwy, Kaipamangalam",
        },
        {
          name: "Mandi Manzil — Chalakkudy",
          district: "Thrissur",
          lat: 10.3008,
          lng: 76.3318,
          phone: "+91 75930 22055",
          address: "Near D Cinemas, South Chalakudy",
        },
        {
          name: "Mandi Manzil — Perambra",
          district: "Thrissur",
          lat: 10.4512,
          lng: 76.4836,
          phone: "+91 95620 22055",
          address: "Kochi–Selam Highway, NH544, Perambra",
        },
        {
          name: "Mandi Manzil — Kazhakootam",
          district: "Thiruvananthapuram",
          lat: 8.5631,
          lng: 76.881,
          phone: "+91 85920 22055",
          address: "Near Nippon Toyota, Kazhakootam",
        },
        {
          name: "Mandi Manzil — Mettukada",
          district: "Thiruvananthapuram",
          lat: 8.4875,
          lng: 76.9525,
          phone: "+91 95440 22055",
          address: "Mettukada Jn, Thampanoor",
        },
        {
          name: "Mandi Manzil — Ulloor",
          district: "Thiruvananthapuram",
          lat: 8.5152,
          lng: 76.934,
          phone: "+91 85890 22055",
          address: "Medical College Ulloor Rd",
        },
        {
          name: "Mandi Manzil — Karyavattom",
          district: "Thiruvananthapuram",
          lat: 8.559,
          lng: 76.882,
          phone: "+91 92070 22055",
          address: "Karyavattom Rd, Ambalathinkara",
        },
        {
          name: "Mandi Manzil — Kadappakada",
          district: "Kollam",
          lat: 8.887,
          lng: 76.601,
          phone: "+91 89430 22055",
          address: "SV Talkies Jn, Kadapakkada",
        },
        {
          name: "Mandi Manzil — Mevaram",
          district: "Kollam",
          lat: 9.0748,
          lng: 76.62,
          phone: "+91 75580 22055",
          address: "Vazhappally, Mevaram Jn",
        },
        {
          name: "Mandi Manzil — Karunagappally",
          district: "Kollam",
          lat: 9.043,
          lng: 76.531,
          phone: "+91 77360 22055",
          address: "Opposite Krishna Theater, Market Road",
        },
      ];

      // Initialize the map centered on Kerala
      const map = L.map("branches-map", {
        center: [10.0, 76.5],
        zoom: 7,
        zoomControl: true,
        scrollWheelZoom: false, // Prevents accidental zoom while scrolling page
      });

      // Dark-themed map tiles (matches our website)
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        },
      ).addTo(map);

      // Custom gold map marker icon
      const goldIcon = L.divIcon({
        className: "",
        html: `<div style="
                width: 14px;
                height: 14px;
                background: #C9A84C;
                border: 2px solid #fff;
                border-radius: 50%;
                box-shadow: 0 0 10px rgba(201,168,76,0.8);
            "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        popupAnchor: [0, -10],
      });

      // Add markers + popups for each branch
      const markers = branches.map((branch, i) => {
        const marker = L.marker([branch.lat, branch.lng], {
          icon: goldIcon,
        }).addTo(map);

        marker.bindPopup(`
                <div class="popup-title">${branch.name}</div>
                <div class="popup-address">${branch.address}<br>${branch.district}</div>
                <div class="popup-phone"><i class="fas fa-phone"></i> ${branch.phone}</div>
            `);

        return marker;
      });

      // Click branch card → fly to that location on map
      document.querySelectorAll(".branch-card").forEach((card, i) => {
        card.addEventListener("click", () => {
          // Remove active from all cards
          document
            .querySelectorAll(".branch-card")
            .forEach((c) => c.classList.remove("active"));

          // Add active to clicked card
          card.classList.add("active");

          // Fly map to that branch with animation
          map.flyTo([branches[i].lat, branches[i].lng], 14, {
            animate: true,
            duration: 1.2,
          });

          // Open that branch's popup
          markers[i].openPopup();
        });
      });

      // ===== CONTACT FORM =====
      document.getElementById("submitBtn").addEventListener("click", () => {
        const fname = document.getElementById("fname").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Basic validation
        if (!fname || !email || !message) {
          alert("Please fill in your name, email, and message.");
          return;
        }

        // Show success message
        document.getElementById("contactFormArea").style.display = "none";
        document.getElementById("formSuccess").style.display = "block";
      });

      // ===== SCROLL TO TOP BUTTON =====
      const scrollTopBtn = document.getElementById("scrollTop");

      window.addEventListener("scroll", () => {
        scrollTopBtn.classList.toggle("visible", window.scrollY > 500);
      });

      scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      // ===== LAZY IMAGE LOADING =====
      document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
        img.addEventListener("load", () => img.classList.add("loaded"));
        if (img.complete) img.classList.add("loaded");
      });

      window.addEventListener("scroll", () => {
        const scrollIndicator = document.querySelector(".scroll-indicator");
        if (window.scrollY > 100) {
          scrollIndicator.style.opacity = "0";
          scrollIndicator.style.pointerEvents = "none";
        } else {
          scrollIndicator.style.opacity = "1";
          scrollIndicator.style.pointerEvents = "auto";
        }
      });

      // ===== IMAGE LIGHTBOX =====
      const lightbox = document.getElementById("lightbox");
      const lightboxImg = document.getElementById("lightboxImg");
      const lightboxTitle = document.getElementById("lightboxTitle");
      const lightboxDesc = document.getElementById("lightboxDesc");
      const lightboxTag = document.getElementById("lightboxTag");
      const lightboxClose = document.getElementById("lightboxClose");

      // Open lightbox when any menu card is clicked
      document.querySelectorAll(".menu-card").forEach((card) => {
        card.addEventListener("click", () => {
          // Grab data from the card
          const img = card.querySelector(".menu-card-img img");
          const title = card.querySelector("h3").textContent;
          const desc = card.querySelector(".menu-card-body p").textContent;
          const tag = card.querySelector(".menu-card-tag").textContent;

          // Populate lightbox
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightboxTitle.textContent = title;
          lightboxDesc.textContent = desc;
          lightboxTag.textContent = tag;

          // Open it
          lightbox.classList.add("active");
          document.body.style.overflow = "hidden";
        });
      });

      // Close on X button
      lightboxClose.addEventListener("click", closeLightbox);

      // Close when clicking outside the image box
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
      });

      // Close on Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeLightbox();
      });

      function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
      }

      // ===== 3D CAROUSEL =====
        // Paste inside your <script> tag at the bottom

        const carouselDishes = [
            { name: "Chicken Mandi",      desc: "A fragrant Arabian rice dish with tender spiced chicken and smoky flavors, served with traditional flair.",                         tag: "Classic · Arabic",       badge: "Classic",   badgeBg: "#C9A84C", badgeColor: "#0D0B08", img: "images/chicken-mandi.jpg"     },
            { name: "Mutton Mandi",       desc: "A flavorful rice dish with juicy, slow-cooked mutton and rich Arabic spices, served with an authentic smoky touch.",               tag: "Classic · Arabic",       badge: "Classic",   badgeBg: "#C9A84C", badgeColor: "#0D0B08", img: "images/mutton-mandi.jpg"       },
            { name: "Beef Mandi",         desc: "A hearty Arabic rice dish with tender, spiced beef slow-cooked to perfection and served with smoky, fragrant rice.",               tag: "Classic · Arabic",       badge: "Classic",   badgeBg: "#C9A84C", badgeColor: "#0D0B08", img: "images/beef-mandi.jpg"         },
            { name: "Spicy Mandi",        desc: "A bold twist on the classic, featuring tender meat, aromatic rice, and an extra kick of fiery Arabic spices.",                    tag: "Spicy · Arabic",         badge: "🌶 Spicy",  badgeBg: "#e74c3c", badgeColor: "#fff",    img: "images/spicy-mandi.jpg"        },
            { name: "Alfaham Mandi",      desc: "A delicious fusion of juicy grilled chicken and fragrant spiced rice — a smoky, flavorful twist on the classic.",                 tag: "Fusion · Grilled",       badge: "Fusion",    badgeBg: "#8B6914", badgeColor: "#fff",    img: "images/alfaham-mandi.jpg"      },
            { name: "Peri Peri Mandi",    desc: "A spicy fusion of Arabic rice and tender meat tossed in zesty Peri Peri sauce for a bold, fiery flavor.",                        tag: "Fusion · Spicy",         badge: "🌶 Fusion", badgeBg: "#e74c3c", badgeColor: "#fff",    img: "images/peri-peri-mandi.jpg"    },
            { name: "Honey Chilly Mandi", desc: "Blends sweet and spicy flavors with tender meat, aromatic rice, and a drizzle of honey chili glaze for a bold fusion twist.",    tag: "Fusion · Sweet & Spicy", badge: "Fusion",    badgeBg: "#8B6914", badgeColor: "#fff",    img: "images/honey-chilly-mandi.jpg" },
            { name: "Green Chilly Mandi", desc: "A fiery blend of tender meat, aromatic rice, and bold green chilli spice — crafted for those who crave real flavor with a kick.", tag: "Spicy · Bold",           badge: "🌿 Spicy",  badgeBg: "#27ae60", badgeColor: "#fff",    img: "images/green-chilly-mandi.jpg" },
        ];

        let carouselCurrent = 0;
        let carouselAuto    = null;
        let carouselPaused  = false;
        const CN = carouselDishes.length;

        const carouselTrack    = document.getElementById('carouselTrack');
        const carouselTitleEl  = document.getElementById('carouselTitle');
        const carouselDescEl   = document.getElementById('carouselDesc');
        const carouselTagEl    = document.getElementById('carouselTag');
        const carouselProgress = document.getElementById('carouselProgress');
        const carouselOverlay  = document.getElementById('carouselOverlay');
        const carouselInner    = document.getElementById('carouselInner');

        // Build cards
        const carouselCards = carouselDishes.map((d, i) => {
            const el = document.createElement('div');
            el.className = 'dish-card';
            el.innerHTML = `
                <img src="${d.img}" alt="${d.name}">
                <div class="card-overlay"></div>
                <div class="card-dim"></div>
                <span class="card-badge" style="background:${d.badgeBg};color:${d.badgeColor}">${d.badge}</span>
                <div class="card-name">${d.name}</div>
            `;
            el.addEventListener('click', () => { carouselCurrent = i; carouselRender(true); });
            el.addEventListener('mouseenter', () => { carouselPaused = true; });
            el.addEventListener('mouseleave', () => { carouselPaused = false; });
            carouselTrack.appendChild(el);
            return el;
        });

        function carouselRender(animate = true) {
            carouselCards.forEach((card, i) => {
                let diff = i - carouselCurrent;
                if (diff > CN / 2)  diff -= CN;
                if (diff < -CN / 2) diff += CN;
                const abs   = Math.abs(diff);
                const x     = diff * 230;
                const z     = -abs * 220;
                const rotY  = -diff * 10;
                const rotZ  = diff * 6;
                const scale = 1 - abs * 0.14;
                const dim   = abs === 0 ? 0 : Math.min(0.55, abs * 0.28);
                const op    = abs > 2 ? 0 : 1;

                card.style.transition = animate
                    ? 'transform 0.65s cubic-bezier(0.22,1,0.36,1), opacity 0.65s ease'
                    : 'none';
                card.style.transform  = `translate(-50%,-50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`;
                card.style.opacity    = op;
                card.style.zIndex     = 10 - abs;
                card.style.cursor     = abs === 0 ? 'default' : 'pointer';
                card.style.pointerEvents = abs > 2 ? 'none' : 'auto';
                card.querySelector('.card-dim').style.opacity  = dim;
                card.querySelector('.card-name').style.opacity = abs === 0 ? 1 : 0;
            });

            // Update description
            const d = carouselDishes[carouselCurrent];
            carouselTitleEl.textContent = d.name;
            carouselDescEl.textContent  = d.desc;
            carouselTagEl.textContent   = d.tag;

            // Update progress bar
            carouselProgress.style.width = ((carouselCurrent / (CN - 1)) * 100) + '%';
        }

        function carouselNext() { carouselCurrent = (carouselCurrent + 1) % CN; carouselRender(true); }
        function carouselPrev() { carouselCurrent = (carouselCurrent - 1 + CN) % CN; carouselRender(true); }

        function carouselStartAuto() {
            carouselAuto = setInterval(() => {
                if (!carouselPaused) carouselNext();
            }, 2800);
        }

        function carouselOpen() {
            carouselOverlay.classList.add('active');
            carouselRender(false);
            setTimeout(() => carouselRender(true), 50);
            carouselStartAuto();
        }

        function carouselClose() {
            carouselOverlay.classList.remove('active');
            clearInterval(carouselAuto);
        }

        // Open via "View Our Full Menu" button
        document.querySelector('a[href="#menu"].btn-primary, .menu-footer .btn-primary')
            ?.addEventListener('click', (e) => { e.preventDefault(); carouselOpen(); });

        // Also attach to any element with data-open-carousel
        document.querySelectorAll('[data-open-carousel]').forEach(el => {
            el.addEventListener('click', (e) => { e.preventDefault(); carouselOpen(); });
        });

        // Close when clicking OUTSIDE the inner box
        carouselOverlay.addEventListener('click', (e) => {
            if (!carouselInner.contains(e.target)) carouselClose();
        });

        // Arrow buttons
        document.getElementById('carouselNext').addEventListener('click', () => {
            carouselPaused = true;
            carouselNext();
            setTimeout(() => carouselPaused = false, 1500);
        });

        document.getElementById('carouselPrev').addEventListener('click', () => {
            carouselPaused = true;
            carouselPrev();
            setTimeout(() => carouselPaused = false, 1500);
        });

        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (!carouselOverlay.classList.contains('active')) return;
            if (e.key === 'Escape')     carouselClose();
            if (e.key === 'ArrowRight') carouselNext();
            if (e.key === 'ArrowLeft')  carouselPrev();
        });

        // Touch swipe support
        let cTouchX = 0;
        carouselOverlay.addEventListener('touchstart', (e) => {
            cTouchX = e.touches[0].clientX;
            carouselPaused = true;
        });
        carouselOverlay.addEventListener('touchend', (e) => {
            const diff = cTouchX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) diff > 0 ? carouselNext() : carouselPrev();
            setTimeout(() => carouselPaused = false, 1500);
        });


        