"use client";

import { FormEvent, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "I am Eli's Digital Twin. Ask me about Eli's career, leadership experience, cloud architecture work, or AI journey.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const careerJourney = [
    {
      period: "February 2024 - Present",
      role: "Solutions and Infrastructure Architect",
      company: "NICE Actimize",
      summary:
        "Designing large-scale, data-intensive cloud (AWS/Azure) and AI solutions, while leading technical direction, requirement validation, and pre-sales architecture.",
    },
    {
      period: "December 2020 - January 2024",
      role: "CTO and Co-Founder",
      company: "Stratos",
      summary:
        "Co-founded Stratos Systems and built a Kubernetes-driven platform that automated enterprise system generation and evolution, reducing development lifecycle cost and time-to-market.",
    },
    {
      period: "September 2019 - December 2020",
      role: "R&D Manager - Leumi Mind",
      company: "Bank Leumi",
      summary:
        "Led the flagship Leumi Mind modernization initiative focused on replacing mainframe banking systems with modern software architecture.",
    },
    {
      period: "October 2017 - September 2019",
      role: "Software & DevOps Engineer",
      company: "KYC Station",
      summary:
        "Built fintech solutions using big data and machine learning to deliver high-quality customer screening for banking organizations.",
    },
    {
      period: "May 2014 - September 2017",
      role: "CTO & R&D Manager",
      company: "DAN-EL Financial Solutions",
      summary:
        "Directed R&D for an all-in-one investment management platform adopted by 15 of the 20 largest financial institutions in Israel.",
    },
    {
      period: "March 2012 - April 2014",
      role: "CTO and Co-Founder",
      company: "SpotWise",
      summary:
        "Built a SaaS platform collecting smartphone feedback and turning it into real-time, actionable customer experience insights.",
    },
    {
      period: "January 2009 - March 2012",
      role: "Founder",
      company: "Copycat Software Solutions",
      summary:
        "Founded and delivered actionable intelligence solutions globally, including more than 20 successful projects as a Verint subcontractor.",
    },
    {
      period: "February 2000 - January 2009",
      role: "Developer, R&D Manager & Group Leader",
      company: "Comverse Technology",
      summary:
        "Progressed from engineering to leadership while delivering telecom software at global scale in a world-leading voice mail provider.",
    },
  ];

  const capabilities = [
    "Vibe Coding",
    "Large Language Models (LLM) & Agentic AI",
    "Enterprise Architecture",
    "Cloud Transformation (AWS, GCP, Azure)",
    "Kubernetes, Docker, Helm & Terraform",
    "Technical Leadership, DevOps & Pre-Sales",
  ];

  const handsOnStack = [
    "Technologies: Kubernetes, Docker, Helm, Terraform, Microservices, Kafka, Redis, MongoDB, Elasticsearch, Nginx, Spark, SQL",
    "Languages & Frameworks: Python, Java, C#, C++, Scala, JavaScript, Spring Boot, Node.js, .NET Core, Angular",
    "Cloud & OS: AWS, GCP, Azure, Linux, Mac, Windows, Android",
    "Tools: Git, Bitbucket, Jira, Confluence, CircleCI, Team System, Slack",
  ];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const question = input.trim();
    if (!question || isLoading) {
      return;
    }

    setError("");
    setInput("");

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: question },
    ];
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/digital-twin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const payload: unknown = await response.json();
      const answer =
        typeof payload === "object" &&
        payload !== null &&
        "answer" in payload &&
        typeof payload.answer === "string"
          ? payload.answer
          : null;

      if (!response.ok || !answer) {
        const detail =
          typeof payload === "object" &&
          payload !== null &&
          "error" in payload &&
          typeof payload.error === "string"
            ? payload.error
            : "The Digital Twin is currently unavailable.";

        throw new Error(detail);
      }

      setMessages((current) => [...current, { role: "assistant", content: answer }]);
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Could not reach the Digital Twin.";

      setError(message);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I could not answer right now because the model connection failed. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="site-shell">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />

      <section className="hero reveal">
        <p className="eyebrow">ELI MALKA</p>
        <h1>
          CTO.
          <br />
          Vibe Coder.
        </h1>
        <p className="hero-copy">
          I am Eli Malka, Co-Founder, CTO, Vibe Architect, and Agentic Coder
          based in Israel. I design and implement scalable cloud and AI
          architectures, translating deep technical complexity into secure,
          resilient, and business-aligned outcomes.
        </p>
        <div className="hero-actions">
          <a
            className="btn btn-primary"
            href="https://www.linkedin.com/in/elimalka"
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
            My professional journey is defined by technological excellence and
            innovation. I bring hands-on depth and strategic vision in
            architecture, cloud initiatives, development leadership, and DevOps
            execution.
          </p>
          <p>
            I have led cloud migrations and implementations across AWS and GCP,
            and I design robust, scalable, and secure enterprise systems with a
            practical, outcomes-first approach.
          </p>
          <p>
            <strong>Education:</strong> B.A, Chemistry &amp; Physics, The Hebrew
            University of Jerusalem
          </p>
        </article>

        <article className="panel reveal">
          <h2>Hands-on Knowledge</h2>
          {handsOnStack.map((item) => (
            <p key={item}>{item}</p>
          ))}
          <p>
            Contact: <a href="mailto:eli.malka.mail@gmail.com">eli.malka.mail@gmail.com</a>
          </p>
          <a
            className="portfolio-link"
            href="https://www.linkedin.com/in/elimalka"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn Profile
          </a>
        </article>
      </section>

      <section className="panel reveal chat-panel" id="digital-twin">
        <p className="eyebrow">DIGITAL TWIN</p>
        <h2>Ask AI About Eli&apos;s Career</h2>
        <p className="chat-intro">
          This assistant answers using Eli&apos;s profile details and experience.
        </p>

        <div className="chat-log" aria-live="polite">
          {messages.map((message, index) => (
            <article
              className={`chat-message ${message.role}`}
              key={`${message.role}-${index}`}
            >
              <p className="chat-role">
                {message.role === "assistant" ? "Digital Twin" : "You"}
              </p>
              <p>{message.content}</p>
            </article>
          ))}
        </div>

        <form className="chat-form" onSubmit={handleSubmit}>
          <label className="chat-label" htmlFor="career-question">
            Ask a question
          </label>
          <textarea
            id="career-question"
            className="chat-input"
            placeholder="Example: What cloud platforms has Eli led projects on?"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={3}
            disabled={isLoading}
            required
          />
          <button className="btn btn-primary chat-submit" type="submit" disabled={isLoading}>
            {isLoading ? "Thinking..." : "Ask Digital Twin"}
          </button>
        </form>

        {error ? <p className="chat-error">{error}</p> : null}
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
        <p>Built with Next.js. Updated from latest professional profile details.</p>
      </footer>
    </main>
  );
}
