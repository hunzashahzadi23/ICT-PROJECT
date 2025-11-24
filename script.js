//loader scrreen animation:

document.addEventListener("DOMContentLoaded", () => {
    // Check if mobile (screen width < 768px)
    if (window.innerWidth < 768) {
        // Hide preloader immediately
        const preloader = document.querySelector('.preloader');
        if (preloader) preloader.style.display = 'none';
        
        // Ensure scrolling is enabled
        document.body.classList.remove("no-scroll");
        
        // Start animations immediately without delay
        initAnimations();
        return; // Exit the function so the loader logic below doesn't run
    }

    const counterEl = document.querySelector('.counter');
    document.body.classList.add("no-scroll");
    let count = 0;
    const countInterval = setInterval(() => {
        count++;
        counterEl.innerText = count + "%";
        if (count === 100) {
            clearInterval(countInterval);
            gsap.to('.counter', { 
                opacity: 0,
                duration: 0.5 
            });
            gsap.to('.panel-top', { 
                yPercent: -100,
                 duration: 1.2,
                  ease: "power4.inOut", 
                  delay: 0.5
                 });
            gsap.to('.panel-bottom', { 
                yPercent: 100, 
                duration: 1.2, 
                ease: "power4.inOut", 
                delay: 0.5 
            });
            gsap.to('.preloader', {
                opacity: 0,
                duration: 0.5,
                delay: 1.4,
                onComplete: () => {
                    document.querySelector('.preloader').style.display = "none";
                    document.body.classList.remove("no-scroll");
                }
            });
            setTimeout(initAnimations, 900);
        }
    }, 12);
});

// Menu logic 
function toggleMenu() {
    const menu = document.getElementById('menuOverlay');
    menu.classList.toggle('active');
    const links = gsap.utils.toArray(menu.querySelectorAll('.menu-link'));
    if(menu.classList.contains('active')) {
        gsap.to(links, {
            opacity: 1,
            y: 0, 
            stagger: 0.2,//time bw animes
            delay: 0.4 //time after whole anime starts
        });
    } else {
        gsap.to(links, {
            opacity: 0, 
            y: 30, 
        });
    }
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    //about speciality
    //using typespilit
    const typeSplit = new SplitType('.reveal-text, .reveal-hero', {
         types: 'lines, words', 
         tagName: 'span' });
    // Chopped lines now converting into elems
    document.querySelectorAll('.line').forEach(line => { 
        line.innerHTML = `<div class="line-inner">${line.innerHTML}</div>`; 
    });
     
    //applying real anime
    gsap.utils.toArray('.line-inner').forEach(inner => {
        gsap.to(inner, {
            y: '0%',
             opacity: 1, 
             duration: 1.2, 
             ease: 'power4.out',
            scrollTrigger: { 
                trigger: inner.closest('.section') || inner.closest('header'), 
                start: 'top 80%', 
                toggleActions: 'play none none reverse' //onenter onleave onenterback onleaveback
            }
        });
    });


// CURSOR LOGIC
const pookie = document.querySelector('.cursor');
gsap.set(pookie, { 
    xPercent: -50, 
    yPercent: -50 
});
window.addEventListener('mousemove', (e) => {
    gsap.to(pookie, {
        x: e.clientX, 
        y: e.clientY, 
        duration: 0.5
    }); 
});

// Pookie will scale up when we hover on these
const hoverTargets = document.querySelectorAll('a, button, .exp-row, .edu-card, .menu-trigger, .magnetic-btn, .work-btn, .social-link');
hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(pookie, {
            scale: 1.5,
            duration: 0.3
        });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(pookie, {
            scale: 1, 
            duration: 0.3
        });
    });
});

// Hero Tilt
const hero = document.querySelector('.hero-content');
const tiltWrapper = document.querySelector('.tilt-wrapper');
hero.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth -0.5) * 30; //angle to rotate
    const y = (e.clientY / window.innerHeight -0.5) * 30;
    gsap.to(tiltWrapper, { 
        rotationY: x, //rotates left and right
        rotationX: -y, //rotate top and bottom
        duration: 0.5
     });
});
hero.addEventListener('mouseleave', () => 
    gsap.to(tiltWrapper, { 
        rotationY: 0,
         rotationX: 0, 
         duration: 0.5 
        }
    ));


    // skills animation:
    gsap.utils.toArray('.progress-fill').forEach(bar => {
        gsap.fromTo(bar, 
            { width: "0%"
             }, 
            { 
                width: bar.getAttribute('data-width'), 
                duration: 1.5, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 90%", 
                    toggleActions: "play none none reverse" 
                }
            }
        );
    });

// Experience Hover Reveal
const expRows = document.querySelectorAll('.exp-row');
const revealBox = document.querySelector('.hover-reveal');
const revealImg = document.querySelector('.reveal-img');

expRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        revealImg.src = row.getAttribute('data-img');
        gsap.to(revealBox, {
            opacity: 1,
             scale: 1, 
             duration: 0.2
            });
    });
    row.addEventListener('mouseleave', () =>
         gsap.to(revealBox, {
            opacity: 0, 
            scale: 0.8, 
            duration: 0.2
        }));
    row.addEventListener('mousemove', (e) => 
        gsap.to(revealBox, { 
            x: e.clientX, 
            y: e.clientY, 
            duration: 0.5 
        }));
});

// Magnetic Button
const btn = document.querySelector('.magnetic-btn');
btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - (rect.width / 2); //shifting the origin to btn's origin
    const y = e.clientY - rect.top -( rect.height / 2);
    gsap.to(btn, { 
        x: x * 0.3, 
        y: y * 0.3,
         duration: 0.3
         });
});
btn.addEventListener('mouseleave', () =>
     gsap.to(btn, 
        { x: 0,
             y: 0,
              duration: 0.5, 
              ease: "elastic.out(1, 0.3)" }));
}
