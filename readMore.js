document.addEventListener("DOMContentLoaded", function() {
    const readMoreBtns = document.querySelectorAll('.readMoreBtn');
  
    readMoreBtns.forEach(readMoreBtn => {
      readMoreBtn.addEventListener("click", function() {
        const colDescReadMore = readMoreBtn.closest('.colDescReadMore');
        const readMoreContainer = colDescReadMore.querySelector('.readMore');
        const spanContent = readMoreContainer.querySelector('span');
  
        readMoreContainer.classList.toggle('show');
        spanContent.classList.toggle('show');
  
        readMoreBtn.textContent = readMoreContainer.classList.contains('show') ? 'Read Less...' : 'Read More...';
      });
    });
  });