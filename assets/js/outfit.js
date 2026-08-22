/* =========================================
   outfit PHOTO GALLERY
========================================= */

document.addEventListener("DOMContentLoaded", async () => {

    const outfitGallery = document.getElementById("outfitGallery");

    const loader = document.getElementById("page-loader");

    const percentageText =
        document.getElementById("loaderPercentage");

    const progressBar =
        document.getElementById("loaderProgressBar");

    const loaderText =
        document.getElementById("loaderText");


    try {

        /* =========================================
           CHECK REQUIRED ELEMENTS
        ========================================== */

        if (!outfitGallery) {
            throw new Error(
                'Gallery container "#outfitGallery" was not found.'
            );
        }

        if (!loader) {
            throw new Error(
                'Loader "#page-loader" was not found.'
            );
        }


        /* =========================================
           LOAD JSON
        ========================================== */

        loaderText.textContent = "Loading photo list...";

        const response = await fetch(
            "assets/image/outfit/outfit.json"
        );

        if (!response.ok) {

            throw new Error(
                `Unable to load outfit.json (${response.status})`
            );

        }

        const images = await response.json();


        /* =========================================
           VALIDATE JSON
        ========================================== */

        if (!Array.isArray(images)) {

            throw new Error(
                "outfit.json must contain an array."
            );

        }


        const totalImages = images.length;

        let loadedImages = 0;


        /* =========================================
           UPDATE PROGRESS
        ========================================== */

        function updateProgress() {

            const percentage = Math.round(
                (loadedImages / totalImages) * 100
            );


            percentageText.textContent =
                `${percentage}%`;


            progressBar.style.width =
                `${percentage}%`;


            loaderText.textContent =
                `Loading memories... ${loadedImages} / ${totalImages}`;

        }


        // Start at 0%
        updateProgress();


        /* =========================================
           PRELOAD IMAGES
        ========================================== */

        // const imagePromises = images.map(
        //     (image, index) => {

        //         return new Promise(
        //             (resolve, reject) => {

        //                 const img = new Image();


        //                 img.onload = () => {

        //                     loadedImages++;

        //                     updateProgress();

        //                     console.log(
        //                         `Loaded ${loadedImages}/${totalImages}:`,
        //                         image
        //                     );

        //                     resolve();

        //                 };


        //                 img.onerror = () => {

        //                     reject(
        //                         new Error(
        //                             `Unable to load image: ${image}`
        //                         )
        //                     );

        //                 };


        //                 img.src =
        //                     `assets/image/outfit/${image}`;

        //             }
        //         );

        //     }
        // );

        const imagePromises = images.map(
    (imageObj, index) => {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                loadedImages++;
                updateProgress();
                console.log(
                    `Loaded ${loadedImages}/${totalImages}:`,
                    imageObj.file
                );
                resolve();
            };

            img.onerror = () => {
                reject(
                    new Error(
                        `Unable to load image: ${imageObj.file}`
                    )
                );
            };

            img.src = `assets/image/outfit/${imageObj.file}`;
        });
    }
);


        /* =========================================
           WAIT FOR ALL IMAGES
        ========================================== */

        await Promise.all(imagePromises);


        /* =========================================
           COMPLETE
        ========================================== */

        percentageText.textContent = "100%";

        progressBar.style.width = "100%";

        loaderText.textContent =
            "Ready";


        console.log(
            "All outfit photos loaded."
        );


        /* =========================================
           CREATE GALLERY
        ========================================== */

        // images.forEach((image, index) => {

        //     const link =
        //         document.createElement("a");

        //     link.href =
        //         `assets/image/outfit/${image}`;

        //     link.className =
        //         "outfit-photo";

        //     link.target =
        //         "_blank";


        //     const img =
        //         document.createElement("img");

        //     img.src =
        //         `assets/image/outfit/${image}`;

        //     img.alt =
        //         `outfit portrait ${index + 1}`;

        //     img.loading =
        //         "eager";


        //     link.appendChild(img);

        //     outfitGallery.appendChild(link);

        // });



// images.forEach((imageObj, index) => {
//     const wrapper = document.createElement("div");
//     wrapper.className = "outfit-photo-item";

//     const link = document.createElement("a");
//     link.href = `assets/image/outfit/${imageObj.file}`;
//     link.className = "outfit-photo";
//     link.target = "_blank";

//     const img = document.createElement("img");
//     img.src = `assets/image/outfit/${imageObj.file}`;
//     img.alt = `outfit portrait ${index + 1}`;
//     img.loading = "eager";

//     link.appendChild(img);
//     wrapper.appendChild(link);

//     // Copy button with icon
//     const copyBtn = document.createElement("button");
//     copyBtn.className = "copy-btn";
//     copyBtn.setAttribute("data-code", imageObj.code);

//     const icon = document.createElement("img");
//     icon.src = "assets/image/code.png";   // path to your icon
//     icon.alt = "Copy Code";
//     icon.className = "copy-icon";

//     copyBtn.appendChild(icon);
//     wrapper.appendChild(copyBtn);

//     outfitGallery.appendChild(wrapper);
// });

images.forEach((imageObj, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "outfit-photo-item";

    const link = document.createElement("a");
    link.href = `assets/image/outfit/${imageObj.file}`;
    link.className = "outfit-photo";
    link.target = "_blank";

    const img = document.createElement("img");
    img.src = `assets/image/outfit/${imageObj.file}`;
    img.alt = `outfit portrait ${index + 1}`;
    img.loading = "eager";

    link.appendChild(img);
    wrapper.appendChild(link);

    // Copy button with text overlay
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.textContent = "Copy Pose";
    copyBtn.setAttribute("data-code", imageObj.code);

    wrapper.appendChild(copyBtn);
    outfitGallery.appendChild(wrapper);
});


// Enable "hover" effect on touch devices by tapping
outfitGallery.addEventListener("click", function(e) {
    const photoItem = e.target.closest(".outfit-photo-item");
    if (photoItem) {
        // Toggle a class that simulates hover
        photoItem.classList.toggle("touch-active");
        e.preventDefault(); // prevent immediate link navigation on first tap
    }
});



        /* =========================================
           HIDE LOADER
        ========================================== */

        setTimeout(() => {

            loader.classList.add("hidden");

        }, 500);


    } catch (error) {

        console.error(
            "outfit gallery error:",
            error
        );


        /* =========================================
           SHOW ERROR
        ========================================== */

        if (loaderText) {

            loaderText.textContent =
                "Unable to load gallery.";

        }


        if (percentageText) {

            percentageText.textContent =
                "Error";

        }


        if (outfitGallery) {

            outfitGallery.innerHTML = `
                <p class="gallery-error">
                    Unable to load photos.
                </p>
            `;

        }


        /* =========================================
           HIDE LOADER
        ========================================== */

        if (loader) {

            setTimeout(() => {

                loader.classList.add("hidden");

            }, 1000);

        }

    }

});

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("copy-btn")) {
        const code = e.target.getAttribute("data-code");
        navigator.clipboard.writeText(code).then(() => {
            alert("Code copied: " + code);
        });
    }
});
