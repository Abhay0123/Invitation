/*Copy text restriction*/





/*end*/

const openingScreen = document.getElementById("openingScreen");
const weddingMusic = document.getElementById("weddingMusic");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
let invitationStarted = false;
document.body.classList.add("locked");

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

function beginInvitation(event) {
  if (event) event.preventDefault();
  if (invitationStarted) return;
  invitationStarted = true;
  if (weddingMusic) {
    weddingMusic.volume = 0.55;
    const playPromise = weddingMusic.play();
    if (playPromise !== undefined) playPromise.catch(() => {});
  }
  openingScreen.classList.add("hidden");
  document.body.classList.remove("locked");
}
openingScreen.addEventListener("pointerup", beginInvitation, {passive:false});
openingScreen.addEventListener("click", beginInvitation);
openingScreen.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") beginInvitation(event);
});

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("active");
  hamburger.textContent = isOpen ? "✕" : "☰";
  hamburger.setAttribute("aria-expanded", String(isOpen));
  hamburger.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    navMenu.classList.remove("active");
    hamburger.textContent = "☰";
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open navigation menu");
  });
});

const weddingDate = new Date("November 30, 2026 19:00:00").getTime();
function updateCountdown() {
  const distance = weddingDate - Date.now();
  if (distance <= 0) {
    document.getElementById("countdown").innerHTML = "<h3>Today is the big day! 💍</h3>";
    return;
  }
  document.getElementById("days").textContent = String(Math.floor(distance / 86400000)).padStart(2, "0");
  document.getElementById("hours").textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, "0");
  document.getElementById("minutes").textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, "0");
  document.getElementById("seconds").textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 70, 350)}ms`;
  revealObserver.observe(element);
});


/*Autoscroll*/
/* =========================================
   ADISHIV AUTO SCROLL
========================================= */

let autoScroll = false;
let scrollSpeed = 0.5;

function startAutoScroll() {

    if (autoScroll) return;

    autoScroll = true;

    function scrollPage() {

        if (!autoScroll) return;

        window.scrollBy(0, scrollSpeed);

        // Stop at bottom
        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 2
        ) {
            autoScroll = false;
            return;
        }

        requestAnimationFrame(scrollPage);
    }

    requestAnimationFrame(scrollPage);
}

function stopAutoScroll() {
    autoScroll = false;
}
//startAutoScroll();

/*js for 6 imagers cards*/
/* =========================================================
   RING CEREMONY
   BUTTERFLY ANIMATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const butterflies =
        document.querySelectorAll(".ring-butterfly");


    /* =========================================
       Give each butterfly a different delay
       ========================================= */

    butterflies.forEach(function (butterfly, index) {

        butterfly.style.animationDelay =
            `${index * -4}s`;

    });


    /* =========================================
       Slight natural floating movement
       ========================================= */

    butterflies.forEach(function (butterfly) {

        let time =
            Math.random() * Math.PI * 2;

        const speed =
            0.008 + Math.random() * 0.006;

        function naturalFloat() {

            time += speed;

            /*
               Small vertical floating movement.
               This is intentionally subtle so the
               main flight path remains smooth.
            */

            const floatY =
                Math.sin(time) * 5;

            const floatX =
                Math.cos(time * 0.7) * 3;


            /*
               We don't directly modify transform here,
               because CSS controls the main flight path.
               Instead, use a CSS custom property.
            */

            butterfly.style.setProperty(
                "--natural-x",
                `${floatX}px`
            );

            butterfly.style.setProperty(
                "--natural-y",
                `${floatY}px`
            );


            requestAnimationFrame(
                naturalFloat
            );
        }


        naturalFloat();

    });

});
