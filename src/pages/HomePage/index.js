// import {Client} from "whatsapp-web.js";
import whiteLogo from '../../img/whatstimelogowhite.png'
import {Link} from "react-router-dom";
function HomePage() {
    // const chromium = require('chrome-aws-lambda')
    // const { Client } = require('whatsapp-web.js');
    // const client = new Client();
    // client.on('qr', (qr) => {
    //     console.log('QR RECEIVED', qr);
    // });
    //
    // client.on('ready', () => {
    //     console.log('Client is ready!');
    // });
    //
    // client.initialize();
    return (
        <>
            <div className="homeBody">
                <img src={whiteLogo} alt=""/>
                <div className="buttonGroup">
                    <Link to="/register">
                        Get Started
                    </Link>
                    <Link to="/register">
                        Register
                    </Link>
                </div>
            </div>
        </>
    )
}
export default HomePage;
