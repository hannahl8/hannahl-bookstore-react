import HomeCategoryList from "../components/HomeCategoryList";
import "./WelcomePage.css";
import {Link} from "react-router-dom";
import {siteImagePrefix} from "../utils.ts";

export default function WelcomePage() {
    return (
        <div className="home-page">
            <section className="welcome-text container">
                <div className="welcome-store">
                    <p>Step into a haven where stories come to life and every cup tells a tale. At H. L. Lyons Books &
                        Brews, we believe in the magic of books and the comfort of a good brew. </p>
                    <br/>
                    <p>Enjoy our freshly brewed coffee and tea from 06:00 to 12:00, and come back in the evening to
                        savor
                        our selection of beer and wine from 18:00 to 00:00.</p>
                </div>
                <div className="big-logo-and-button">
                    <img src={`${siteImagePrefix}/Books%20and%20Brews%20Logo.png`}
                         alt="H. L. Lyons Books & Brews Logo"/>
                    <button className="call-to-action-button">
                        <Link to={"/category/Wine"}>START EXPLORING!</Link>
                    </button>

                </div>
                <div className="welcome-website">
                    <p>Can't make it to our cozy corner in person? Fear not, because the literary haven of H. L. Lyons
                        Books
                        & Brews is now just a click away. </p>
                    <br/>
                    <p>To enhance your reading experience, we take a special quote from each book and recommend the
                        perfect
                        drink to accompany it, be it coffee, tea, beer, or wine. </p>

                </div>
            </section>
            <section className="category-images container">
                <HomeCategoryList />
            </section>
        </div>
    );
}
