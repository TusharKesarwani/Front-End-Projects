import {LOGO} from '../assets/images';
const Navigation = () => {
  return (
    <nav>
      <div>
        <a href="index.html">
          <img src={LOGO}alt="logo" />
        </a>
      </div>
      <div>
        <ul>
          <li>
            <a href="index.html">Home</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a
              href="https://github.com/TusharKesarwani/Front-End-Projects"
              className="github-btn"
            >
              <i className="fa-brands fa-github"></i> &nbsp; Goto GitHub Repository
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
