document.addEventListener('DOMContentLoaded', () => {
    const username = "Rutinitas-Pemain-Roblox";
    const repo = "rpr";
    const ugcData = 'site_data/ugc.json';
    const gamesData = 'site_data/games.json';

    const sliders = document.querySelectorAll('.slider-scope');

    function loadGalleryFromJSON(jsonUrl, placeholderId, folderGambar, kategoriKey, scaleImg, buatApa) {
        const container = document.getElementById(placeholderId);
        if (!container) {
            console.error(`Element dengan ID '${placeholderId}' tidak ditemukan!`);
            return Promise.resolve();
        }

        return fetch(jsonUrl)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                const dataList = data[kategoriKey] || [];
                if (!Array.isArray(dataList) || dataList.length === 0) return [];

                const imagePromises = dataList.map(item => {
                    return new Promise((resolve) => {

                        if (buatApa === 'dijual') {
                            const cardDiv = document.createElement('div');
                            cardDiv.className = 'card rounded-4 overflow-visible';

                            const imgPath = `${folderGambar}/${item.gambar}`;

                            const img = document.createElement('img');
                            img.src = imgPath;
                            img.alt = item.nama || 'UGC';
                            img.classList = 'ugc-img-fit';
                            if (kategoriKey === 'baju') {
                                img.classList = 'baju-ugc scaledImg ugc-img-fit';
                            } else if (kategoriKey === 'celana') {
                                img.classList = 'celana-ugc scaledImg ugc-img-fit';
                            }
                            img.setAttribute('draggable', 'false');

                            const article = document.createElement('article');
                            article.className = 'card-body d-flex flex-column py-0 px-2';
                            article.style.transform = 'translateY(-50%)';

                            const spanNama = document.createElement('div');
                            spanNama.className = 'h6 mt-1 mb-0 w-100 overflow-hidden';
                            spanNama.textContent = item.nama;

                            const divRobux = document.createElement('div');
                            divRobux.classList = 'd-flex align-items-center';

                            const rbx = document.createElement('img');
                            rbx.src = 'Pictures/Robux_2025_white.svg';
                            rbx.style.height = '1rem';
                            rbx.style.width = '1rem';
                            rbx.style.transform = 'translateY(0)';
                            rbx.alt = 'R$';

                            const spanHarga = document.createElement('span');
                            spanHarga.classList = 'small ms-1';
                            spanHarga.textContent = item.harga;

                            divRobux.appendChild(rbx);
                            divRobux.appendChild(spanHarga);

                            const buyIcon = document.createElement('i');
                            buyIcon.classList = 'bi bi-bag-fill';

                            const textBuy = document.createElement('span');
                            textBuy.innerHTML = 'beli';

                            const linkWrapper = document.createElement('a');
                            linkWrapper.href = item.link || '#';
                            linkWrapper.style.backgroundColor = 'hsl(10, 90%, 50%)';
                            linkWrapper.classList = 'text-decoration-none border small fw-bold w-50 mt-2 d-flex flex-row gap-1 rounded-start d-flex justify-content-center py-2 text-white';
                            linkWrapper.setAttribute('draggable', 'false');
                            linkWrapper.setAttribute('target', '_blank');
                            linkWrapper.setAttribute('role', 'button');
                            linkWrapper.appendChild(buyIcon);
                            linkWrapper.appendChild(textBuy);


                            const buttonCopyID = document.createElement('button');
                            buttonCopyID.type = 'button';
                            buttonCopyID.classList = 'w-50 small mt-2 rounded-end d-flex flex-row gap-1 border d-flex justify-content-center py-2 btn-copy-id';
                            buttonCopyID.setAttribute('data-link', item.link || '');
                            buttonCopyID.innerHTML = 'Salin ID';

                            const buttonWrap = document.createElement('section');
                            buttonWrap.classList = 'd-flex flex-row gap-1';
                            buttonWrap.appendChild(linkWrapper);
                            buttonWrap.appendChild(buttonCopyID);

                            article.appendChild(spanNama);
                            article.appendChild(divRobux);
                            article.appendChild(buttonWrap);

                            cardDiv.appendChild(img);
                            cardDiv.appendChild(article);
                            container.appendChild(cardDiv);

                            img.onload = () => resolve();
                            img.onerror = () => {
                                console.warn(`Gambar gagal dimuat: ${imgPath}`);
                                resolve();
                            };
                        } else if (buatApa === 'games') {
                            const cardDiv = document.createElement('div');
                            cardDiv.className = 'card rounded-4 overflow-hidden';

                            const img = document.createElement('img');
                            img.src = `${folderGambar}/${item.iconName}`;
                            img.alt = item.nama;
                            img.classList = 'z-2 position-absolute start-0 bottom-50 rounded border border-2 border-opacity-50';
                            img.style.height = '4rem';
                            img.style.width = '4rem';
                            img.draggable = 'false';

                            const cover = document.createElement('div');
                            cover.classList = "w-100 h-100"
                            cover.style.background = `url('${folderGambar}/${item.coverName}') bottom / cover no-repeat`;

                            const gameAbt = document.createElement('article');
                            gameAbt.classList = "d-flex flex-row z-1 position-absolute bottom-0 start-0 w-100 ps-3 pe-2 pb-1 pt-3 bg-grad-tran";

                            const gameHead = document.createElement('div');
                            gameHead.classList = "d-flex justify-content-center align-items-start flex-column pb-1";

                            const gameButtonAr = document.createElement('div');
                            gameButtonAr.classList = "d-flex justify-content-end align-items-center gap-1";

                            const hd5 = document.createElement('h5');
                            const gameDesc = document.createElement('span');
                            const playGame = document.createElement('a');
                            const groupAge = document.createElement('span');

                            hd5.classList = 'm-0 overflow-hidden';
                            gameDesc.classList = 'small overflow-hidden';
                            playGame.classList = "btn btn-success rounded-3 border border-success";
                            playGame.role = 'button';
                            playGame.target = "_blank";
                            groupAge.classList = "small px-2 bg-info-subtle text-info border border-info rounded-pill";

                            hd5.textContent = `${item.nama}`;
                            if (kategoriKey === "part_games") {
                                gameDesc.innerHTML = `by <a href="${item.creatorLink}" rel="noopener noreferrer" class="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" target="_blank">${item.by}</a>`;
                            } else {gameDesc.innerText = `by ${item.by}`;}
                            playGame.href = `${item.link}`;
                            playGame.innerHTML = '<i class="bi bi-caret-right-fill"></i> Play';
                            groupAge.textContent = `${item.groupAge}`;

                            if (item.membership === 'true') {
                                const tag = document.createElement('span');
                                tag.innerHTML = "Member only";
                                tag.classList = "rounded-pill end-0 mt-2 me-1 px-2 text-warning border border-warning bg-warning-subtle position-absolute";
                                tag.style.fontSize = '.7rem';
                                cardDiv.appendChild(tag);
                            }

                            gameHead.appendChild(hd5);
                            gameHead.appendChild(gameDesc);
                            gameButtonAr.appendChild(groupAge);
                            gameButtonAr.appendChild(playGame);

                            gameAbt.appendChild(gameHead);
                            gameAbt.appendChild(gameButtonAr);
                            cardDiv.appendChild(gameAbt);

                            cardDiv.appendChild(img);
                            cardDiv.appendChild(cover);
                            container.appendChild(cardDiv);

                            img.onload = () => resolve();
                            img.onerror = () => {
                                console.warn(`Gambar gagal dimuat: ${imgPath}`);
                                resolve();
                            };
                        }

                    });
                });

                return Promise.all(imagePromises);
            })
            .catch(err => console.error(`Gagal memuat JSON (${jsonUrl}):`, err));
    }

    const tugasDimuat = [
        loadGalleryFromJSON(ugcData, 'ugc_baju', 'Pictures/shop_baju', 'baju', true, 'dijual'),
        loadGalleryFromJSON(ugcData, 'ugc_celana', 'Pictures/shop_celana', 'celana', true, 'dijual'),
        loadGalleryFromJSON(ugcData, 'ugc_acc', 'Pictures/shop_ugc', 'ugc', false, 'dijual'),
        loadGalleryFromJSON(gamesData, 'games_own', 'Pictures', 'own_games', false, 'games'),
        loadGalleryFromJSON(gamesData, 'games_partnership', 'Pictures', 'part_games', false, 'games')
    ];

    Promise.all(tugasDimuat).then(() => {
        sliders.forEach((sliderScope) => {
            const container = sliderScope.querySelector('.iscroll-container');
            const track = sliderScope.querySelector('.iscroll-track');

            if (!container || !track || !track.children.length) return;

            const originalItems = Array.prototype.slice.call(track.children);
            originalItems.forEach(item => {
                track.appendChild(item.cloneNode(true));
            });

            track.addEventListener('click', (e) => {
                const copyBtn = e.target.closest('.btn-copy-id');

                if (copyBtn) {
                    e.preventDefault();
                    e.stopPropagation();

                    const fullLink = copyBtn.getAttribute('data-link') || '';

                    if (fullLink) {
                        const match = fullLink.match(/(?:catalog)\/(\d+)/i);

                        if (match && match[1]) {
                            const cleanId = match[1];
                            copyText(cleanId, copyBtn);
                        } else {
                            console.warn('Pola ID Roblox tidak ditemukan pada link:', fullLink);
                        }
                    } else {
                        console.warn('Tombol ini tidak memiliki data-link / field link di JSON kosong!');
                    }
                }
            });

            track.addEventListener('pointerdown', (e) => {
                if (e.target.closest('.btn-copy-id')) {
                    e.stopPropagation();
                }
            });

            let speed = 1.0;
            let currentX = 0;
            let isPaused = false;
            let isDragging = false;
            let isVisible = true;
            let isHovered = false;

            let startX = 0;
            let dragStartTransform = 0;
            let resumeTimeout = null;
            let halfWidth = 0;

            function calculateWidth() {
                if (originalItems.length > 0 && track.children[originalItems.length]) {
                    const firstOriginal = track.children[0];
                    const firstClone = track.children[originalItems.length];

                    const dist = firstClone.offsetLeft - firstOriginal.offsetLeft;
                    if (dist > 0) {
                        halfWidth = dist;
                    }
                }

                if (!halfWidth || halfWidth <= 0) {
                    const gap = 16;
                    let totalItemWidth = 0;
                    originalItems.forEach(item => totalItemWidth += item.offsetWidth);
                    halfWidth = totalItemWidth + (originalItems.length * gap);
                }
            }

            calculateWidth();
            setTimeout(calculateWidth, 100);
            window.addEventListener('resize', calculateWidth);

            function animate() {
                if (!isPaused && !isDragging && isVisible) {
                    currentX -= speed;

                    if (halfWidth > 0 && Math.abs(currentX) >= halfWidth) {
                        currentX = currentX % halfWidth;
                    }

                    track.style.transform = `translate3d(${currentX}px, 0, 0)`;
                }
                requestAnimationFrame(animate);
            }
            requestAnimationFrame(animate);

            function triggerResumeDelay() {
                clearTimeout(resumeTimeout);
                if (isHovered) {
                    isPaused = true;
                    return;
                }

                isPaused = true;
                resumeTimeout = setTimeout(() => {
                    if (!isDragging && !isHovered) {
                        isPaused = false;
                    }
                }, 2000);
            }

            function isMouseInsideContainer(e) {
                const rect = container.getBoundingClientRect();
                return (
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom
                );
            }

            container.addEventListener('mouseenter', () => {
                isHovered = true;
                isPaused = true;
                clearTimeout(resumeTimeout);
            });

            container.addEventListener('mousemove', (e) => {
                if (isMouseInsideContainer(e)) {
                    isHovered = true;
                    if (!isDragging) {
                        isPaused = true;
                        clearTimeout(resumeTimeout);
                    }
                } else {
                    if (isHovered) {
                        isHovered = false;
                        if (!isDragging) triggerResumeDelay();
                    }
                }
            });

            container.addEventListener('mouseleave', () => {
                isHovered = false;
                if (!isDragging) {
                    triggerResumeDelay();
                }
            });

            const startDrag = (e) => {
                isDragging = true;
                clearTimeout(resumeTimeout);

                const pageX = e.type === 'touchstart' ? e.touches[0].pageX : e.pageX;
                startX = pageX;
                dragStartTransform = currentX;
            };

            const moveDrag = (e) => {
                if (!isDragging) return;

                if (e.type === 'mousemove' && !isMouseInsideContainer(e)) {
                    isHovered = false;
                    stopDrag();
                    return;
                }

                const pageX = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX;
                const distance = pageX - startX;

                currentX = dragStartTransform + distance;

                if (currentX > 0) {
                    currentX -= halfWidth;
                    dragStartTransform -= halfWidth;
                } else if (halfWidth > 0 && Math.abs(currentX) >= halfWidth) {
                    currentX += halfWidth;
                    dragStartTransform += halfWidth;
                }

                track.style.transform = `translate3d(${currentX}px, 0, 0)`;
            };

            const stopDrag = () => {
                if (!isDragging) return;
                isDragging = false;

                if (isHovered) {
                    isPaused = true;
                    clearTimeout(resumeTimeout);
                } else {
                    triggerResumeDelay();
                }
            };

            container.addEventListener('mousedown', startDrag);
            container.addEventListener('touchstart', startDrag, { passive: true });

            window.addEventListener('mousemove', moveDrag);
            container.addEventListener('touchmove', moveDrag, { passive: true });

            window.addEventListener('mouseup', stopDrag);
            window.addEventListener('touchend', stopDrag);

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.target === container) {
                        isVisible = entry.isIntersecting;
                        if (isVisible && !isHovered && !isDragging) {
                            isPaused = false;
                        }
                    }
                });
            }, {
                threshold: 0,
                rootMargin: "200px 0px 200px 0px"
            });

            observer.observe(container);
        });

        console.log("🟢: SELESAI DIMUAT");
    });




    const pathcarousel = 'ss_mabar_carousel';
    const id = document.getElementById('img-bg');
    const ss_URL = `https://api.github.com/repos/${username}/${repo}/contents/${pathcarousel}`;

    fetch(ss_URL)
        .then(res => res.json())
        .then(files => {
            const imageFiles = files.filter(file => file.type === "file");
            imageFiles.forEach((file, index) => {
                if (file.type === "file") {
                    const div = document.createElement('div');
                    div.style.background = `url('${file.download_url}') center / cover no-repeat`;
                    div.classList.add('carousel-item', 'h-100', 'w-100');
                    if (index === 0) {
                        div.classList.add('active');
                    }

                    id.appendChild(div);
                }
            });

        })
        .catch(err => console.error("Gagal membaca folder GitHub:", err));

});

function copyText(idToCopy, btnElement) {
    // Pastikan ID diubah menjadi string (jika di JSON ditulis berupa angka/number)
    const textString = String(idToCopy).trim();

    if (!textString || textString === 'undefined') {
        console.error("ID tidak valid!");
        return;
    }

    // Helper visual feedback
    const showSuccess = () => {
        if (!btnElement) return;
        const textDiv = btnElement.querySelector('div') || btnElement;
        const originalText = textDiv.textContent;
        textDiv.textContent = 'Tersalin!';
        btnElement.classList.add('btn-success');

        setTimeout(() => {
            textDiv.textContent = originalText;
            btnElement.classList.remove('btn-success');
        }, 1500);
    };

    // Pilihan 1: Clipboard API Modern
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textString)
            .then(showSuccess)
            .catch(err => {
                console.warn("Clipboard API gagal, beralih ke Fallback...", err);
                fallbackCopy(textString, showSuccess);
            });
    } else {
        // Pilihan 2: Fallback execCommand
        fallbackCopy(textString, showSuccess);
    }
};

function fallbackCopy(text, onSuccess) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful && onSuccess) onSuccess();
    } catch (err) {
        console.error("Gagal menyalin via fallback: ", err);
    }

    document.body.removeChild(textArea);
};


