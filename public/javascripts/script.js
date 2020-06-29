const elem = document.querySelector('.all-members');
const members = document.querySelector('.member-div');
const title = document.querySelector('.hero-title');
const nav = document.querySelector('.nav-container');
const aboutLink = document.querySelector('.aboutLink');
const aboutDiv = document.querySelector('.aboutDiv');
const heroDiv = document.querySelector('.hero-container');
const eventDiv = document.querySelector('.all-events');
const hiddenEvents = document.querySelector('.hiddenEvent');
const showMore = document.querySelector('.showMore');



window.addEventListener('scroll', function() {
    let coords = elem.getBoundingClientRect();
    let coordsAbout = aboutDiv.getBoundingClientRect();
    let coordsTitle = title.getBoundingClientRect(); 
    let coordsEvent = eventDiv.getBoundingClientRect();
    const bellowEvent = coordsTitle.bottom + pageYOffset > coordsEvent.top + pageYOffset;
    const aboveEvent = coordsTitle.bottom + pageYOffset > coordsEvent.bottom + pageYOffset;
    const belowTop = coordsTitle.bottom + pageYOffset > coords.top + pageYOffset;
    const aboveBottom = coordsTitle.bottom + pageYOffset > coords.bottom + pageYOffset; //member
    const aboveTop = coordsTitle.bottom + pageYOffset > coordsAbout.top + pageYOffset;
    const belowAbove = coordsTitle.bottom + pageYOffset > coordsAbout.bottom + pageYOffset;
    if(bellowEvent && !belowTop) {
      title.innerHTML = 'NEWS';
      title.style.display = "inline-block";
      nav.style.display = "inline-block";
    }
    else if (belowTop && bellowEvent && !aboveBottom){
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

 const hide = hiddenEvents.style.display = "none";

function showHiddenEvents() {
 if(hide=="block")
 {
  showMore.innerHTML = "Show more";
  hiddenEvents.style.display = "none";

 }
if(hide=="none")
{
  hiddenEvents.style.display = "block";
  showMore.innerHTML = "Show less";

 }
}

 showMore.addEventListener('click', showHiddenEvents)