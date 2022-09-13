// import {Client} from "whatsapp-web.js";
import whiteLogo from '../../img/whatstimelogowhite.png'
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
    return(
        <>
            <div className="homeBody">
                <h2>Tudo Otimooooo</h2>
                <img src={whiteLogo} alt=""/>
            </div>
        </>
    )

}
export default HomePage;