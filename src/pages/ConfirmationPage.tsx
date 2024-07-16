import {siteImagePrefix} from "../utils.ts";
import "./ConfirmationPage.css"

export default function ConfirmationPage() {
    return (
        <div className="confirmation-page">
            <h1>Your order was placed!</h1>
            <p>Thank you for shopping at H. L. Lyons Books & Brews</p>
            <img src={`${siteImagePrefix}/Books%20and%20Brews%20Logo.png`}
                 alt="H. L. Lyons Books & Brews Logo"
            width="500"/>
        </div>
    );
}