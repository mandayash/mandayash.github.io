export default function Home() {
  return (
    <main className="desktop-container">
      {/* Sticky Note - Top Left */}
      <div className="sticky-note-container">
        <div className="sticky-note">
          <div className="sticky-header">To do:</div>
          <ul className="sticky-list">
            <li>Land my dream UX job</li>
            <li>Drink water</li>
            <li>Move to the US</li>
            <li>Finish grad school without losing my mind</li>
            <li>Build that banger spotify playlist</li>
            <li>Learn how to cook</li>
            <li>Get really good at making people</li>
            <li>Travel somewhere new every year</li>
          </ul>
        </div>
      </div>

      {/* Welcome Text - Center */}
      <div className="welcome-container">
        <h1 className="welcome-text">welcome to my</h1>
        <h2 className="portfolio-text">portfolio.</h2>
      </div>

      {/* Folder Icons - Right Side */}
      <div className="folders-container">
        <div className="folder-item">
          <div className="folder-icon"></div>
          <span className="folder-label">Project 01 (AbsolutMess)</span>
        </div>
        <div className="folder-item">
          <div className="folder-icon"></div>
          <span className="folder-label">Project 02 (Simplingo)</span>
        </div>
        <div className="folder-item">
          <div className="folder-icon"></div>
          <span className="folder-label">Project 03 (Leafpress)</span>
        </div>
        <div className="folder-item">
          <div className="folder-icon"></div>
          <span className="folder-label">Project 04 (Amazon)</span>
        </div>
      </div>

      {/* File Icons - Bottom Left */}
      <div className="files-container">
        <div className="file-item">
          <div className="file-icon pdf-icon"></div>
          <span className="file-label">Resume.pdf</span>
        </div>
        <div className="file-item">
          <div className="file-icon folder-icon-small"></div>
          <span className="file-label">About Me</span>
        </div>
      </div>
    </main>
  );
}