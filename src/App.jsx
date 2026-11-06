import React, { useState } from "react";

const quizzes = [
  {
    category: "Pop culture",
    title: "Are you a true movie buff?",
    questions: 12,
    time: "4 min",
    icon: "🎬",
    color: "lavender",
    badge: "TRENDING",
  },
  {
    category: "Science",
    title: "The wonderfully weird world of space",
    questions: 10,
    time: "3 min",
    icon: "🪐",
    color: "peach",
    badge: "NEW",
  },
  {
    category: "Personality",
    title: "Which creative era are you?",
    questions: 8,
    time: "2 min",
    icon: "🎨",
    color: "lemon",
    badge: "FAN FAVE",
  },
];

const questions = [
  {
    text: "Which planet has the most moons?",
    answers: ["Jupiter", "Saturn", "Neptune", "Uranus"],
    correct: "Saturn",
  },
  {
    text: "What do you call a group of flamingos?",
    answers: ["A flamboyance", "A sparkle", "A parade", "A shimmer"],
    correct: "A flamboyance",
  },
  {
    text: "Which ocean is the largest?",
    answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: "Pacific",
  },
];

const leaderboard = [
  { place: "01", name: "Mia Chen", points: "2,840 pts", avatar: "MC", color: "avatar-pink" },
  { place: "02", name: "Noah Williams", points: "2,610 pts", avatar: "NW", color: "avatar-orange" },
  { place: "03", name: "Ava Patel", points: "2,450 pts", avatar: "AP", color: "avatar-purple" },
  { place: "04", name: "Leo Martin", points: "2,210 pts", avatar: "LM", color: "avatar-yellow" },
];

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></>,
    spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1.1 2.4L22.5 17l-2.4 1.1L19 20.5l-1.1-2.4-2.4-1.1 2.4-.6L19 14Z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    trophy: <><path d="M8 21h8m-4-4v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" /><path d="M7 6H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function Header({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const goTo = (nextPage) => {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="site-header">
      <a className="brand" href="#" onClick={(event) => { event.preventDefault(); goTo("home"); }}>
        <span className="brand-mark"><Icon name="spark" size={20} /></span>
        quizora<span className="brand-period">.</span>
      </a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
        <Icon name={menuOpen ? "close" : "menu"} />
      </button>
      <nav className={menuOpen ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
        <button className={page === "home" ? "nav-link active" : "nav-link"} onClick={() => goTo("home")}>Home</button>
        <button className={page === "explore" ? "nav-link active" : "nav-link"} onClick={() => goTo("explore")}>Explore quizzes</button>
        <button className={page === "leaderboard" ? "nav-link active" : "nav-link"} onClick={() => goTo("leaderboard")}>Leaderboard</button>
        <button className="button button-small button-dark nav-cta" onClick={() => goTo("explore")}>Start a quiz <Icon name="arrow" size={16} /></button>
      </nav>
    </header>
  );
}

function SectionTitle({ eyebrow, title, description, centered = false }) {
  return (
    <div className={centered ? "section-title centered" : "section-title"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function QuizCard({ quiz, onStart }) {
  return (
    <article className={`quiz-card ${quiz.color}`}>
      <div className="quiz-card-top">
        <span className="quiz-emoji">{quiz.icon}</span>
        <span className={`quiz-badge ${quiz.badge === "NEW" ? "badge-orange" : ""}`}>{quiz.badge}</span>
      </div>
      <span className="quiz-category">{quiz.category}</span>
      <h3>{quiz.title}</h3>
      <div className="quiz-meta">
        <span><Icon name="spark" size={15} /> {quiz.questions} questions</span>
        <span><Icon name="clock" size={15} /> {quiz.time}</span>
      </div>
      <button className="quiz-arrow" aria-label={`Start ${quiz.title}`} onClick={onStart}><Icon name="arrow" size={19} /></button>
    </article>
  );
}

function HomePage({ setPage }) {
  return (
    <>
      <main>
        <section className="hero page-width">
          <div className="hero-copy">
            <div className="hero-pill"><span className="live-dot" /> YOUR DAILY DOSE OF “DID YOU KNOW?”</div>
            <h1>Make curiosity<br />your <span>superpower.</span></h1>
            <p className="hero-description">Big brain energy, zero boring bits. Jump into quizzes that make learning feel like the best part of your day.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => setPage("explore")}>Find your next quiz <Icon name="arrow" size={18} /></button>
              <div className="avatar-stack" aria-label="Join 24,000 curious minds">
                <span className="mini-avatar mini-one">J</span><span className="mini-avatar mini-two">M</span><span className="mini-avatar mini-three">A</span>
                <span className="avatar-caption"><strong>24k+</strong> curious minds</span>
              </div>
            </div>
            <div className="hero-proof"><span className="stars">★★★★★</span><span>Loved by quiz people everywhere</span></div>
          </div>
          <div className="hero-art" aria-label="Quiz illustration">
            <div className="art-glow" />
            <div className="hero-doodle doodle-spark"><Icon name="spark" size={30} /></div>
            <div className="hero-doodle doodle-star">✳</div>
            <div className="quiz-window">
              <div className="window-header"><span /><span /><span /><b>QUICK QUIZ</b></div>
              <div className="window-content">
                <div className="question-count">QUESTION 03 <span>OF 08</span></div>
                <div className="window-progress"><span /></div>
                <h3>Which animal has<br />three hearts?</h3>
                <div className="answer-option"><span>A</span> Sea turtle</div>
                <div className="answer-option answer-correct"><span>B</span> Octopus <Icon name="check" size={16} /></div>
                <div className="answer-option"><span>C</span> Blue whale</div>
              </div>
            </div>
            <div className="floating-card score-card"><span className="score-icon">⚡</span><div><strong>+120 XP</strong><small>Nice one!</small></div></div>
            <div className="floating-card streak-card"><span>🔥</span><strong>5 day streak</strong></div>
            <span className="hero-caption">A little smarter, every day.</span>
          </div>
        </section>

        <section className="stats-strip">
          <div className="stats-inner page-width">
            <div><strong>250<span>+</span></strong><small>quizzes to explore</small></div>
            <div><strong>24k<span>+</span></strong><small>curious minds & counting</small></div>
            <div><strong>4.9<span>/5</span></strong><small>from happy quiz takers</small></div>
            <div><strong>5 min</strong><small>to learn something new</small></div>
          </div>
        </section>

        <section className="featured-section page-width">
          <div className="featured-heading">
            <SectionTitle eyebrow="A GOOD PLACE TO START" title={<>Your next “oh, <span className="text-accent">that’s cool!</span>”</>} description="Hand-picked quizzes for your curious little brain." />
            <button className="text-link" onClick={() => setPage("explore")}>See all quizzes <Icon name="arrow" size={17} /></button>
          </div>
          <div className="quiz-grid">
            {quizzes.map((quiz) => <QuizCard key={quiz.title} quiz={quiz} onStart={() => setPage("quiz")} />)}
          </div>
        </section>

        <section className="how-section">
          <div className="page-width how-inner">
            <div className="how-copy">
              <SectionTitle eyebrow="NO HOMEWORK VIBES HERE" title={<>Learning that<br /><span className="text-accent">doesn’t feel like it.</span></>} description="A little play, a little friendly competition, and a whole lot of “wait, really?”" />
              <button className="button button-dark" onClick={() => setPage("explore")}>Okay, I’m in <Icon name="arrow" size={18} /></button>
            </div>
            <div className="steps">
              <div className="step-card"><span className="step-number">01</span><div className="step-icon step-purple">🧭</div><div><h3>Pick your rabbit hole</h3><p>Movies, science, history, or how weird your brain is. You choose.</p></div></div>
              <div className="step-card"><span className="step-number">02</span><div className="step-icon step-orange">🧠</div><div><h3>Trust your gut</h3><p>Quick questions, no pressure. Get it right? Feel like a genius.</p></div></div>
              <div className="step-card"><span className="step-number">03</span><div className="step-icon step-pink">🎉</div><div><h3>Collect your bragging rights</h3><p>Stack points, build a streak, and challenge your favorite know-it-all.</p></div></div>
            </div>
          </div>
        </section>
        

        <section className="testimonial-section page-width">
          <div className="testimonial-card">
            <span className="quote-mark">“</span>
            <p>I opened Quizora for a five-minute break. An hour later I knew all about deep-sea creatures and had challenged my entire group chat.</p>
            <div className="testimonial-person"><span className="person-avatar">S</span><span><strong>Sam Rivera</strong><small>Quizora regular & octopus enthusiast</small></span><span className="testimonial-stars">★★★★★</span></div>
          </div>
          <div className="testimonial-side"><span className="eyebrow">THE GROUP CHAT APPROVES</span><h2>Turns out,<br /><span className="text-accent">curiosity is contagious.</span></h2><p>Make your next “you won’t believe this” a really good one.</p><div className="friend-count"><Icon name="users" size={18} /> 8,400+ friend challenges this week</div></div>
        </section>

        <section className="bottom-cta page-width">
          <div className="cta-confetti confetti-one">✳</div><div className="cta-confetti confetti-two">✦</div>
          <span className="eyebrow">READY WHEN YOU ARE</span>
          <h2>Go on. Get a little<br /><span>curious.</span></h2>
          <p>Your new favorite five-minute break is right here.</p>
          <button className="button button-white" onClick={() => setPage("explore")}>Explore quizzes <Icon name="arrow" size={18} /></button>
          <small>Free to play. Fun to know.</small>
        </section>
      </main>
    </>
  );
}

function ExplorePage({ setPage }) {
  const [filter, setFilter] = useState("All quizzes");
  const extraQuizzes = [
    { category: "History", title: "A very short trip through ancient Egypt", questions: 10, time: "3 min", icon: "🏺", color: "lavender", badge: "POPULAR" },
    { category: "Nature", title: "How much do you know about the ocean?", questions: 12, time: "4 min", icon: "🐙", color: "peach", badge: "NEW" },
    { category: "Food", title: "Can you guess these snacks blindfolded?", questions: 8, time: "2 min", icon: "🍓", color: "lemon", badge: "FAN FAVE" },
  ];
  const allQuizzes = [...quizzes, ...extraQuizzes];
  const categories = ["All quizzes", "Pop culture", "Science", "Personality", "History", "Nature"];
  const visibleQuizzes = filter === "All quizzes" ? allQuizzes : allQuizzes.filter((quiz) => quiz.category === filter);

  return (
    <main className="subpage page-width">
      <div className="subpage-heading">
        <span className="eyebrow">THE FUN PART STARTS HERE</span>
        <h1>Find your next<br /><span className="text-accent">rabbit hole.</span></h1>
        <p>Pick a topic, trust your instincts, and see what you know.</p>
      </div>
      <div className="filter-row" aria-label="Filter quizzes">
        {categories.map((category) => <button key={category} className={filter === category ? "filter-chip selected" : "filter-chip"} onClick={() => setFilter(category)}>{category}</button>)}
      </div>
      <div className="quiz-grid explore-grid">
        {visibleQuizzes.map((quiz) => <QuizCard key={quiz.title} quiz={quiz} onStart={() => setPage("quiz")} />)}
      </div>
      {visibleQuizzes.length === 0 && <p className="empty-state">More {filter.toLowerCase()} quizzes are on the way. Pick another topic for now!</p>}
      <div className="explore-note"><span>✨</span><p><strong>A little tip:</strong> You don’t have to know everything to have fun. That’s kind of the point.</p></div>
    </main>
  );
}

function LeaderboardPage() {
  const [period, setPeriod] = useState("This week");
  return (
    <main className="subpage page-width leaderboard-page">
      <div className="subpage-heading">
        <span className="eyebrow">THE FRIENDLY FLEX ZONE</span>
        <h1>Brains, meet<br /><span className="text-accent">bragging rights.</span></h1>
        <p>A little competition never hurt anybody. (Probably.)</p>
      </div>
      <div className="leaderboard-card">
        <div className="leaderboard-header"><div><span className="eyebrow">TOP QUIZORAS</span><h2>Curiosity looks good on you.</h2></div><div className="period-picker">{["This week", "All time"].map((item) => <button key={item} className={period === item ? "period-active" : ""} onClick={() => setPeriod(item)}>{item}</button>)}</div></div>
        <div className="leaderboard-list">{leaderboard.map((person, index) => <div className={index === 0 ? "leader-row first-place" : "leader-row"} key={person.name}><span className="leader-place">{person.place}</span><span className={`leader-avatar ${person.color}`}>{person.avatar}</span><strong>{person.name}{index === 0 && <span className="crown"> 👑</span>}</strong><span className="leader-points">{person.points}</span></div>)}</div>
        <div className="your-rank"><span>YOUR SPOT</span><strong>Keep playing to join the board <span>→</span></strong></div>
      </div>
      <div className="leaderboard-footnote"><span>🏆</span> Points reset every Monday. Your curiosity? That’s forever.</div>
    </main>
  );
}

function QuizPage({ setPage }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = questions[questionIndex];

  const chooseAnswer = (answer) => {
    if (selected) return;
    setSelected(answer);
    if (answer === question.correct) setScore((current) => current + 1);
  };

  const nextQuestion = () => {
    if (questionIndex === questions.length - 1) setFinished(true);
    else {
      setQuestionIndex((current) => current + 1);
      setSelected("");
    }
  };

  return (
    <main className="quiz-page page-width">
      <button className="back-link" onClick={() => setPage("explore")}>← Back to quizzes</button>
      <section className="quiz-player">
        {finished ? (
          <div className="quiz-result"><div className="result-emoji">🎉</div><span className="eyebrow">QUIZ COMPLETE</span><h1>You got <span className="text-accent">{score} out of {questions.length}!</span></h1><p>That’s some seriously good brain energy.</p><div className="result-points">⚡ +{score * 100} XP</div><button className="button button-primary" onClick={() => { setQuestionIndex(0); setSelected(""); setScore(0); setFinished(false); }}>Play again <Icon name="arrow" size={18} /></button><button className="text-link result-explore" onClick={() => setPage("explore")}>Try another quiz</button></div>
        ) : (
          <>
            <div className="player-top"><span className="eyebrow">A LITTLE BIT OF EVERYTHING</span><span className="player-count">0{questionIndex + 1} <span>/ 0{questions.length}</span></span></div>
            <div className="player-progress"><span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>
            <h1>{question.text}</h1>
            <div className="answer-list">{question.answers.map((answer, index) => {
              const isSelected = selected === answer;
              const isCorrect = selected && answer === question.correct;
              return <button key={answer} className={`player-answer${isSelected ? " chosen" : ""}${isCorrect ? " correct" : ""}${isSelected && !isCorrect ? " incorrect" : ""}`} onClick={() => chooseAnswer(answer)} disabled={Boolean(selected)}><span className="answer-letter">{String.fromCharCode(65 + index)}</span>{answer}{isCorrect && <Icon name="check" size={18} />}</button>;
            })}</div>
            {selected && <div className={selected === question.correct ? "answer-feedback feedback-good" : "answer-feedback feedback-oops"}>{selected === question.correct ? "You got it! Look at that big brain." : `Not quite! The answer was ${question.correct}.`}</div>}
            <button className="button button-dark next-question" onClick={nextQuestion} disabled={!selected}>{questionIndex === questions.length - 1 ? "See my score" : "Next question"} <Icon name="arrow" size={18} /></button>
          </>
        )}
      </section>
      <p className="player-disclaimer">No pressure. This is just for fun (and the occasional bragging right).</p>
    </main>
  );
}

function Footer({ setPage }) {
  const goTo = (page) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="site-footer">
      <div className="footer-main page-width">
        <div className="footer-brand-block"><a className="brand" href="#" onClick={(event) => { event.preventDefault(); goTo("home"); }}><span className="brand-mark"><Icon name="spark" size={20} /></span>quizora<span className="brand-period">.</span></a><p>Stay curious. The world’s got<br />some pretty good trivia.</p></div>
        <div className="footer-links"><div><strong>Explore</strong><button onClick={() => goTo("explore")}>All quizzes</button><button onClick={() => goTo("explore")}>Popular topics</button><button onClick={() => goTo("leaderboard")}>Leaderboard</button></div><div><strong>The good stuff</strong><a href="#how-it-works" onClick={(event) => { event.preventDefault(); goTo("home"); }}>How it works</a><a href="#about" onClick={(event) => { event.preventDefault(); goTo("home"); }}>About Quizora</a><a href="mailto:hello@quizora.example">Say hello</a></div></div>
        <div className="footer-note"><span>MADE FOR CURIOUS MINDS</span><div>🧡 &nbsp;🩷 &nbsp;✨</div></div>
      </div>
      <div className="footer-bottom page-width"><span>© 2025 Quizora. Keep that brain busy.</span><span>Made with curiosity (and a little caffeine).</span></div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  return (
    <div className="app-shell">
      <div className="announcement"><Icon name="spark" size={14} /> A fresh batch of quizzes just dropped <span>→</span></div>
      <Header page={page} setPage={setPage} />
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "explore" && <ExplorePage setPage={setPage} />}
      {page === "leaderboard" && <LeaderboardPage />}
      {page === "quiz" && <QuizPage setPage={setPage} />}
      <Footer setPage={setPage} />
    </div>
  );
}
