const elem = document.querySelector('.all-members');
const members = document.querySelector('.member-div');
const title = document.querySelector('.hero-title');
const nav = document.querySelector('.nav-container');
const aboutLink = document.querySelector('.aboutLink');
const aboutDiv = document.querySelector('.aboutDiv');
const heroDiv = document.querySelector('.hero-container');

window.addEventListener('scroll', function() {
    let coords = elem.getBoundingClientRect();
    let coordsAbout = aboutDiv.getBoundingClientRect();
    let coordsTitle = title.getBoundingClientRect(); 
    const belowTop = coordsTitle.bottom + pageYOffset > coords.top + pageYOffset;
    const aboveBottom = coordsTitle.bottom + pageYOffset > coords.bottom + pageYOffset;
    const aboveTop = coordsTitle.bottom + pageYOffset > coordsAbout.top + pageYOffset;
    const belowAbove = coordsTitle.bottom + pageYOffset > coordsAbout.bottom + pageYOffset;
    if (belowTop && !aboveBottom){
     title.innerHTML = 'MEMBERS';
     title.style.display = "inline-block";
     nav.style.display = "inline-block";
   } else if(aboveTop && !belowAbove) {
      title.innerHTML = 'ABOUT';
      nav.style.display = "inline-block";
      title.style.display = "inline-block";
   } else {
     title.innerHTML = 'WOMEN ART AI';
     nav.style.display = "inline-block";
     title.style.display = "inline-block";
   }
 });

// aboutLink.addEventListener('click', function(ev) {
//     ev.preventDefault();
//     //elem.style.display = "none";
//     //heroDiv.style.display = "none";
//     //aboutDiv.style.display = "block";
//     // title.style.display = "none";
//     // title.style.opacity = "0";
//     //nav.style.position= "absolute";
// })
 