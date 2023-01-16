import LogoOddJobs from "../../images/LogoOddJobs.png";
import './navbar.scss';

export function NavBar(props) {
  return (
    <nav>
      <div className="logo_container">
        <img src={LogoOddJobs} alt="Logo-OddJobs" />
        <p>OddJobs</p>
      </div>
      <div className="right_side_container">
        {props.children}
      </div>
    </nav>
  );
}
