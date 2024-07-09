import CategoryNavLinks from "./CategoryNavLinks.tsx";
import "./HeaderDropdown.css";

export default function HeaderDropdown() {
    return (
        <div className="header-dropdown">
            <button className="button"><i className="fa-solid fa-bars"></i> MENU</button>
            <CategoryNavLinks />
        </div>
    );
}
