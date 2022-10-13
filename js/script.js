const sectionsForScroll = gsap.utils.toArray('.sections');

// Timeline Intro
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.to(".intro-img", {y: "0", duration: 1, delay: .5});
tl.to(".intro-title", {y: "0", duration: 1}, "-=0.5");
tl.set(".intro-img", { attr: { src: "./img/Cow-resized.png" }, delay: 1 });
tl.to(".intro-title", {opacity: 0, duration: 1}, "-=1");
tl.to(".intro-profile-title", {x: "0%", duration: 1}, "-=1");
tl.to(".scroll-down", {opacity: 1, duration: 2});

// Timeline Projects
const tlProjects = gsap.timeline({ defaults: { ease: "power1.out" } });

tlProjects.to(".my-project-title", {y: "0", duration: 1, delay: .5});


// Page Loads
let currentActive;
const beenHere = localStorage.getItem("mingrkliBeenHere");

window.addEventListener("DOMContentLoaded", () => {
    // Checks to see if the user has been here before
    if (!beenHere) {
        localStorage.setItem("mingrkliBeenHere", 1);
    }
    else if (beenHere) {
        currentActive = localStorage.getItem('MingrkliCurrentActive');

        // Removes active class from all sections that isn't currentActive
        for (let i = 0; i < sectionsForScroll.length; i++) {
            if (i != currentActive) {
                sectionsForScroll[i].classList.remove('active');
            }
            else {
                sectionsForScroll[i].classList.add('active');
            }
        }

        // Scrolls to active section
        gsap.to(window, {duration: 1, scrollTo: sectionsForScroll[currentActive], ease: "power1"});

    }

    // Show background particles canvas
    gsap.fromTo("#canvas1", {opacity: "0"}, {opacity: "1", duration: 10, delay: 2.5});  
})

// When user scrolls, move to different sections
let isScrolling = 0;

window.addEventListener('wheel', (e) => {    
    // Removes the howdy
    document.getElementById('howdy').innerText = '';

    // Current page section
    let currentActive;

    if (isScrolling === 0) {
        // Saves current section with active class to currentActive variable
        for (let i = 0; i < sectionsForScroll.length; i ++) {
            if (sectionsForScroll[i].classList.contains('active')) {
                currentActive = i;
            }
        }
    
        // Down
        if (e.deltaY > 0) {
            // If not last section
            if (currentActive !== sectionsForScroll.length - 1) {
                isScrolling = 1;
                sectionsForScroll[currentActive].classList.remove('active');
                sectionsForScroll[currentActive + 1].classList.add('active');
                currentActive += 1;
                scrollToActive(currentActive)
                localStorage.setItem('MingrkliCurrentActive', currentActive);
            }
        
        }
        // Up
        else if (e.deltaY < 0) {
        // If not first section
            if (currentActive !== 0) {
                isScrolling = 1;
                sectionsForScroll[currentActive].classList.remove('active');
                sectionsForScroll[currentActive - 1].classList.add('active');
                currentActive -= 1;
                scrollToActive(currentActive);
                localStorage.setItem('MingrkliCurrentActive', currentActive);
            }
        }

        setTimeout(() => {
            isScrolling = 0;
        }, 2000)
    }

});

// translates Y the sections to which active section it is
function scrollToActive(currentActive) {
    const tlReverse = gsap.timeline({ defaults: { ease: "power1.out" } });

    tl.reverse(2.5);
    tlProjects.reverse(1);

    tlReverse.to(window, {duration: 1, scrollTo: sectionsForScroll[currentActive], ease: "power1", delay: .5 });
}

sectionsForScroll.forEach(section => {
    ScrollTrigger.create ({
        trigger: section,
        start: "center",
        end: "center",
        // markers: true,
        onEnter: () => {
            tl.play();
            tlProjects.play();
        },
        onEnterBack: () => {
            tl.play();
            tlProjects.play();
        },
        // onLeave: () => tl.pause(),
        // onLeaveBack: () => tl.restart(),
    })
})