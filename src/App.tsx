import { useEffect, useRef, useState } from 'react'
import './App.css'

/** Phone numbers from the Enterprise Mate profile PDF (contact slide). */
const WHATSAPP_NUMBERS = [
  { display: '+263 735 434 213', digits: '263735434213' },
  { display: '+263 784 028 907', digits: '263784028907' },
] as const

const COMING_SOON = [
  {
    title: 'Digital Transformation',
    eyebrow: 'Advisory',
    lead:
      'A structured consulting engagement that helps organisations turn Microsoft investments into measurable operating change — not a one-size software product.',
    items: [
      'Current-state assessment of ERP, CRM, collaboration, and reporting landscapes',
      'Roadmaps that sequence Dynamics, Power Platform, M365, and data initiatives',
      'Change management, adoption programmes, and knowledge transfer for lasting use',
      'Programme and project governance aligned to Agile and PMP-disciplined delivery',
    ],
  },
  {
    title: 'Cyber Security',
    eyebrow: 'Assurance',
    lead:
      'Practical security advisory layered onto the Microsoft stack your teams already run — framed as consultancy and hardening guidance, not a proprietary appliance.',
    items: [
      'Identity, access, and Microsoft 365 / Azure security posture reviews',
      'Guidance on secure configuration, least privilege, and operational controls',
      'Awareness and readiness workshops for leadership and technical teams',
      'Integration of security considerations into ERP and cloud migration programmes',
    ],
  },
] as const

const PRODUCTS = [
  {
    title: 'Microsoft Dynamics CRM and ERP Solutions',
    items: ['Implementation', 'Customization', 'Integration', 'Support and Maintenance'],
  },
  {
    title: 'Microsoft Power BI Solutions',
    items: [
      'Data Analysis',
      'Reporting',
      'Dashboard Development',
      'Integration with Dynamics CRM and ERP',
    ],
  },
  {
    title: 'Microsoft 365 Implementation',
    items: [
      'Deployment Planning',
      'Migration Services',
      'Configuration and Setup',
      'Training and Adoption Programs',
    ],
  },
  {
    title: 'Microsoft Training Services',
    items: [
      'Dynamics 365 Training',
      'Microsoft 365 Training',
      'Azure Training',
      'Power Platform Training',
      'AI and Data Science Training',
    ],
  },
  {
    title: 'Electronic Label Solutions',
    items: ['Electronic Price Labels', 'Retail Labeling Systems', 'Integration with ERP Systems'],
  },
  {
    title: 'Project Management Consultancy and Training',
    items: [
      'Project Planning and Execution',
      'Agile Methodologies',
      'PMP Certification Training',
      'Customized Project Management Workshops',
    ],
  },
] as const

const SERVICES = [
  'Bespoke customisations and development',
  'Project management',
  'ERP Support',
  'ERP deployments',
  'ERP health checks',
  'Small business server setups',
] as const

const VALUES = [
  'Thorough understanding of customer needs',
  'Rapid execution',
  'Innovation',
  'Knowledge transfer',
  'Transparency',
] as const

const DIFFERENTIATORS = [
  {
    title: 'Expertise',
    body: 'Certified professionals with extensive experience in Microsoft technologies and project management.',
  },
  {
    title: 'Customization',
    body: 'Tailored solutions to meet specific business needs and industry requirements.',
  },
  {
    title: 'Training Excellence',
    body: 'Comprehensive training programs to empower organizations in leveraging technology effectively.',
  },
  {
    title: 'Innovation',
    body: 'Continuous adaptation of cutting-edge technologies like AI and Data Science to enhance business operations.',
  },
] as const

const PROJECTS = [
  {
    client: 'Northern Region Water Board Malawi',
    work: 'Implementation of Microsoft Dynamics AX',
  },
  {
    client: 'America Tower Corporation Niger',
    work: 'Migration of Microsoft Dynamics GP to ATC cloud',
  },
  {
    client: 'America Tower Corporation Burkina Faso',
    work: 'Migration of Microsoft Dynamics GP to ATC cloud',
  },
  {
    client: 'Data Africa',
    work: 'Project Management for CIMAS digital transformation',
  },
  {
    client: 'Eaton Tower Burkina Faso',
    work: 'Implementation of Microsoft Dynamics GP Fixed Assets',
  },
] as const

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroOffset, setHeroOffset] = useState(0)
  const heroRef = useRef<HTMLElement | null>(null)
  useReveal()

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      if (reduceMotion || !heroRef.current) return
      const y = window.scrollY
      const h = heroRef.current.offsetHeight
      if (y < h) setHeroOffset(y * 0.28)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="nav__brand" href="#top" aria-label="Enterprise Mate home">
          <img
            className="nav__logo"
            src="/assets/logo-wordmark.png"
            alt="Enterprise Mate"
            width={220}
            height={72}
          />
        </a>
        <nav className="nav__links" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a href="#coming-soon">Coming soon</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a className="nav__cta" href="#contact">
            Contact
          </a>
        </nav>
        <button
          className="nav__burger"
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`nav__drawer ${menuOpen ? 'is-open' : ''}`} role="dialog" aria-modal="true">
        <button className="nav__drawer-close" type="button" aria-label="Close menu" onClick={closeMenu}>
          ×
        </button>
        <a href="#about" onClick={closeMenu}>
          About
        </a>
        <a href="#products" onClick={closeMenu}>
          Products
        </a>
        <a href="#coming-soon" onClick={closeMenu}>
          Coming soon
        </a>
        <a href="#services" onClick={closeMenu}>
          Services
        </a>
        <a href="#projects" onClick={closeMenu}>
          Projects
        </a>
        <a href="#contact" onClick={closeMenu}>
          Contact
        </a>
      </div>

      <main id="main">
        <section className="hero" id="top" ref={heroRef}>
          <div
            className="hero__media"
            aria-hidden="true"
            style={{ transform: `translate3d(0, ${heroOffset}px, 0)` }}
          >
            <img
              src="/assets/hero-building.jpeg"
              alt=""
              width={1713}
              height={1482}
              fetchPriority="high"
            />
          </div>
          <div className="hero__shade" aria-hidden="true" />
          <div className="hero__accent-bar" aria-hidden="true" />
          <div className="tri tri--red tri--1" aria-hidden="true" />
          <div className="tri tri--white tri--2" aria-hidden="true" />
          <div className="tri tri--red tri--3" aria-hidden="true" />

          <div className="hero__content">
            <div className="hero__brand hero-enter">
              <img
                className="hero__logo"
                src="/assets/logo-wordmark.png"
                alt="Enterprise Mate"
                width={420}
                height={138}
              />
            </div>
            <div className="hero__title-rule hero-enter hero-enter--d1" aria-hidden="true" />
            <h1 className="hero__title hero-enter hero-enter--d2">
              Redefining Enterprise Resource Planning
            </h1>
            <p className="hero__sub hero-enter hero-enter--d3">
              Integrated Microsoft Dynamics, Power BI, and Microsoft 365 solutions — tailored for
              organisations ready for total digital transformation.
            </p>
            <div className="hero__actions hero-enter hero-enter--d4">
              <a className="btn btn--primary" href="#contact">
                Talk to us
              </a>
              <a className="btn btn--ghost" href="#products">
                Explore offerings
              </a>
              <a
                className="btn btn--whatsapp"
                href={`https://wa.me/${WHATSAPP_NUMBERS[0].digits}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="section__inner about__grid">
            <div className="about__copy reveal">
              <p className="eyebrow">Company</p>
              <h2 className="section-title">
                <span className="accent">About</span> our company
              </h2>
              <div className="rule" aria-hidden="true" />
              <p>
                Established in 2017, Enterprise Mate is a Zimbabwean domiciled company with a global
                outlook. We are a fast-growing provider of integrated technology solutions,
                specializing in Microsoft Dynamics CRM and ERP systems, Microsoft Power BI for
                advanced data analysis, and comprehensive Microsoft 365 implementation services. We
                excel in delivering tailored training programs across Microsoft platforms including
                Dynamics 365, Microsoft 365, Azure, Power Platform, AI, and Data Science. In
                addition to our core offerings, we provide electronic label solutions for efficient
                price labeling and offer expert project management consultancy and training
                services.
              </p>
            </div>
            <div className="about__visual reveal reveal-delay-1">
              <img
                src="/assets/about-architecture.jpeg"
                alt="Modern glass architecture looking skyward"
                width={1412}
                height={1412}
                loading="lazy"
              />
              <div className="tri tri--red tri--1" aria-hidden="true" />
              <div className="tri tri--white tri--2" aria-hidden="true" />
              <div className="tri tri--red tri--3" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="vision" id="vision">
          <div className="vision__banner">
            <img
              src="/assets/mission-skyline.jpeg"
              alt="Night city skyline with illuminated highways"
              width={3000}
              height={820}
              loading="lazy"
            />
            <div className="vision__banner-shade" aria-hidden="true" />
            <h2 className="reveal">
              <span className="accent">Vision</span> &amp; Mission
            </h2>
          </div>
          <div className="vision__panel">
            <div className="vision__split">
              <article className="vision__item reveal">
                <h3>Vision</h3>
                <p>
                  To be the technology partner of choice for organisations seeking total digital
                  transformation.
                </p>
              </article>
              <article className="vision__item reveal reveal-delay-1">
                <h3>Mission</h3>
                <p>To redefine Enterprise Resource Planning through innovation and disruption.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section values" id="values">
          <div className="section__inner values__grid">
            <div className="reveal">
              <p className="eyebrow">Culture</p>
              <h2 className="section-title">
                <span className="accent">Our</span> values
              </h2>
              <div className="rule" aria-hidden="true" />
              <ul className="values__list">
                {VALUES.map((value) => (
                  <li className="value-row" key={value}>
                    <span className="value-row__icon" aria-hidden="true" />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="values__visual reveal reveal-delay-1">
              <img
                src="/assets/values-office.jpeg"
                alt="City skyline at dusk"
                width={958}
                height={617}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="section products" id="products">
          <div className="section__inner">
            <div className="reveal">
              <p className="eyebrow">Offerings</p>
              <h2 className="section-title">
                <span className="accent">Our</span> products
              </h2>
              <p className="section-lead">
                Enterprise Mate offers a range of top-class Enterprise Resource Planning solutions.
                These solutions are best of breed, and we take great care to ensure they are tailor
                made to each customer’s unique requirements.
              </p>
            </div>
            <div className="product-grid">
              {PRODUCTS.map((product, index) => (
                <article
                  className={`product reveal ${index % 3 === 1 ? 'reveal-delay-1' : ''} ${index % 3 === 2 ? 'reveal-delay-2' : ''}`}
                  key={product.title}
                >
                  <h3>{product.title}</h3>
                  <ul>
                    {product.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section coming-soon" id="coming-soon">
          <div className="section__inner">
            <div className="reveal">
              <p className="eyebrow">Next chapter</p>
              <h2 className="section-title">
                <span className="accent">Coming</span> soon
              </h2>
              <p className="section-lead">
                Expanding our advisory practice with Digital Transformation and Cyber Security —
                consulting-led services that build on our Microsoft Dynamics, Power Platform, and
                project delivery strengths.
              </p>
            </div>
            <div className="coming-soon__grid">
              {COMING_SOON.map((block, index) => (
                <article
                  className={`coming-card reveal ${index === 1 ? 'reveal-delay-1' : ''}`}
                  key={block.title}
                >
                  <p className="coming-card__eyebrow">{block.eyebrow}</p>
                  <h3>{block.title}</h3>
                  <p className="coming-card__lead">{block.lead}</p>
                  <ul>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="coming-card__note">Engagement-based consulting — details on request.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="section__inner">
            <div className="reveal">
              <p className="eyebrow">Delivery</p>
              <h2 className="section-title">
                <span className="accent">Our</span> services
              </h2>
              <p className="section-lead">
                To ensure that customers efficiently make use of their investment in technology,
                Enterprise Mate offers the following services:
              </p>
            </div>
            <ul className="service-list">
              {SERVICES.map((service, index) => (
                <li
                  className={`service-item reveal ${index % 2 === 1 ? 'reveal-delay-1' : ''}`}
                  key={service}
                >
                  <span className="service-item__ring" aria-hidden="true" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section diff" id="differentiators">
          <div className="section__inner">
            <div className="reveal">
              <p className="eyebrow">Why us</p>
              <h2 className="section-title">
                Key <span className="accent">differentiators</span>
              </h2>
              <div className="rule" aria-hidden="true" />
            </div>
            <div className="diff-grid">
              {DIFFERENTIATORS.map((item, index) => (
                <article
                  className={`diff-item reveal ${index % 2 === 1 ? 'reveal-delay-1' : ''}`}
                  key={item.title}
                >
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <div className="clientele reveal">
              <p className="eyebrow">Clientele</p>
              <h3 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
                Enterprises across industries
              </h3>
              <p>
                Our clientele includes enterprises across various industries seeking to optimize
                operations, improve customer engagement, and drive business growth through advanced
                technology solutions.
              </p>
            </div>
          </div>
        </section>

        <section className="section projects" id="projects">
          <div className="section__inner">
            <div className="reveal">
              <p className="eyebrow">Track record</p>
              <h2 className="section-title">
                <span className="accent">Key</span> projects
              </h2>
              <div className="rule" aria-hidden="true" />
            </div>
            <div className="project-rail">
              {PROJECTS.map((project, index) => (
                <article
                  className={`project reveal ${index % 3 === 1 ? 'reveal-delay-1' : ''} ${index % 3 === 2 ? 'reveal-delay-2' : ''}`}
                  key={`${project.client}-${project.work}`}
                >
                  <h3>{project.client}</h3>
                  <p>{project.work}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact__media" aria-hidden="true">
            <img
              src="/assets/contact-cityscape.jpeg"
              alt=""
              width={1514}
              height={643}
              loading="lazy"
            />
          </div>
          <div className="contact__shade" aria-hidden="true" />
          <div className="contact__inner">
            <div className="reveal">
              <h2 className="contact__title">
                <span className="accent">Thank</span> you
              </h2>
              <p className="contact__note">We look forward to working with you.</p>
            </div>
            <div className="reveal reveal-delay-1">
              <p className="eyebrow">Contact us</p>
              <div className="contact-list">
                {WHATSAPP_NUMBERS.map((phone) => (
                  <a
                    key={phone.digits}
                    href={`https://wa.me/${phone.digits}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="contact-list__icon" aria-hidden="true">
                      WA
                    </span>
                    <span>
                      WhatsApp {phone.display}
                      <span className="contact-list__hint">Opens WhatsApp chat</span>
                    </span>
                  </a>
                ))}
                <a href="tel:+263735434213">
                  <span className="contact-list__icon" aria-hidden="true">
                    T
                  </span>
                  <span>+263 735 434 213 / +263 784 028 907</span>
                </a>
                <a href="mailto:info@enterprise-mate.co.zw">
                  <span className="contact-list__icon" aria-hidden="true">
                    E
                  </span>
                  <span>info@enterprise-mate.co.zw</span>
                </a>
                <a href="https://www.enterprise-mate.co.zw" target="_blank" rel="noreferrer">
                  <span className="contact-list__icon" aria-hidden="true">
                    W
                  </span>
                  <span>www.enterprise-mate.co.zw</span>
                </a>
                <span>
                  <span className="contact-list__icon" aria-hidden="true">
                    A
                  </span>
                  <span>105 Harare Drive, Marlborough, Harare, Zimbabwe</span>
                </span>
              </div>
              <p className="contact__reg">Company registration: 522/17</p>
              <div className="contact__actions">
                <a className="btn btn--primary" href="mailto:info@enterprise-mate.co.zw">
                  Email Enterprise Mate
                </a>
                <a
                  className="btn btn--whatsapp"
                  href={`https://wa.me/${WHATSAPP_NUMBERS[0].digits}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="footer__brand" href="#top" aria-label="Enterprise Mate home">
          <img
            className="footer__logo"
            src="/assets/logo-wordmark.png"
            alt="Enterprise Mate"
            width={180}
            height={59}
          />
        </a>
        <div className="footer__meta">
          <p>© {new Date().getFullYear()} Enterprise Mate. Redefining Enterprise Resource Planning.</p>
          <p className="footer__credit">
            Designed by{' '}
            <a
              href="https://www.linkedin.com/in/arnold-ndoro-a9b589292"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anolah
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
