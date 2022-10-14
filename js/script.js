const sectionsForScroll = gsap.utils.toArray('.sections');

/* Time line
========================================================== */
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

// Timeline About Me
const tlAboutMe = gsap.timeline({ defaults: { ease: "power1.out" } });

tlAboutMe.to(".about-me-text", {y: "0", duration: 1, delay: .5, stagger: .5});
tlAboutMe.to(".about-me-quote", {opacity: 1, duration: 1}, "-=.1");

// Timeline Comments
const tlComments = gsap.timeline({ defaults: { ease: "power1.out" } });

tlComments.to(".comments-title", {y: "0", duration: 1});
tlComments.to(".card", {opacity: 1, duration: 1, stagger: 0.1}, "-=1");

/* Page Laods
========================================================== */
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
})

/* Scrolling Detect
========================================================== */
// When user scrolls, move to different sections
let isScrolling = 0;

window.addEventListener('wheel', (e) => {    
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


/* Phone Scrolling Detect
========================================================== */
let touchPos;

// store the touching position at the start of each touch
window.addEventListener('touchstart', (e) => {
    touchPos = e.changedTouches[0].clientY;
})

// detect wether the "old" touchPos is 
// greater or smaller than the newTouchPos
window.addEventListener('touchmove', (e) => {
    // Current page section
    let currentActive;
    // Current touchPos
    let newTouchPos = e.changedTouches[0].clientY;

    if (isScrolling === 0) {
        // Saves current section with active class to currentActive variable
        for (let i = 0; i < sectionsForScroll.length; i ++) {
            if (sectionsForScroll[i].classList.contains('active')) {
                currentActive = i;
            }
        }
    
        // Phone Scroll Up moves Section Down
        if (newTouchPos < touchPos) {
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
        // Phone Scroll Down moves Section Up
        else if (newTouchPos > touchPos) {
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

/* Scrolling functions
========================================================== */
// translates Y the sections to which active section it is
function scrollToActive(currentActive) {
    const tlReverse = gsap.timeline({ defaults: { ease: "power1.out" } });

    tl.reverse(2.5);
    tlProjects.reverse(1);
    tlAboutMe.reverse(2);
    tlComments.reverse(0.5);

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
            tlAboutMe.play();
            tlComments.play();
        },
        onEnterBack: () => {
            tl.play();
            tlProjects.play();
            tlAboutMe.play();
            tlComments.play();
        },
        // onLeave: () => tl.pause(),
        // onLeaveBack: () => tl.restart(),
    })
});

/* Navigation
========================================================== */
// Small screen size menu
let menu = document.querySelector('.navigation i');

// Shows the menu options when click menu icon
menu.addEventListener('click', () => {
    menu.toggleAttribute("data-selected");
})

// User navigation click
let navBtns = document.querySelectorAll('nav button');

for (let i = 0; i < navBtns.length; i++) {    
    // When user click nav btn
    navBtns[i].addEventListener('click', () => {
        // hides the menu options
        menu.removeAttribute('data-selected');

        // Save the currentActive to the btn value of the user clicked
        let currentActive = navBtns[i].value;
        let lastActive;
        let count = 0;

        // Removes active on each section
        sectionsForScroll.forEach(section => {
            if (section.classList.contains('active')) {
                lastActive = count;
            }

            section.classList.remove('active');
            count++;
        })

        // Adds active class to user nav value
        sectionsForScroll[currentActive].classList.add('active');
        // Saves it to localStorage
        localStorage.setItem('MingrkliCurrentActive', currentActive);
        // Scrolls to active
        scrollToActive(currentActive);

        // int and string however that will work with == in JavaScript
        if (lastActive == currentActive) {
            tl.play();
            tlProjects.play();
            tlAboutMe.play();
            tlComments.play();
        }
    })
}