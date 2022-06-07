// Importa o módulo express para esse arquivo
const express = require("express");
// Importação do módulo nodemailer
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer/lib/smtp-transport");


require("dotenv").config();

// Instancia uma referência do express no projeto
const app = express();
const port = process.env.PORT || 3000; // Const para armanezar a porta do servidor
app.set("view engine", "ejs");
const path = require("path");
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/assets")));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/send", async (req,res) => {
    const transporter = nodemailer.createTransport( new smtpTransport({
        
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            // service:"yahoo",
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
            
            // debug: true,
            logger:true,
            // secureConnection: false,
            tls:{
                rejectUnAuthorized:false,
                ignoreTLS: true,
                secure: false,
            },
            pool:true, 
          
    }));

    const user = {
        email:"guilhermemktfran@gmail.com",
        assunto:"é um teste",
        mensagem:"Olaaa",
        nome:"Guilherme Mattoso"
    }

    await transporter
     .sendMail({
        from: `${user.nome} <${user.email}> `,
        to: user.nome,
        subject: user.assunto,
        text: `
        Cliente: ${user.nome}
        Contato: ${user.email}
        Mensagem: ${user.mensagem}
        `,
      })
      .then((r) => {
          console.log(r);
          res.redirect('/');
      })
      .catch((e) => {
          console.log(e);
          res.redirect('/');
      })
 
})

app.listen(port, () =>
  console.log(`Servidor rodando em http://127.0.0.1:${port}`)
);
