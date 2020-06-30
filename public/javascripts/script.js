const elem = document.querySelector('.all-members');
const members = document.querySelector('.member-div');
const title = document.querySelector('.hero-title');
const nav = document.querySelector('.nav-container');
const aboutLink = document.querySelector('.aboutLink');
const aboutDiv = document.querySelector('.aboutDiv');
const heroDiv = document.querySelector('.hero-container');
const eventDiv = document.querySelector('.all-events');
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

let showMoreText = true;
 function showHiddenEvents() {
  const hiddenEvents = document.querySelectorAll('.event-list.hidden-event');
  hiddenEvents.forEach(element => {
    if (showMoreText === true) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  })
  if (!showMoreText) {
    showMore.innerHTML = "Show more events...";
  } else {
    showMore.innerHTML = "Show less events";
  }
  showMoreText = !showMoreText;
}

 showMore.addEventListener('click', showHiddenEvents)