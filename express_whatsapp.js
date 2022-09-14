const fs = require('fs');


const fetch = require('node-fetch');
const mimeDb = require('mime-db')
const express = require('express');


const cors = require('cors');
const chalk = require('chalk');

const qrcode = require('qrcode-terminal');
const puppeteer = require('puppeteer');
const clients = []
const { Client, LocalAuth } = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');
const app = express();
app.use(express.urlencoded({ extended: true }))
const sesion_guardada = './session.json';
let client;
let sessionData;
app.use(cors());
app.use(express.json())
let sessionId = 0;

const sendMessage = (to, message) => {
    client.sendMessage(to, message);
};


/**
 * Escuchamos cuando entre un mensaje nuevo
 */
const listenMessage = () => {

    client.on('message', msg => {
        const { from, to, body } = msg;
        /*      console.log("num destinatario: " + from);
               console.log("num remitente: " + to);
               console.log('body '+body);*/

    });
    const to = "5511999828483@c.us"
    const message = "Ironhack Message"
    try {
        client.sendMessage(to, message);
    } catch (error) {
        console.log(error)
    }
    console.log("Message Sent")
};


/**
 * Revisamos si tenemos credenciales guardadas para inciar sessio
 * este paso evita volver a escanear el QRCODE
 */
const ExisteSession = () => {

    // Si exsite cargamos el archivo con las credenciales

    sessionData = require(sesion_guardada);


    client = new Client({

        session: sessionData, puppeteer: {
            args: ['--no-sandbox',]
        }
    });

    client.on('ready', () => {
        console.log('Estamos listos!');


        // sendMessage();
        // sendMedia();


        connectionReady();

    });


    client.on('auth_failure', () => {

        console.log('* Error de autentificacion vuelve a generar el QRCODE (Borrar el archivo session.json) *');
    });


    client.initialize();
}

/**
 * Generamos un QRCODE para iniciar sesion
 */
const primeraSession = () => {

    const browser = puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']

    })
    client = new Client({
        puppeteer: {
            args: ['--no-sandbox',]
        }

    });


    console.log('No tenemos session guardada');
    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log('Client is ready!');
        connectionReady();
    });

    client.on('auth_failure', () => {
        console.log('* Error de autentificacion vuelve a generar el QRCODE *');
    })


    client.on('authenticated', (session) => {
        // Guardamos credenciales de de session para usar luego
        console.log("authenticating", session)
        console.log("typeof", typeof (session))
        const to = "@c.us593984946257"
        const message = "Ironhack Message"
        client.sendMessage(to, message);
        // fs.writeFile(sesion_guardada, JSON.stringify(session), function (err) {
        //     if (err) {
        //         console.log(err);
        //     }
        // });
    });


    client.initialize();
}

const connectionReady = () => {

    listenMessage();

}

// aqui te recomiendo usa fetch, yo lo use y sirve full tiene full métodos interesantes
const getQrCode = async (req, response) => {
    const id = req.params.id;

    client = new Client({
        authStrategy: new LocalAuth({ clientId: id })
    });

    const searchClient = clients.filter(element => {
        if (element.key) {
            if (element.key === id) {
                return element;
            }
        }
    })
    if (searchClient.length === 0) {
        clients.push({ client: client, key: id })
    } else {
        client = searchClient.client
    }
    client.initialize();


    // client.on('qr', qr => {
    //     console.log(qr)
    //     // qrcode.generate(qr, {small: true});
    // });
    client.on('ready', () => {
        console.log('Client is ready!');
        connectionReady();
    });
    client.on('auth_failure', () => {
        console.log('* Error de autentificacion vuelve a generar el QRCODE *');
    })

    if (sessionId !== id) {
        try {
            const qrCode = await new Promise((resolve, reject) => {
                try {
                    client.once('qr', qr => {
                        console.log("Enter to promises")
                        resolve(qr)
                    });
                    setTimeout(() => {
                        reject(new Error("QR event wasn't emitted in 15 seconds."))
                    }, 15000)
                } catch (error) {
                    console.log(error.message)
                }
            });
            const object = { qrCode: qrCode }
            response.send(object)
        } catch (error) {
            console.log(error)
        }

    };
}

app.get('/qrcode/:id', getQrCode)


//seria lo mismo para el get
const apiwhatsapp = (req, res) => {
    const id = req.params.id;
    // const { message, number, attachment } = req.body;
    const { message, number } = req.body;
    const crear_num = number.substring(1) + "@c.us";
    // isf(attachment)
    // {
    //     const media = MessageMedia.fromFilePath(attachment);
    //     sendMessage(crear_num, media);
    // }
    // console.log(crear_num,message);
    const searchClient = clients.filter(element => {
        if (element.key) {
            if (element.key === id) {
                return element;
            }
        }
    })

    // aqui es todo aqui puedes separar en métodos y simplemente llamar al que necesites para enviar lo recibido por el post
    searchClient[0].client.sendMessage(crear_num, message);// aqui usas la función sendMessage de por arriba y asi no te haces lio
    res.send({ status: 'enviado con exito' });

}

app.post('/qrcode/:id', apiwhatsapp);

// (fs.existsSync(sesion_guardada)) ? ExisteSession() : primeraSession();
app.listen(3100, () => {
    const browser = puppeteer.launch({
        headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']

    })
    console.log('Server post listo!');
})