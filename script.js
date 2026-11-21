/* ==========================================================
   COLEGIO ADVENTISTA DEL TITICACA - JULIACA
   JAVASCRIPT GENERAL DE TODA LA PAGINA WEB
   ========================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ======================================================
     1. ELEMENTOS GENERALES
     ====================================================== */

  const navbar = document.querySelector('.navbar');
  const scrollTopBtn = document.querySelector('.scroll-top-btn');


  /* ======================================================
     2. EFECTO DE LA BARRA DE NAVEGACION AL DESPLAZARSE
     ====================================================== */

  function handleScroll() {

    const scrollPosition = window.scrollY;

    if (navbar) {
      if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Boton para volver al inicio
    if (scrollTopBtn) {
      if (scrollPosition > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();


  /* ======================================================
     3. BOTON VOLVER ARRIBA
     ====================================================== */

  if (scrollTopBtn) {

    scrollTopBtn.addEventListener('click', function () {

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    });

  }


  /* ======================================================
     4. MENU DE NAVEGACION PARA CELULARES
     ====================================================== */

  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {

    menuToggle.addEventListener('click', function () {

      navMenu.classList.toggle('active');

      const icon = menuToggle.querySelector('i');

      if (icon) {

        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }

      }

    });


    // Cerrar menu al seleccionar una seccion
    navMenu.querySelectorAll('.nav-link').forEach(link => {

      link.addEventListener('click', function () {

        navMenu.classList.remove('active');

        const icon = menuToggle.querySelector('i');

        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }

      });

    });

  }


  /* ======================================================
     5. NAVEGACION ACTIVA SEGUN LA SECCION VISIBLE
     ====================================================== */

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {

    const sectionObserver = new IntersectionObserver(
      function (entries) {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            const currentId = entry.target.getAttribute('id');

            navLinks.forEach(link => {

              link.classList.remove('active');

              if (link.getAttribute('href') === '#' + currentId) {
                link.classList.add('active');
              }

            });

          }

        });

      },
      {
        rootMargin: '-25% 0px -65% 0px'
      }
    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });

  }

  /* ======================================================
     FILTROS DE LA GALERÍA INSTITUCIONAL
     ====================================================== */

  const galleryFilters = document.querySelectorAll(
    '#galeria .gallery-filters .filter-btn'
  );

  const galleryPhotos = document.querySelectorAll(
    '#galeria .gallery-grid .gallery-item'
  );

  galleryFilters.forEach(button => {

    button.addEventListener('click', function () {

      const category = this.getAttribute('data-filter');

      // Cambiar el botón activo
      galleryFilters.forEach(filter => {
        filter.classList.remove('active');
      });

      this.classList.add('active');

      // Filtrar las fotografías
      galleryPhotos.forEach(photo => {

        const photoCategory = photo.getAttribute('data-category');

        if (category === 'all' || category === photoCategory) {

          photo.style.display = '';

        } else {

          photo.style.display = 'none';

        }

      });

    });

  });

  // ==========================================
  // LIGHTBOX CON NAVEGACIÓN ENTRE FOTOGRAFÍAS
  // ==========================================

  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxPrev = document.getElementById('lightboxPrev');

  let lightboxImages = [];
  let lightboxIndex = 0;

  function openLightbox(image) {
    if (!lightboxModal || !lightboxImg || !image) return;

    const gallery = image.closest('.news-img-gallery');

    if (gallery) {
      lightboxImages = Array.from(gallery.querySelectorAll('img'));
    } else {
      lightboxImages = [image];
    }

    lightboxIndex = lightboxImages.indexOf(image);

    if (lightboxIndex < 0) lightboxIndex = 0;

    showLightboxImage();

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function showLightboxImage() {
    const image = lightboxImages[lightboxIndex];

    if (!image) return;

    lightboxImg.src = image.currentSrc || image.src;
    lightboxImg.alt = image.alt || 'Imagen ampliada';

    // Mostrar flechas solamente cuando hay varias imágenes
    const showArrows = lightboxImages.length > 1;

    if (lightboxNext) {
      lightboxNext.style.display = showArrows ? 'flex' : 'none';
    }

    if (lightboxPrev) {
      lightboxPrev.style.display = showArrows ? 'flex' : 'none';
    }
  }

  function nextLightboxImage() {
    if (lightboxImages.length <= 1) return;

    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    showLightboxImage();
  }

  function prevLightboxImage() {
    if (lightboxImages.length <= 1) return;

    lightboxIndex =
      (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;

    showLightboxImage();
  }

  function closeLightbox() {
    if (!lightboxModal) return;

    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Abrir fotografías de todas las secciones
  document.querySelectorAll('.lightbox-trigger').forEach(element => {
    element.addEventListener('click', function (event) {

      const image = event.target.closest('img');

      if (!image || !this.contains(image)) return;

      event.preventDefault();
      event.stopPropagation();

      openLightbox(image);
    });
  });
  // Botones de navegación
  if (lightboxNext) {
    lightboxNext.addEventListener('click', nextLightboxImage);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', prevLightboxImage);
  }

  // Cerrar visor
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', function (event) {
      if (event.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Navegación con teclado
  document.addEventListener('keydown', function (event) {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;

    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') nextLightboxImage();
    if (event.key === 'ArrowLeft') prevLightboxImage();
  });

  /* ======================================================
     8. SLIDER INSTITUCIONAL - SECCION NOSOTROS
     ====================================================== */

  const sliderWrapper = document.querySelector('.about-slider-wrapper');

  if (sliderWrapper) {

    const slides = sliderWrapper.querySelectorAll('.about-slide-item');

    const prevButton = sliderWrapper.querySelector('.slider-ctrl-prev');
    const nextButton = sliderWrapper.querySelector('.slider-ctrl-next');

    const dots = sliderWrapper.querySelectorAll('.slider-dot');

    let currentSlide = 0;
    let sliderInterval = null;

    const sliderSpeed = 4500;


    function showSlide(index) {

      if (!slides.length) return;

      slides[currentSlide].classList.remove('active');

      if (dots[currentSlide]) {
        dots[currentSlide].classList.remove('active');
      }

      currentSlide = (index + slides.length) % slides.length;

      slides[currentSlide].classList.add('active');

      if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
      }

    }


    function nextSlide() {
      showSlide(currentSlide + 1);
    }


    function previousSlide() {
      showSlide(currentSlide - 1);
    }


    function startSlider() {

      stopSlider();

      sliderInterval = setInterval(nextSlide, sliderSpeed);

    }


    function stopSlider() {

      if (sliderInterval) {
        clearInterval(sliderInterval);
        sliderInterval = null;
      }

    }


    if (nextButton) {

      nextButton.addEventListener('click', function () {

        nextSlide();
        startSlider();

      });

    }


    if (prevButton) {

      prevButton.addEventListener('click', function () {

        previousSlide();
        startSlider();

      });

    }


    // Navegacion mediante los puntos
    dots.forEach((dot, index) => {

      dot.addEventListener('click', function () {

        showSlide(index);
        startSlider();

      });

    });


    // Pausar cuando el cursor esta sobre el slider
    sliderWrapper.addEventListener('mouseenter', stopSlider);

    sliderWrapper.addEventListener('mouseleave', startSlider);


    // Iniciar slider automatico
    if (slides.length > 1) {
      startSlider();
    }

  }

  /* ======================================================
9. FORMULARIO DE CONTACTO
====================================================== */

  const contactForm = document.querySelector('#contactForm');

  if (contactForm) {

    contactForm.addEventListener('submit', async function (event) {

      event.preventDefault();

      const submitButton = contactForm.querySelector(
        'button[type="submit"]'
      );

      const originalText = submitButton.innerHTML;

      submitButton.disabled = true;
      submitButton.innerHTML = 'Enviando...';

      try {

        const formData = new FormData(contactForm);

        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('No se pudo enviar el formulario');
        }

        alert(
          '¡Gracias por comunicarte con el Colegio Adventista del Titicaca! Tu mensaje fue enviado correctamente.'
        );

        contactForm.reset();

      } catch (error) {

        alert(
          'No se pudo enviar tu mensaje. Por favor, inténtalo nuevamente.'
        );

      } finally {

        submitButton.disabled = false;
        submitButton.innerHTML = originalText;

      }

    });

  }
  /* ======================================================
     10. REPRODUCCION AUTOMATICA DE VIDEOS
     ====================================================== */

  const videos = document.querySelectorAll(
    '.hero-video-bg, .about-slide-video, video'
  );

  videos.forEach(video => {

    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();

    if (playPromise !== undefined) {

      playPromise.catch(() => {

        console.log(
          'La reproduccion automatica requiere interaccion del usuario.'
        );

      });

    }

  });

  /* ======================================================
     11. ANIMACIONES DE FORMACION ACADEMICA
     ====================================================== */

  const academicCards = document.querySelectorAll('.academic-reveal');

  if ('IntersectionObserver' in window) {

    const academicObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }

        });

      },
      {
        threshold: 0.15
      }
    );

    academicCards.forEach((card, index) => {

      card.style.transitionDelay = `${index * 130}ms`;

      academicObserver.observe(card);

    });

  } else {

    academicCards.forEach(card => {
      card.classList.add('is-visible');
    });

  }


  /* ======================================================
     12. GALERIAS AUTOMATICAS DE FORMACION ACADEMICA
     ====================================================== */

  document.querySelectorAll('[data-academic-gallery]').forEach(gallery => {

    const photos = Array.from(gallery.querySelectorAll('img'));

    const dots = Array.from(
      gallery.querySelectorAll('.gallery-dots span')
    );

    if (photos.length < 2) return;

    let current = 0;

    // Asegurar que la primera fotografia este activa
    photos.forEach((photo, index) => {
      photo.classList.toggle('active', index === 0);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === 0);
    });


    setInterval(function () {

      photos[current].classList.remove('active');

      if (dots[current]) {
        dots[current].classList.remove('active');
      }

      current = (current + 1) % photos.length;

      photos[current].classList.add('active');

      if (dots[current]) {
        dots[current].classList.add('active');
      }

    }, 4200);

  });

  // Galerías automáticas de Eureka y Crea y Emprende
  document.querySelectorAll('[data-extra-gallery]').forEach(gallery => {
    const photos = Array.from(gallery.querySelectorAll('img'));
    const dots = Array.from(
      gallery.querySelectorAll('.extra-gallery-dots span')
    );

    let current = 0;

    if (photos.length < 2) return;

    setInterval(() => {
      photos[current].classList.remove('active');
      dots[current].classList.remove('active');

      current = (current + 1) % photos.length;

      photos[current].classList.add('active');
      dots[current].classList.add('active');
    }, 4500);
  });

  /* ======================================================
     13. ANIMACIONES DE ELEMENTOS AL HACER SCROLL
     ====================================================== */

  const animatedElements = document.querySelectorAll(
    /* Sección Nosotros */
    '#nosotros .about-visual,' +
    '#nosotros .about-text,' +
    '#nosotros .stat-item,' +
    '#nosotros .mv-card,' +
    '#nosotros .values-banner,' +
    '#nosotros .value-card,' +
    '#nosotros .about-panoramic-card,' +

    /* Otras secciones */
    '.reveal, .fade-in,' +
    'main section .section-header,' +
    'main section .about-card,' +
    'main section .activity-card,' +
    'main section .academic-card,' +
    'main section .gallery-item,' +
    'main section .news-card,' +
    'main section .info-card,' +
    'main section .feature-card,' +
    'main section .service-card,' +
    'main section .contact-info-panel,' +
    'main section .contact-form-panel,' +
    'main section .map-wrapper,' +
    'main section .himno-content,' +
    '.footer-grid > *'
  );

  console.log('Elementos encontrados:', animatedElements.length);

  if ('IntersectionObserver' in window) {

    const animationObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
          } else {
            entry.target.classList.remove('scroll-visible');
          }

        });

      },
      {
        threshold: 0.12
      }
    );

    animatedElements.forEach((element, index) => {

      element.classList.add('scroll-animate');

      element.style.transitionDelay =
        `${(index % 4) * 100}ms`;

      animationObserver.observe(element);

    });

  } else {

    animatedElements.forEach(element => {
      element.classList.add('scroll-visible');
    });

  }

  /* ======================================================
     14. HIMNO DEL COLEGIO ADVENTISTA DEL TITICACA
     ====================================================== */

  const himnoAudio = document.getElementById('himnoAudio');
  const himnoPlay = document.getElementById('himnoPlay');
  const himnoMute = document.getElementById('himnoMute');

  if (himnoAudio && himnoPlay && himnoMute) {

    // REPRODUCIR Y PAUSAR EL HIMNO
    himnoPlay.addEventListener('click', async function () {

      if (himnoAudio.paused) {

        try {
          await himnoAudio.play();
        } catch (error) {
          console.error('No se pudo reproducir el himno:', error);
        }

      } else {

        himnoAudio.pause();

      }

    });

    // ACTUALIZAR BOTON AL REPRODUCIR
    himnoAudio.addEventListener('play', function () {

      himnoPlay.innerHTML =
        '<i class="fas fa-pause"></i><span>Pausar himno</span>';

    });

    // ACTUALIZAR BOTON AL PAUSAR
    himnoAudio.addEventListener('pause', function () {

      himnoPlay.innerHTML =
        '<i class="fas fa-play"></i><span>Reproducir himno</span>';

    });

    // SILENCIAR Y ACTIVAR SONIDO
    himnoMute.addEventListener('click', function () {

      himnoAudio.muted = !himnoAudio.muted;

      himnoMute.innerHTML = himnoAudio.muted
        ? '<i class="fas fa-volume-mute"></i><span>Activar sonido</span>'
        : '<i class="fas fa-volume-up"></i><span>Silenciar</span>';

    });

  }
  /* BOTÓN VOLVER AL INICIO */

  const btnVolverInicio = document.getElementById('btnVolverInicio');

  if (btnVolverInicio) {

    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        btnVolverInicio.classList.add('visible');
      } else {
        btnVolverInicio.classList.remove('visible');
      }
    });

    btnVolverInicio.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

  }
  /* ======================================================
     15. FINALIZACION
     ====================================================== */

  console.log(
    'Sitio web del Colegio Adventista del Titicaca cargado correctamente.'
  );

});
