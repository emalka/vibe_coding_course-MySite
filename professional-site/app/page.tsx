export default function Home() {
  const careerJourney = [
    {
      period: "2024 - Present",
      role: "Solutions and Infrastructure Architect",
      company: "NICE Actimize",
      summary:
        "Architecting enterprise-scale, cloud and AI solutions across AWS and Azure while driving technical direction and pre-sales strategy.",
    },
    {
      period: "2020 - 2024",
      role: "CTO & Co-Founder",
      company: "Stratos",
      summary:
        "Built a Kubernetes-driven platform that automated enterprise system evolution and reduced development lifecycle costs.",
    },
    {
      period: "2019 - 2020",
      role: "R&D Manager - Leumi Mind",
      company: "Bank Leumi",
      summary:
        "Led modernization initiatives focused on replacing legacy banking infrastructure with robust digital systems.",
    },
    {
      period: "2017 - 2019",
      role: "Software & DevOps Engineer",
      company: "KYC Station",
      summary:
        "Developed fintech products using big data and machine learning to improve customer screening quality.",
    },
    {
      period: "2014 - 2017",
      role: "CTO & R&D Manager",
      company: "DAN-EL Financial Solutions",
      summary:
        "Directed R&D for an all-in-one investment management platform adopted by leading financial institutions in Israel.",
    },
    {
      period: "2012 - 2014",
      role: "CTO & Co-Founder",
      company: "SpotWise",
      summary:
        "Built a SaaS customer feedback platform that turned smartphone data into real-time customer experience insights.",
    },
    {
      period: "2009 - 2012",
      role: "Founder",
      company: "Copycat Software Solutions",
      summary:
        "Delivered actionable intelligence systems globally, including large project delivery as a Verint subcontractor.",
    },
    {
      period: "2000 - 2009",
      role: "Developer, R&D Manager & Group Leader",
      company: "Comverse Technology",
      summary:
        "Advanced from engineering to leadership while building telecom software at global scale.",
    },
  ];

  const capabilities = [
    "Enterprise Architecture",
    "Cloud Transformation (AWS, GCP, Azure)",
    "Agentic AI & LLM Systems",
    "Kubernetes & Platform Engineering",
    "DevOps Strategy & Delivery",
    "Technical Leadership & Pre-Sales",
  ];

  return (
    <main className="site-shell">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />

      <section className="hero reveal">
        <p className="eyebrow">ELI MALKA</p>
        <h1>
          Enterprise Precision.
          <br />
          Edgy Innovation.
        </h1>
        <p className="hero-copy">
          Co-Founder, CTO, Vibe Architect, and Agentic Coder based in Israel.
          I design scalable cloud and AI systems that turn deep technical
          complexity into measurable business outcomes.
        </p>
        <div className="hero-actions">
          <a
            className="btn btn-primary"
            href="http://www.linkedin.com/in/elimalka"
            target="_blank"
            rel="noopener noreferrer"
          >
            View LinkedIn
          </a>
          <a
            className="btn btn-secondary"
            href="mailto:eli.malka.mail@gmail.com"
          >
            Contact Me
          </a>
        </div>

        <ul className="stat-strip" aria-label="Core capabilities">
          {capabilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="content-grid">
        <article className="panel reveal">
          <h2>About Me</h2>
          <p>
            I am a technology evangelist with hands-on depth in architecture,
            cloud platforms, and engineering execution. My career has been
            defined by building secure, resilient systems and guiding teams to
            deliver ambitious products with clarity and speed.
          </p>
          <p>
            Across AWS, GCP, Azure, Kubernetes, and modern software stacks, I
            focus on practical innovation: elegant architecture, robust
            operations, and AI-enabled acceleration.
          </p>
          <p>
            <strong>Education:</strong> B.A, Chemistry &amp; Physics, The Hebrew
            University of Jerusalem
          </p>
        </article>

        <article className="panel reveal">
          <h2>Portfolio</h2>
          <p>
            A dedicated portfolio section is coming soon and will include case
            studies, architecture snapshots, and product stories.
          </p>
          <a className="portfolio-link" href="#" aria-disabled="true">
            Portfolio Launching Soon
          </a>
        </article>
      </section>

      <section className="journey reveal" id="career-journey">
        <div className="journey-headline">
          <p className="eyebrow">CAREER JOURNEY</p>
          <h2>From Engineering to Enterprise Leadership</h2>
        </div>
        <div className="timeline">
          {careerJourney.map((item) => (
            <article className="timeline-card" key={`${item.company}-${item.period}`}>
              <p className="period">{item.period}</p>
              <h3>{item.role}</h3>
              <p className="company">{item.company}</p>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer reveal">
        <p>Built with Next.js. Designed to evolve with future portfolio work.</p>
      </footer>
    </main>
  );
}
