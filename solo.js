
/* =========================================
   SOLO PHOTO GALLERY
========================================= */

const soloGallery = document.getElementById("soloGallery");

fetch("assets/image/solo/solo.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to load solo photo list.");

        }

        return response.json();

    })
    .then(images => {

        images.forEach((image, index) => {

            const link = document.createElement("a");

            link.href = `assets/image/solo/${image}`;
            link.className = "solo-photo";
            link.target = "_blank";

            const img = document.createElement("img");

            img.src = `assets/image/solo/${image}`;
            img.alt = `Solo portrait ${index + 1}`;
            img.loading = "lazy";

            link.appendChild(img);

            soloGallery.appendChild(link);

        });

    })
    .catch(error => {

        console.error("Solo gallery error:", error);

        soloGallery.innerHTML = `
            <p class="gallery-error">
                Unable to load photos.
            </p>
        `;

    });