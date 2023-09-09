import React from "react";
import githubLogo from "../../../assets/GitHub-Mark-120px-plus.png";
import linkedInLogo from "../../../assets/LI-In-Bug.png";

const Footer: React.FC = () => {
  return (
    <div className="mb-2 py-1 px-2 flex text-xs text-purple-500  bg-white">
      <div className="mx-1 flex-initial text-left">
        <a href="https://github.com/Planxnx">
          <img src={githubLogo} alt="Planxnx's Github" className="h-5"></img>
        </a>
      </div>
      <div className="mx-1 flex-initial	 text-left">
        <a href="https://www.linkedin.com/in/planxnx/">
          <img
            src={linkedInLogo}
            alt="Planxnx's LinkedIn"
            className="h-5"
          ></img>
        </a>
      </div>
      <p className="mx-1 flex-auto	text-right">&copy; 2021 by Planxnx</p>
    </div>
  );
};

export default Footer;
