/* =========================================
   SOLO PHOTO GALLERY
========================================= */

document.addEventListener("DOMContentLoaded", async () => {

    const soloGallery = document.getElementById("soloGallery");
    const loader = document.getElementById("page-loader");

    try {

        /* =========================================
           CHECK REQUIRED ELEMENTS
        ========================================== */

        if (!soloGallery) {
            throw new Error(
                'Gallery container "#soloGallery" was not found.'
            );
        }

        if (!loader) {
            throw new Error(
                'Loader "#page-loader" was not found.'
            );
        }


        /* =========================================
           LOAD PHOTO LIST
        ========================================== */

        const response = await fetch(
            "assets/image/solo/solo.json"
        );

        if (!response.ok) {
            throw new Error(
                `Unable to load solo.json (${response.status})`
            );
        }

        const images = await response.json();


        /* =========================================
           VALIDATE JSON
        ========================================== */

        if (!Array.isArray(images)) {
            throw new Error(
                "solo.json must contain an array of image filenames."
            );
        }

        console.log("Solo photos found:", images);


        /* =========================================
           PRELOAD ALL IMAGES
        ========================================== */

        const imagePromises = images.map((image, index) => {

            return new Promise((resolve, reject) => {

                const img = new Image();

                img.onload = () => {

                    console.log(
                        `Loaded ${index + 1}/${images.length}:`,
                        image
                    );

                    resolve();

                };

                img.onerror = () => {

                    reject(
                        new Error(
                            `Unable to load image: ${image}`
                        )
                    );

                };

                img.src = `assets/image/solo/${image}`;

            });

        });


        /* =========================================
           WAIT FOR ALL IMAGES
        ========================================== */

        await Promise.all(imagePromises);


        console.log("All solo photos loaded.");


        /* =========================================
           CREATE GALLERY
        ========================================== */

        images.forEach((image, index) => {

            const link = document.createElement("a");

            link.href = `assets/image/solo/${image}`;

            link.className = "solo-photo";

            link.target = "_blank";


            const img = document.createElement("img");

            img.src = `assets/image/solo/${image}`;

            img.alt = `Solo portrait ${index + 1}`;

            // Don't lazy-load here because we already
            // intentionally loaded everything.
            img.loading = "eager";


            link.appendChild(img);

            soloGallery.appendChild(link);

        });


        /* =========================================
           HIDE LOADER
        ========================================== */

        setTimeout(() => {

            loader.classList.add("hidden");

        }, 300);


    } catch (error) {

        console.error(
            "Solo gallery error:",
            error
        );


        /* =========================================
           SHOW ERROR
        ========================================== */

        if (soloGallery) {

            soloGallery.innerHTML = `
                <p class="gallery-error">
                    Unable to load photos.
                </p>
            `;

        }


        /* =========================================
           STILL HIDE LOADER
        ========================================== */

        if (loader) {

            setTimeout(() => {

                loader.classList.add("hidden");

            }, 300);

        }

    }

});