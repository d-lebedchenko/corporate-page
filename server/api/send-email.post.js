import nodemailer from 'nodemailer';
import formidable from 'formidable'; 
import fs from 'fs';

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// Testing data
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'medushevskuy.d@gmail.com',
    pass: 'zejx dsbq vrdx fcok',
  },
});

const parseMultipartFormData = (event) => {
  return new Promise((resolve, reject) => {
    const form = formidable({ 
        multiple: false,
        maxFileSize: 10 * 1024 * 1024,
        allowEmptyFiles: true,       
        minFileSize: 0,               
    });

    form.parse(event.req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      resolve({ fields, files });
    });
  });
};


export default defineEventHandler(async (event) => {
  let fileToCleanup = null;

  try {
    const { fields, files } = await parseMultipartFormData(event);
    
    const uploadedFile = files.file ? files.file[0] : null;

    const isFileValid = uploadedFile && uploadedFile.size > 0;
    
    if (uploadedFile) {
        fileToCleanup = uploadedFile.filepath;
    }

    const name = fields.name ? fields.name[0] : 'N/A';
    const email = fields.email ? fields.email[0] : 'N/A';

    let attachments = [];
    if (isFileValid) {
      attachments.push({
        filename: uploadedFile.originalFilename,
        path: uploadedFile.filepath,
        contentType: uploadedFile.mimetype,
      });
    }

    const info = await transporter.sendMail({
      // from: process.env.EMAIL_FROM,
      // to: process.env.EMAIL_TO,
      // testing data
      from: 'medushevskuy.d@gmail.com',
      to: email,
      subject: `Нова форма від: ${name}`,
      html: `
        <h2>Новий запит із форми</h2>
        <p>Ім'я: ${name}</p>
        <p>Email: ${email}</p>
        ${isFileValid ? `<p>Файл додано: ${uploadedFile.originalFilename}</p>` : `<p>Файл не додано.</p>`}
      `,
      attachments: attachments,
    });
    
    if (fileToCleanup && fs.existsSync(fileToCleanup)) {
        fs.unlinkSync(fileToCleanup); 
    }

    return { message: 'Mail sent successfully!', messageId: info.messageId };

  } catch (error) {
    if (fileToCleanup && fs.existsSync(fileToCleanup)) {
        fs.unlinkSync(fileToCleanup);
    }
    
    console.error('Error sending mail:', error);
    event.res.statusCode = 500;
    return { error: 'Server error. Failed to send mail.' };
  }
});
