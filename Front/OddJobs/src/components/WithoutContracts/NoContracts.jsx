import { TbWallpaperOff } from "react-icons/tb";
import "./nocontracts.scss";

export function NoContracts({ title }) {
  return (
    <div className="no_contracts_style">
      <h2>{title}</h2>
      <TbWallpaperOff  size={"70px"} />
    </div>
  );
}
