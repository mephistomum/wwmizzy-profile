

    /* =========================================
       HEADER
    ========================================== */

    const header = document.getElementById("site-header");

    function updateHeader() {

        if (window.scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =========================================
       PAGE LOADER
    ========================================== */

    const pageLoader = document.getElementById("page-loader");


    function hidePageLoader() {

        pageLoader.classList.add("hidden");

        // Completely remove loader after animation
        setTimeout(() => {
            pageLoader.remove();
        }, 900);

    }


    /* =========================================
       WAIT FOR ALL IMAGES
    ========================================== */

    function waitForImages() {

        const images = document.images;

        const imagePromises = Array.from(images).map(img => {

            // Image already loaded
            if (img.complete) {

                // complete doesn't necessarily mean successful
                if (img.naturalWidth > 0) {
                    return Promise.resolve();
                }

                return Promise.resolve();
            }


            // Wait for image
            return new Promise(resolve => {

                img.addEventListener("load", resolve, {
                    once: true
                });

                img.addEventListener("error", resolve, {
                    once: true
                });

            });

        });


        return Promise.all(imagePromises);

    }


    /* =========================================
       START LOADING
    ========================================== */

    window.addEventListener("load", async () => {

        // At this point the browser has loaded
        // the page resources.

        await waitForImages();

        // Small delay makes the transition
        // feel less abrupt.
        setTimeout(() => {

            hidePageLoader();

        }, 300);

    });

