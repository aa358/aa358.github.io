// Select all instances of .wrapper, .carousel, and .wrapper i
const wrappers = document.querySelectorAll(".wrapper");
const arrowBtns = document.querySelectorAll(".wrapper i");

wrappers.forEach((wrapper) => {
    const carousel = wrapper.querySelector(".carousel");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const carouselChildrens = [...carousel.children];
    let isDragging = false,
        isAutoPlay = false,
        startX,
        startScrollLeft,
        timeoutId;
    // Get the number of cards that can fit in the carousel at once
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    // Insert copies of the last few cards to beginning of carousel for infinite scrolling
    carouselChildrens
        .slice(-cardPerView)
        .reverse()
        .forEach((card) => {
            carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
        });
    // Insert copies of the first few cards to end of carousel for infinite scrolling
    carouselChildrens.slice(0, cardPerView).forEach((card) => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });
    // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    // Find the arrow buttons within the current wrapper
    const btns = wrapper.querySelectorAll("i");
    
    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (btn.id == "left") {
                // Scroll the current carousel left
                carousel.scrollLeft -= firstCardWidth;
            } else {
                // Scroll the current carousel right
                carousel.scrollLeft += firstCardWidth;
            }
        });
    });
    
    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        // Records the initial cursor and scroll position of the carousel
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };
    const dragging = (e) => {
        if (!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the carousel based on the cursor movement
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };
    const infiniteScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft =
                carousel.scrollWidth - 2 * carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if (
            Math.ceil(carousel.scrollLeft) ===
            carousel.scrollWidth - carousel.offsetWidth
        ) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
        // Clear existing timeout & start autoplay if mouse is not hovering over carousel
        clearTimeout(timeoutId);
        if (!wrapper.matches(":hover")) autoPlay();
    };
    const autoPlay = () => {
        if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the carousel after every 2500 ms
        timeoutId = setTimeout(
            () => (carousel.scrollLeft += firstCardWidth),
            2500
        );
    };
    autoPlay();
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);
});