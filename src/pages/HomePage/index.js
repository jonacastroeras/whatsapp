// import {Client} from "whatsapp-web.js";
import whiteLogo from '../../img/whatstimelogowhite.png'
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
// import QRCode from "react-qr-code";

function HomePage() {
    const [qrCode, setQrCode] = useState('')

    useEffect(() => {
        async function getQrCode() {
            try {
                const getQrCode = await axios.get("http://localhost:3100/qrcode/8989")
                setQrCode(getQrCode.data.qrCode)
            } catch (error) {
                console.log("Server is down")
            }

        }
        getQrCode()
    }, [])
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
                <img src={whiteLogo} alt="" />
                {/* <div style={{ background: 'white', padding: '16px' }}>
                    <QRCode value={qrCode} />
                </div> */}
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
