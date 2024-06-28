const nodemailer = require('nodemailer');
import prisma from "../Client/PrismaClient";
import { AddedBookReviewMailLibrary } from './MailBody'; // Adjust the import path as needed

// Create a transporter object using Gmail's SMTP settings
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vishalaggarwal270@gmail.com',
        pass: 'jxcb ovrh htoq wwma'
    }
});

export const sendMailToLibraryTeam = async (bookReviewInput:any) => {
    try {
        console.log("Mailer Called");

        const libraryTeam = await prisma.libraryTeam.findMany({
            include: {
                user: true, // assuming there's a relation to user table
            }
        });
        console.log(libraryTeam);

        for (const member of libraryTeam) {
            const email = member.user.email; // adjust based on your actual schema
            if (!email) {
                console.log(`No email found for member ID: ${member.id}`);
                continue;
            }

            const mailOptions = {
                from: 'vishalaggarwal270@gmail.com', // sender address
                to: email, // receiver's email address
                subject: 'New Book Review Added', // Subject line
                text: `A new book review has been added: ${bookReviewInput.bookName}`, // plain text body
                html: AddedBookReviewMailLibrary(bookReviewInput) // html body
            };

            // Send the email
            await transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(`Error sending email to ${email}:`, error);
                }
                console.log(`Message sent to ${email}: %s`, info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        }

    } catch (error) {
        console.error('Error in sending mail:', error);
    }
};