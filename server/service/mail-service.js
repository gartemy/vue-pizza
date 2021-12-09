const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendLoginMail(email, secretCode) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: `${secretCode} - код для входа на сайт vue-pizza. Никому не говорите код.`
        })
    }
}

module.exports = new MailService()