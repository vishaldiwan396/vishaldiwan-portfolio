import './App.css'

function App() {
  return (
    <div className="page">
      <header>
        <h1>Vishal Diwan</h1>
        <p className="tagline">Portfolio — under construction</p>
      </header>

      <nav>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>

      <main>
        <section id="about">
          <h2>About</h2>
        </section>
        <section id="projects">
          <h2>Projects</h2>
        </section>
        <section id="contact">
          <h2>Contact</h2>
        </section>
      </main>
    </div>
  )
}

export default App
