/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
  })
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

/*=============== REMOVE MOBILE MENU ON LINK CLICK ===============*/
const navLink = document.querySelectorAll('.nav__link, .nav__contact')

const linkAction = () => {
  navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME TYPED JS ===============*/
if (typeof Typed !== 'undefined') {
  new Typed('#home-typed', {
    strings: ['Web Applications.', 'Backend Systems.', 'Data-Driven Tools.'],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 1600,
    loop: true,
    smartBackspace: true
  })
}

/*=============== CHANGE HEADER STYLE ON SCROLL ===============*/
const header = document.getElementById('header')

const scrollHeader = () => {
  if (header) {
    window.scrollY >= 80 ? header.classList.add('scroll-header')
                          : header.classList.remove('scroll-header')
  }
}
window.addEventListener('scroll', scrollHeader)

/*=============== SWIPER: PROJECTS ===============*/
if (typeof Swiper !== 'undefined') {
  new Swiper('.work__swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    pagination: {
      el: '.work__pagination',
      clickable: true
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1150: { slidesPerView: 3 }
    }
  })

  /*=============== SWIPER: INTERESTS ===============*/
  new Swiper('.interests__swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 3800,
      disableOnInteraction: false
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1150: { slidesPerView: 4 }
    }
  })
}

/*=============== SERVICES ACCORDION ===============*/
const servicesHeaders = document.querySelectorAll('.services__header')

servicesHeaders.forEach((header) => {
  header.addEventListener('click', () => {
    const card = header.parentElement
    const alreadyOpen = card.classList.contains('services-open')

    document.querySelectorAll('.services__card').forEach((c) => {
      c.classList.remove('services-open')
    })

    if (!alreadyOpen) {
      card.classList.add('services-open')
    }
  })
})

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message-status')

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.getElementById('contact-name').value.trim()
    const email = document.getElementById('contact-email').value.trim()
    const message = document.getElementById('contact-message').value.trim()

    if (!name || !email || !message) {
      contactMessage.textContent = 'Please fill in every field before sending.'
      contactMessage.className = 'contact__message error'
      return
    }

    const subject = encodeURIComponent(`New message from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:musseomar56@iut-dhaka.edu?subject=${subject}&body=${body}`

    contactMessage.textContent = 'Opening your email app to send this message ✅'
    contactMessage.className = 'contact__message success'
    contactForm.reset()

    setTimeout(() => {
      contactMessage.textContent = ''
      contactMessage.className = 'contact__message'
    }, 6000)
  })
}

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = document.getElementById('scroll-up')

const showScrollUp = () => {
  if (scrollUp) {
    window.scrollY >= 400 ? scrollUp.classList.add('show-scroll')
                           : scrollUp.classList.remove('show-scroll')
  }
}
window.addEventListener('scroll', showScrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollY = window.pageYOffset

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 100
    const sectionId = current.getAttribute('id')
    const link = document.querySelector(`.nav__menu a[href*=${sectionId}]`)

    if (link) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add('active-link')
      } else {
        link.classList.remove('active-link')
      }
    }
  })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL (fallback: IntersectionObserver) ===============*/
const revealElements = document.querySelectorAll('.reveal')

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active')
        revealObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })

  revealElements.forEach((el) => revealObserver.observe(el))
} else {
  revealElements.forEach((el) => el.classList.add('reveal-active'))
}
