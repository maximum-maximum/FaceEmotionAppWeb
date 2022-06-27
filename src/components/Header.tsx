import { ReactComponent as Github } from "../github.svg";

const Header: React.FC = () => {
  return (
    <header>
      <h1>Face Emotion App</h1>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/maximum-maximum/FaceEmotionApp"
      >
        <Github />
      </a>
    </header>
  );
};

export default Header;
