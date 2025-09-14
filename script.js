// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Add contact link to mobile menu
const contactInfo = document.querySelector('.contact-info');
const contactLink = contactInfo.querySelector('.contact-link').cloneNode(true);
navMenu.appendChild(contactLink);

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link, .nav-menu .contact-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll tracking (keeping transparent)
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    // Header stays transparent on scroll
    lastScrollY = window.scrollY;
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
const fadeElements = [
    '.section-title',
    '.section-subtitle',
    '.feature-card',
    '.portfolio-item',
    '.testimonial-card',
    '.stat',
    '.contact-item',
    '.about-text',
    '.about-image'
];

fadeElements.forEach(selector => {
    document.querySelectorAll(selector).forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
});

// Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#10b981';

            // Reset form after 3 seconds
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');

    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Button Hover Effects with Sound-like Animation
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Portfolio Item Hover Effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const image = this.querySelector('.portfolio-image svg');
        if (image) {
            image.style.transform = 'scale(1.05) rotate(1deg)';
        }
    });

    item.addEventListener('mouseleave', function() {
        const image = this.querySelector('.portfolio-image svg');
        if (image) {
            image.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Feature Cards Interactive Effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.feature-icon svg');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });

    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.feature-icon svg');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }

    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200;

    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const suffix = counter.textContent.replace(/[\d]/g, '');

        let current = 0;
        const increment = target / speed;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + suffix;
        }, 10);
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Add CSS for loading animation
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }

        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }

        body.loaded::before {
            opacity: 0;
            visibility: hidden;
        }
    `;
    document.head.appendChild(loadingStyle);
});

// Typing Animation for Hero Title (Optional Enhancement)
function typeWriter(element, text, speed = 100) {
    element.textContent = '';
    element.style.opacity = '1';
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Enhanced scroll-triggered animations with stagger effect
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Apply stagger animation to feature grid
const featureGrid = document.querySelector('.features-grid');
if (featureGrid) {
    Array.from(featureGrid.children).forEach(child => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(30px)';
        child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    staggerObserver.observe(featureGrid);
}

// Add to portfolio grid as well
const portfolioGrid = document.querySelector('.portfolio-grid');
if (portfolioGrid) {
    Array.from(portfolioGrid.children).forEach(child => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(30px)';
        child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    staggerObserver.observe(portfolioGrid);
}

// GSAP Draw Random Underline Animation
gsap.registerPlugin(DrawSVGPlugin);

function initDrawRandomUnderline() {

  const svgVariants = [
    `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 20.9999C26.7762 16.2245 49.5532 11.5572 71.7979 14.6666C84.9553 16.5057 97.0392 21.8432 109.987 24.3888C116.413 25.6523 123.012 25.5143 129.042 22.6388C135.981 19.3303 142.586 15.1422 150.092 13.3333C156.799 11.7168 161.702 14.6225 167.887 16.8333C181.562 21.7212 194.975 22.6234 209.252 21.3888C224.678 20.0548 239.912 17.991 255.42 18.3055C272.027 18.6422 288.409 18.867 305 17.9999" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
    `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 24.2592C26.233 20.2879 47.7083 16.9968 69.135 13.8421C98.0469 9.5853 128.407 4.02322 158.059 5.14674C172.583 5.69708 187.686 8.66104 201.598 11.9696C207.232 13.3093 215.437 14.9471 220.137 18.3619C224.401 21.4596 220.737 25.6575 217.184 27.6168C208.309 32.5097 197.199 34.281 186.698 34.8486C183.159 35.0399 147.197 36.2657 155.105 26.5837C158.11 22.9053 162.993 20.6229 167.764 18.7924C178.386 14.7164 190.115 12.1115 201.624 10.3984C218.367 7.90626 235.528 7.06127 252.521 7.49276C258.455 7.64343 264.389 7.92791 270.295 8.41825C280.321 9.25056 296 10.8932 305 13.0242" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
    `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 29.5014C9.61174 24.4515 12.9521 17.9873 20.9532 17.5292C23.7742 17.3676 27.0987 17.7897 29.6575 19.0014C33.2644 20.7093 35.6481 24.0004 39.4178 25.5014C48.3911 29.0744 55.7503 25.7731 63.3048 21.0292C67.9902 18.0869 73.7668 16.1366 79.3721 17.8903C85.1682 19.7036 88.2173 26.2464 94.4121 27.2514C102.584 28.5771 107.023 25.5064 113.276 20.6125C119.927 15.4067 128.83 12.3333 137.249 15.0014C141.418 16.3225 143.116 18.7528 146.581 21.0014C149.621 22.9736 152.78 23.6197 156.284 24.2514C165.142 25.8479 172.315 17.5185 179.144 13.5014C184.459 10.3746 191.785 8.74853 195.868 14.5292C199.252 19.3205 205.597 22.9057 211.621 22.5014C215.553 22.2374 220.183 17.8356 222.979 15.5569C225.4 13.5845 227.457 11.1105 230.742 10.5292C232.718 10.1794 234.784 12.9691 236.164 14.0014C238.543 15.7801 240.717 18.4775 243.356 19.8903C249.488 23.1729 255.706 21.2551 261.079 18.0014C266.571 14.6754 270.439 11.5202 277.146 13.6125C280.725 14.7289 283.221 17.209 286.393 19.0014C292.321 22.3517 298.255 22.5014 305 22.5014" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
    `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.0039 32.6826C32.2307 32.8412 47.4552 32.8277 62.676 32.8118C67.3044 32.807 96.546 33.0555 104.728 32.0775C113.615 31.0152 104.516 28.3028 102.022 27.2826C89.9573 22.3465 77.3751 19.0254 65.0451 15.0552C57.8987 12.7542 37.2813 8.49399 44.2314 6.10216C50.9667 3.78422 64.2873 5.81914 70.4249 5.96641C105.866 6.81677 141.306 7.58809 176.75 8.59886C217.874 9.77162 258.906 11.0553 300 14.4892" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
    `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.99805 20.9998C65.6267 17.4649 126.268 13.845 187.208 12.8887C226.483 12.2723 265.751 13.2796 304.998 13.9998" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`,
    `<svg width="310" height="40" viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 29.8857C52.3147 26.9322 99.4329 21.6611 146.503 17.1765C151.753 16.6763 157.115 15.9505 162.415 15.6551C163.28 15.6069 165.074 15.4123 164.383 16.4275C161.704 20.3627 157.134 23.7551 153.95 27.4983C153.209 28.3702 148.194 33.4751 150.669 34.6605C153.638 36.0819 163.621 32.6063 165.039 32.2029C178.55 28.3608 191.49 23.5968 204.869 19.5404C231.903 11.3436 259.347 5.83254 288.793 5.12258C294.094 4.99476 299.722 4.82265 305 5.45025" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`
  ];

  // Add attributes to <svg> elements
  function decorateSVG(svgEl) {
    svgEl.setAttribute('class', 'text-draw__box-svg');
    svgEl.setAttribute('preserveAspectRatio', 'none');
    svgEl.querySelectorAll('path').forEach(path => {
      path.setAttribute('stroke', 'currentColor');
    });
  }

  let nextIndex = null;

  document.querySelectorAll('[data-draw-line]').forEach(container => {
    const box = container.querySelector('[data-draw-line-box]');
    if (!box) return;

    let enterTween = null;
    let leaveTween = null;

    container.addEventListener('mouseenter', () => {
      // Don't restart if still playing
      if (enterTween && enterTween.isActive()) return;
      if (leaveTween && leaveTween.isActive()) leaveTween.kill();

      // Random Start
      if (nextIndex === null) {
        nextIndex = Math.floor(Math.random() * svgVariants.length);
      }

      // Animate Draw
      box.innerHTML = svgVariants[nextIndex];
      const svg = box.querySelector('svg');
      if (svg) {
        decorateSVG(svg);
        const path = svg.querySelector('path');
        if (path) {
          gsap.set(path, { drawSVG: '0%' });
          enterTween = gsap.to(path, {
            duration: 0.5,
            drawSVG: '100%',
            ease: 'power2.inOut',
            onComplete: () => { enterTween = null; }
          });
        }
      }

      // Advance for next hover across all items
      nextIndex = (nextIndex + 1) % svgVariants.length;
    });

    container.addEventListener('mouseleave', () => {
      const path = box.querySelector('path');
      if (!path) return;

      const playOut = () => {
        // Don't restart if still drawing out
        if (leaveTween && leaveTween.isActive()) return;
        leaveTween = gsap.to(path, {
          duration: 0.5,
          drawSVG: '100% 100%',
          ease: 'power2.inOut',
          onComplete: () => {
            leaveTween = null;
            box.innerHTML = ''; // remove SVG when done
          }
        });
      };

      if (enterTween && enterTween.isActive()) {
        // Wait until draw-in finishes
        enterTween.eventCallback('onComplete', playOut);
      } else {
        playOut();
      }
    });
  });
}

// Initialize Draw Random Underline
document.addEventListener('DOMContentLoaded', function() {
  initDrawRandomUnderline();
});

// GSAP Testimonial Slider
gsap.registerPlugin(CustomEase, ScrollTrigger, Draggable, InertiaPlugin);

CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1");

function initSliders() {
  const sliderWrappers = gsap.utils.toArray(document.querySelectorAll('[data-centered-slider="wrapper"]'));

  sliderWrappers.forEach((sliderWrapper) => {
    const slides = gsap.utils.toArray(sliderWrapper.querySelectorAll('[data-centered-slider="slide"]'));
    const bullets = gsap.utils.toArray(sliderWrapper.querySelectorAll('[data-centered-slider="bullet"]'));
    const prevButton = sliderWrapper.querySelector('[data-centered-slider="prev-button"]');
    const nextButton = sliderWrapper.querySelector('[data-centered-slider="next-button"]');

    let activeElement;
    let activeBullet;
    let currentIndex = 0;
    let autoplay;

    const autoplayEnabled = sliderWrapper.getAttribute('data-slider-autoplay') === 'true';
    const autoplayDuration = autoplayEnabled ? parseFloat(sliderWrapper.getAttribute('data-slider-autoplay-duration')) || 0 : 0;

    slides.forEach((slide, i) => {
      slide.setAttribute("id", `slide-${i}`);
    });

    if (bullets && bullets.length > 0) {
      bullets.forEach((bullet, i) => {
        bullet.setAttribute("aria-controls", `slide-${i}`);
        bullet.setAttribute("aria-selected", i === currentIndex ? "true" : "false");
      });
    }

    const loop = horizontalLoop(slides, {
      paused: true,
      draggable: true,
      center: true,
      onChange: (element, index) => {
        currentIndex = index;

        if (activeElement) activeElement.classList.remove("active");
        element.classList.add("active");
        activeElement = element;

        if (bullets && bullets.length > 0) {
          if (activeBullet) activeBullet.classList.remove("active");
          if (bullets[index]) {
            bullets[index].classList.add("active");
            activeBullet = bullets[index];
          }
          bullets.forEach((bullet, i) => {
            bullet.setAttribute("aria-selected", i === index ? "true" : "false");
          });
        }
      }
    });

    loop.toIndex(2, { duration: 0.01 });

    function startAutoplay() {
      if (autoplayDuration > 0 && !autoplay) {
        const repeat = () => {
          loop.next({ ease: "osmo-ease", duration: 0.725 });
          autoplay = gsap.delayedCall(autoplayDuration, repeat);
        };
        autoplay = gsap.delayedCall(autoplayDuration, repeat);
      }
    }

    function stopAutoplay() {
      if (autoplay) {
        autoplay.kill();
        autoplay = null;
      }
    }

    ScrollTrigger.create({
      trigger: sliderWrapper,
      start: "top bottom",
      end: "bottom top",
      onEnter: startAutoplay,
      onLeave: stopAutoplay,
      onEnterBack: startAutoplay,
      onLeaveBack: stopAutoplay
    });

    sliderWrapper.addEventListener("mouseenter", stopAutoplay);
    sliderWrapper.addEventListener("mouseleave", () => {
      if (ScrollTrigger.isInViewport(sliderWrapper)) startAutoplay();
    });

    slides.forEach((slide, i) => {
      slide.addEventListener("click", () => {
        loop.toIndex(i, { ease: "osmo-ease", duration: 0.725 });
      });
    });

    if (bullets && bullets.length > 0) {
      bullets.forEach((bullet, i) => {
        bullet.addEventListener("click", () => {
          loop.toIndex(i, { ease: "osmo-ease", duration: 0.725 });
          if (activeBullet) activeBullet.classList.remove("active");
          bullet.classList.add("active");
          activeBullet = bullet;
          bullets.forEach((b, j) => {
            b.setAttribute("aria-selected", j === i ? "true" : "false");
          });
        });
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = slides.length - 1;
        loop.toIndex(newIndex, { ease: "osmo-ease", duration: 0.725 });
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= slides.length) newIndex = 0;
        loop.toIndex(newIndex, { ease: "osmo-ease", duration: 0.725 });
      });
    }
  });
}

// GSAP Helper function to create a looping slider
function horizontalLoop(items, config) {
  let timeline;
  items = gsap.utils.toArray(items);
  config = config || {};
  gsap.context(() => {
    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({repeat: config.repeat, onUpdate: onChange && function() {
          let i = tl.closestIndex();
          if (lastIndex !== i) {
            lastIndex = i;
            onChange(items[i], i);
          }
        }, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      spaceBefore = [],
      xPercents = [],
      curIndex = 0,
      indexIsDirty = false,
      center = config.center,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
      timeOffset = 0,
      container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
      totalWidth,
      getTotalWidth = () => items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + spaceBefore[0] + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0),
      populateWidths = () => {
        let b1 = container.getBoundingClientRect(), b2;
        items.forEach((el, i) => {
          widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
          xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] * 100 + gsap.getProperty(el, "xPercent"));
          b2 = el.getBoundingClientRect();
          spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
          b1 = b2;
        });
        gsap.set(items, {
          xPercent: i => xPercents[i]
        });
        totalWidth = getTotalWidth();
      },
      timeWrap,
      populateOffsets = () => {
        timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0;
        center && times.forEach((t, i) => {
          times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset);
        });
      },
      getClosest = (values, value, wrap) => {
        let i = values.length,
          closest = 1e10,
          index = 0, d;
        while (i--) {
          d = Math.abs(values[i] - value);
          if (d > wrap / 2) {
            d = wrap - d;
          }
          if (d < closest) {
            closest = d;
            index = i;
          }
        }
        return index;
      },
      populateTimeline = () => {
        let i, item, curX, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = xPercents[i] / 100 * widths[i];
          distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
          distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
          tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
            .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, tl.duration());
      },
      refresh = (deep) => {
        let progress = tl.progress();
        tl.progress(0, true);
        populateWidths();
        deep && populateTimeline();
        populateOffsets();
        deep && tl.draggable ? tl.time(times[curIndex], true) : tl.progress(progress, true);
      },
      onResize = () => refresh(true),
      proxy;
    gsap.set(items, {x: 0});
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);
    function toIndex(index, vars) {
      vars = vars || {};
      (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) {
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = {time: timeWrap};
      }
      curIndex = newIndex;
      vars.overwrite = true;
      gsap.killTweensOf(proxy);
      return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
    }
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.closestIndex = setCurrent => {
      let index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
    tl.next = vars => toIndex(tl.current()+1, vars);
    tl.previous = vars => toIndex(tl.current()-1, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true);
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    if (config.draggable && typeof(Draggable) === "function") {
      proxy = document.createElement("div")
      let wrap = gsap.utils.wrap(0, 1),
        ratio, startProgress, draggable, dragSnap, lastSnap, initChangeX, wasPlaying,
        align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
        syncIndex = () => tl.closestIndex(true);
      typeof(InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club");
      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode,
        type: "x",
        onPressInit() {
          let x = this.x;
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          initChangeX = (startProgress / -ratio) - x;
          gsap.set(proxy, {x: startProgress / -ratio});
        },
        onDrag: align,
        onThrowUpdate: align,
        overshootTolerance: 0,
        inertia: true,
        snap(value) {
          if (Math.abs(startProgress / -ratio - this.x) < 10) {
            return lastSnap + initChangeX
          }
          let time = -(value * ratio) * tl.duration(),
            wrappedTime = timeWrap(time),
            snapTime = times[getClosest(times, wrappedTime, tl.duration())],
            dif = snapTime - wrappedTime;
          Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease() {
          syncIndex();
          draggable.isThrowing && (indexIsDirty = true);
        },
        onThrowComplete: () => {
          syncIndex();
          wasPlaying && tl.play();
        }
      })[0];
      tl.draggable = draggable;
    }
    tl.closestIndex(true);
    lastIndex = curIndex;
    onChange && onChange(items[curIndex], curIndex);
    timeline = tl;
    return () => window.removeEventListener("resize", onResize);
  });
  return timeline;
}

// FAQ Accordion Functionality with Smooth GSAP Animations
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const content = answer.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');

        // Set initial states
        gsap.set(answer, { height: 0 });
        gsap.set(content, { opacity: 1, y: 0 });

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other FAQ items with smooth animations
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherContent = otherAnswer.querySelector('.faq-content');
                    const otherIcon = otherItem.querySelector('.faq-icon');

                    // Smooth close animation
                    gsap.to(otherContent, {
                        opacity: 0,
                        y: -10,
                        duration: 0.2,
                        ease: "power1.in"
                    });

                    gsap.to(otherAnswer, {
                        height: 0,
                        duration: 0.4,
                        ease: "power2.inOut",
                        delay: 0.1
                    });

                    gsap.to(otherIcon, {
                        rotation: 0,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });

                    otherItem.classList.remove('active');
                }
            });

            if (!isActive) {
                // Open this item with smooth animation
                item.classList.add('active');

                // Calculate dynamic height
                gsap.set(answer, { height: "auto" });
                const targetHeight = answer.offsetHeight;
                gsap.set(answer, { height: 0 });

                // Animate height expansion
                gsap.to(answer, {
                    height: targetHeight,
                    duration: 0.5,
                    ease: "power2.out"
                });

                // Content fade-in with slight delay and slide up
                gsap.fromTo(content,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        delay: 0.2,
                        ease: "power1.out"
                    }
                );

                // Enhanced icon rotation with bounce
                gsap.to(icon, {
                    rotation: 45,
                    duration: 0.4,
                    ease: "back.out(1.7)"
                });

            } else {
                // Close this item
                gsap.to(content, {
                    opacity: 0,
                    y: -10,
                    duration: 0.2,
                    ease: "power1.in"
                });

                gsap.to(answer, {
                    height: 0,
                    duration: 0.4,
                    ease: "power2.inOut",
                    delay: 0.1
                });

                gsap.to(icon, {
                    rotation: 0,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });

                item.classList.remove('active');
            }
        });

        // Add hover micro-interactions
        question.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active')) {
                gsap.to(item, {
                    scale: 1.02,
                    duration: 0.2,
                    ease: "power1.out"
                });
            }
        });

        question.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                duration: 0.2,
                ease: "power1.out"
            });
        });
    });
}

// Directional Button Hover Effects
function initDirectionalButtonHovers() {
    const buttons = document.querySelectorAll('[data-btn-hover]');

    buttons.forEach(button => {
        const circle = button.querySelector('.btn__circle');
        const circleWrap = button.querySelector('.btn__circle-wrap');

        button.addEventListener('mouseenter', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set initial position
            circle.style.left = x + 'px';
            circle.style.top = y + 'px';

            // Trigger expand animation
            circle.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update position during hover
            circle.style.left = x + 'px';
            circle.style.top = y + 'px';
        });

        button.addEventListener('mouseleave', () => {
            // Trigger shrink animation
            circle.style.transform = 'translate(-50%, -50%) scale(0)';
        });
    });
}

// Industries Looping Words Animation
function initLoopingWordsWithSelector() {
    const wordList = document.querySelector('[data-looping-words-list]');
    const words = Array.from(wordList.children);
    const totalWords = words.length;
    const wordHeight = 100 / totalWords; // Offset as a percentage
    const edgeElement = document.querySelector('[data-looping-words-selector]');
    let currentIndex = 0;

    function updateEdgeWidth() {
        const centerIndex = (currentIndex + 1) % totalWords;
        const centerWord = words[centerIndex];
        const centerWordWidth = centerWord.getBoundingClientRect().width;
        const listWidth = wordList.getBoundingClientRect().width;
        const percentageWidth = (centerWordWidth / listWidth) * 100;

        gsap.to(edgeElement, {
            width: `${percentageWidth}%`,
            duration: 0.5,
            ease: 'expo.out',
        });
    }

    function moveWords() {
        currentIndex++;

        gsap.to(wordList, {
            yPercent: -wordHeight * currentIndex,
            duration: 1.2,
            ease: 'elastic.out(1, 0.85)',
            onStart: updateEdgeWidth,
            onComplete: function() {
                if (currentIndex >= totalWords - 3) {
                    wordList.appendChild(wordList.children[0]);
                    currentIndex--;
                    gsap.set(wordList, { yPercent: -wordHeight * currentIndex });
                    words.push(words.shift());
                }
            }
        });
    }

    updateEdgeWidth();

    gsap.timeline({ repeat: -1, delay: 1 })
        .call(moveWords)
        .to({}, { duration: 2 })
        .repeat(-1);
}

// Demo Form Handler
function initDemoForm() {
    const demoForm = document.getElementById('demoForm');

    if (!demoForm) return;

    demoForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(demoForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const industry = formData.get('industry');

        // Basic validation
        if (!name || !email || !industry) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate form submission
        const submitBtn = demoForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.querySelector('.btn__text').textContent;

        submitBtn.querySelector('.btn__text').textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            alert(`Thank you ${name}! We'll contact you soon about your ${industry} project demo.`);
            demoForm.reset();
            submitBtn.querySelector('.btn__text').textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // Add input validation feedback
    const inputs = demoForm.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value) {
                this.style.borderColor = '#dc2626';
            } else {
                this.style.borderColor = '';
            }
        });

        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(220, 38, 38)') {
                this.style.borderColor = '';
            }
        });
    });
}

// Logo Reveal Loader
function initLogoRevealLoader() {
    gsap.registerPlugin(CustomEase, SplitText);
    CustomEase.create("loader", "0.65, 0.01, 0.05, 0.99");

    const wrap = document.querySelector("[data-load-wrap]");
    if (!wrap) return;

    const container = wrap.querySelector("[data-load-container]");
    const bg = wrap.querySelector("[data-load-bg]");
    const progressBar = wrap.querySelector("[data-load-progress]");
    const logo = wrap.querySelector("[data-load-logo]");
    const textElements = Array.from(wrap.querySelectorAll("[data-load-text]"));

    // Reset targets that are not split text targets
    const resetTargets = Array.from(
        wrap.querySelectorAll('[data-load-reset]:not([data-load-text])')
    );

    // Main loader timeline
    const loadTimeline = gsap.timeline({
        defaults: {
            ease: "loader",
            duration: 3
        }
    })
    .set(wrap, { display: "block" })
    .to(progressBar, { scaleX: 1 })
    .to(logo, { clipPath: "inset(0% 0% 0% 0%)" }, "<")
    .to(container, { autoAlpha: 0, duration: 0.5 })
    .to(progressBar, { scaleX: 0, transformOrigin: "right center", duration: 0.5 }, "<")
    .add("hideContent", "<")
    .to(bg, { yPercent: -101, duration: 1 }, "hideContent")
    .set(wrap, { display: "none" })

    // If there are items to hide FOUC for, reset them at the start
    if (resetTargets.length) {
        loadTimeline.set(resetTargets, { autoAlpha: 1 }, 0);
    }

    // If there's text items, split them, and add to load timeline
    if (textElements.length >= 2) {
        const firstWord = new SplitText(textElements[0], { type: "lines,chars", mask: "lines" });
        const secondWord = new SplitText(textElements[1], { type: "lines,chars", mask: "lines" });

        // Set initial states of the text elements and letters
        gsap.set([firstWord.chars, secondWord.chars], { autoAlpha: 0, yPercent: 125 });
        gsap.set(textElements, { autoAlpha: 1 });

        // first text in
        loadTimeline.to(firstWord.chars, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.6,
            stagger: { each: 0.02 }
        }, 0);

        // first text out while second text in
        loadTimeline.to(firstWord.chars, {
            autoAlpha: 0,
            yPercent: -125,
            duration: 0.4,
            stagger: { each: 0.02 }
        }, ">+=0.4");

        loadTimeline.to(secondWord.chars, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.6,
            stagger: { each: 0.02 }
        }, "<");

        // second text out
        loadTimeline.to(secondWord.chars, {
            autoAlpha: 0,
            yPercent: -125,
            duration: 0.4,
            stagger: { each: 0.02 }
        }, "hideContent-=0.5");
    }
}

// Tab System with Autoplay
function initTabSystem() {
    const wrappers = document.querySelectorAll('[data-tabs="wrapper"]');

    wrappers.forEach((wrapper) => {
        const contentItems = wrapper.querySelectorAll('[data-tabs="content-item"]');
        const visualItems = wrapper.querySelectorAll('[data-tabs="visual-item"]');

        const autoplay = wrapper.dataset.tabsAutoplay === "true";
        const autoplayDuration = parseInt(wrapper.dataset.tabsAutoplayDuration) || 5000;

        let activeContent = null; // keep track of active item/link
        let activeVisual = null;
        let isAnimating = false;
        let progressBarTween = null; // to stop/start the progress bar

        function startProgressBar(index) {
            if (progressBarTween) progressBarTween.kill();
            const bar = contentItems[index].querySelector('[data-tabs="item-progress"]');
            if (!bar) return;

            // In this function, you can basically do anything you want, that should happen as a tab is active
            // Maybe you have a circle filling, some other element growing, you name it.
            gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
            progressBarTween = gsap.to(bar, {
                scaleX: 1,
                duration: autoplayDuration / 1000,
                ease: "power1.inOut",
                onComplete: () => {
                    if (!isAnimating) {
                        const nextIndex = (index + 1) % contentItems.length;
                        switchTab(nextIndex); // once bar is full, set next to active – this is important
                    }
                },
            });
        }

        function switchTab(index) {
            if (isAnimating || contentItems[index] === activeContent) return;

            isAnimating = true;
            if (progressBarTween) progressBarTween.kill(); // Stop any running progress bar here

            const outgoingContent = activeContent;
            const outgoingVisual = activeVisual;
            const outgoingBar = outgoingContent?.querySelector('[data-tabs="item-progress"]');

            const incomingContent = contentItems[index];
            const incomingVisual = visualItems[index];
            const incomingBar = incomingContent.querySelector('[data-tabs="item-progress"]');

            outgoingContent?.classList.remove("active");
            outgoingVisual?.classList.remove("active");
            incomingContent.classList.add("active");
            incomingVisual.classList.add("active");

            const tl = gsap.timeline({
                defaults: { duration: 0.65, ease: "power3" },
                onComplete: () => {
                    activeContent = incomingContent;
                    activeVisual = incomingVisual;
                    isAnimating = false;
                    if (autoplay) startProgressBar(index); // Start autoplay bar here
                },
            });

            // Wrap 'outgoing' in a check to prevent warnings on first run of the function
            // Of course, during first run (on page load), there's no 'outgoing' tab yet!
            if (outgoingContent) {
                outgoingContent.classList.remove("active");
                outgoingVisual?.classList.remove("active");
                tl.set(outgoingBar, { transformOrigin: "right center" })
                    .to(outgoingBar, { scaleX: 0, duration: 0.3 }, 0)
                    .to(outgoingVisual, { autoAlpha: 0, xPercent: 3 }, 0)
                    .to(outgoingContent.querySelector('[data-tabs="item-details"]'), { height: 0 }, 0);
            }

            incomingContent.classList.add("active");
            incomingVisual.classList.add("active");
            tl.fromTo(incomingVisual, { autoAlpha: 0, xPercent: 3 }, { autoAlpha: 1, xPercent: 0 }, 0.3)
                .fromTo(incomingContent.querySelector('[data-tabs="item-details"]'), { height: 0 }, { height: "auto" }, 0)
                .set(incomingBar, { scaleX: 0, transformOrigin: "left center" }, 0);
        }

        // on page load, set first to active
        // idea: you could wrap this in a scrollTrigger
        // so it will only start once a user reaches this section
        switchTab(0);

        // switch tabs on click
        contentItems.forEach((item, i) =>
            item.addEventListener("click", (e) => {
                e.preventDefault();
                if (item === activeContent) return; // ignore click if current one is already active
                switchTab(i);
            })
        );
    });
}

// Logo Wall Cycle Animation
function initLogoWallCycle() {
    const loopDelay = 1.5;   // Loop Duration
    const duration  = 0.9;   // Animation Duration

    document.querySelectorAll('[data-logo-wall-cycle-init]').forEach(root => {
        const list   = root.querySelector('[data-logo-wall-list]');
        const items  = Array.from(list.querySelectorAll('[data-logo-wall-item]'));

        const shuffleFront = root.getAttribute('data-logo-wall-shuffle') !== 'false';
        const originalTargets = items
            .map(item => item.querySelector('[data-logo-wall-target]'))
            .filter(Boolean);

        let visibleItems   = [];
        let visibleCount   = 0;
        let pool           = [];
        let pattern        = [];
        let patternIndex   = 0;
        let tl;

        function isVisible(el) {
            return window.getComputedStyle(el).display !== 'none';
        }

        function shuffleArray(arr) {
            const a = arr.slice();
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        let cyclingInterval = null;

        function resetLogoTransform(element) {
            // Helper function to ensure consistent logo positioning - GSAP handles all centering
            gsap.set(element, {
                xPercent: -50,
                yPercent: -50,
                autoAlpha: 1,
                scale: 1,
                rotation: 0,
                x: 0,
                y: 0,
                transformOrigin: "center center"
            });
        }

        function setup() {
            if (tl) {
                tl.kill();
                tl = null;
            }
            if (cyclingInterval) {
                clearInterval(cyclingInterval);
                cyclingInterval = null;
            }
            visibleItems = items.filter(isVisible);
            visibleCount = visibleItems.length;

            pattern = shuffleArray(
                Array.from({ length: visibleCount }, (_, i) => i)
            );
            patternIndex = 0;

            // remove all injected targets
            items.forEach(item => {
                item.querySelectorAll('[data-logo-wall-target]').forEach(old => old.remove());
            });

            pool = originalTargets.map(n => n.cloneNode(true));

            let front, rest;
            if (shuffleFront) {
                const shuffledAll = shuffleArray(pool);
                front = shuffledAll.slice(0, visibleCount);
                rest  = shuffleArray(shuffledAll.slice(visibleCount));
            } else {
                front = pool.slice(0, visibleCount);
                rest  = shuffleArray(pool.slice(visibleCount));
            }
            pool = front.concat(rest);

            // Initialize visible logos with proper GSAP setup
            for (let i = 0; i < visibleCount; i++) {
                const parent =
                    visibleItems[i].querySelector('[data-logo-wall-target-parent]') ||
                    visibleItems[i];
                const logo = pool.shift();

                // Apply consistent GSAP properties to initial logos
                resetLogoTransform(logo);
                parent.appendChild(logo);
            }

            // Start cycling with interval instead of buggy timeline
            startCycling();
        }

        function startCycling() {
            // Clear any existing interval
            if (cyclingInterval) {
                clearInterval(cyclingInterval);
            }

            // Start cycling with proper timing
            cyclingInterval = setInterval(() => {
                if (pool.length > 0) {
                    swapNext();
                }
            }, loopDelay * 1000);
        }

        function swapNext() {
            const nowCount = items.filter(isVisible).length;
            if (nowCount !== visibleCount) {
                setup();
                return;
            }
            // Safety checks
            if (!pool.length) {
                console.warn('Logo wall pool is empty, refilling...');
                // Refill pool with copies of original targets
                pool = originalTargets.map(n => n.cloneNode(true));
                return;
            }

            const idx = pattern[patternIndex % visibleCount];
            patternIndex++;

            const container = visibleItems[idx];
            const parent =
                container.querySelector('[data-logo-wall-target-parent]') ||
                container;
            const existing = parent.querySelectorAll('[data-logo-wall-target]');
            if (existing.length > 1) return;

            const current = parent.querySelector('[data-logo-wall-target]');
            const incoming = pool.shift();

            if (!current || !incoming) {
                console.warn('Missing current or incoming logo element');
                return;
            }

            // Set initial state - incoming logo starts below center
            gsap.set(incoming, {
                xPercent: -50,
                yPercent: 0,
                autoAlpha: 0,
                scale: 1,
                rotation: 0,
                x: 0,
                y: 0,
                transformOrigin: "center center"
            });
            parent.appendChild(incoming);

            if (current) {
                gsap.to(current, {
                    yPercent: -100,
                    autoAlpha: 0,
                    duration,
                    ease: "expo.inOut",
                    onComplete: () => {
                        if (current.parentNode) {
                            current.remove();
                        }
                        // Reset all properties and return to pool
                        resetLogoTransform(current);
                        pool.push(current);
                    }
                });
            }

            // Animate incoming logo to centered position
            gsap.to(incoming, {
                yPercent: -50,
                autoAlpha: 1,
                duration: duration,
                delay: 0.1,
                ease: "expo.inOut"
            });
        }

        setup();

        ScrollTrigger.create({
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            onEnter: () => {
                if (!cyclingInterval) startCycling();
            },
            onLeave: () => {
                if (cyclingInterval) {
                    clearInterval(cyclingInterval);
                    cyclingInterval = null;
                }
            },
            onEnterBack: () => {
                if (!cyclingInterval) startCycling();
            },
            onLeaveBack: () => {
                if (cyclingInterval) {
                    clearInterval(cyclingInterval);
                    cyclingInterval = null;
                }
            }
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (cyclingInterval) {
                    clearInterval(cyclingInterval);
                    cyclingInterval = null;
                }
            } else {
                if (!cyclingInterval) startCycling();
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  initLogoRevealLoader();
  initSliders();
  initFAQ();
  initDirectionalButtonHovers();
  initLoopingWordsWithSelector();
  initDemoForm();
  initTabSystem();
  initLogoWallCycle();
});

console.log('🚀 Website loaded successfully!');