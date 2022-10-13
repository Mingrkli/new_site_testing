const projectsGrid = document.querySelector('.my-projects-grid');
const cardContainer = document.querySelector('.card-container');

window.addEventListener("DOMContentLoaded", () => {
    loadProjects();
    tlProjects.to(".project", {opacity: 1, duration: 1, stagger: .1}, "-=1");
})

function loadProjects() {
    projectsGrid.innerHTML = '';

    for (let i = 0; i < projects.length; i++) {
        let div = document.createElement('a');
        div.classList.add("project");
        div.setAttribute("target", "_blank");
    
        let inner = `
        <div>
            <img class="project-grid-img" src="${projects[i].img}" alt="placeholder" class="grid-button">

            <div class="project-grid-hover-bg">
                <p class="project-grid-hover-text">${projects[i].title}</p>
            </div>
        </div>
        `;

        div.innerHTML += inner;
        projectsGrid.append(div);

        div.addEventListener('click', () => {
            projectPopup(projects[i].img, projects[i].title, projects[i].popup.link, projects[i].popup.subDesc);
            toggleCardContainer();
        })
    }   
}

function projectPopup(img, title, link, desc) {
    cardContainer.innerHTML = '';

    let article = document.createElement('article');
    article.classList.add("project-card");

    let inner = `
    <div>
        <img src="${img}" alt="placeholder">

        <div class="project-card-hover-bg">
            <a class="project-card-hover-text" href="${link}" target="_blank">Live Site</a>
        </div>
    </div>

    <h1>${title}</h1>
    <p>${desc}</p>

    <button class="project-card-close">
        <i class="fa-regular fa-circle-xmark"></i>
    </button>
    `;

    article.innerHTML += inner;
    cardContainer.append(article);

    article.querySelector('.project-card-close').addEventListener('click', () => {
        cardContainer.innerHTML = '';
        toggleCardContainer();
    })
}

function toggleCardContainer() {
    cardContainer.classList.toggle('hidden');
}