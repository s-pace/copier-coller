import GlowingIcon from "./GlowingIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col items-center md:flex-row md:items-start">
          <div className="flex w-full justify-center md:w-1/6 md:justify-start">
            <span className="text-center text-xs md:text-left"></span>
          </div>
          <div className="mt-4 flex w-full items-center justify-center md:mt-0 md:w-5/6">
            <div className="social-icons flex space-x-4">
              <a
                href="https://www.facebook.com/share/ne69CfNtxrsCLVfQ/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link transition-transform duration-300 hover:scale-[200%] hover:text-blue-500"
              >
                <FontAwesomeIcon
                  className="text-white hover:text-blue-500"
                  icon={faFacebook}
                  size="1x"
                />
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link transition-transform duration-300 hover:scale-[200%]"
              >
                <FontAwesomeIcon
                  className="text-white hover:text-pink-500"
                  icon={faTiktok}
                  size="1x"
                />
              </a>
              <a
                href="https://www.instagram.com/couper.col_ler"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link transition-transform duration-300 hover:scale-[200%]"
              >
                <FontAwesomeIcon
                  className="text-white hover:text-purple-500"
                  icon={faInstagram}
                  size="1x"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center md:flex-row md:items-start">
          <div className="flex w-full justify-center md:w-1/6 md:justify-start">
            <span className="text-xxs text-center md:text-left"></span>
          </div>

          <div className="mt-4 flex w-full items-center justify-center md:mt-0 md:w-5/6">
            <span className="copyright-text text-center text-xs md:text-left">
              Copyright &copy; 2024 All Rights Reserved by Coupier-Coller. Made
              in
              <GlowingIcon>🇫🇷</GlowingIcon>
              with
              <GlowingIcon />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
