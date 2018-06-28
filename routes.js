// Import frameworks
const express = require('express');
const router = express.Router();
// const sgMail = require('@sendgrid/mail');

// Set the API key for sendgrid
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Helper function to render a not found page
const renderNotFound = (res) => {
  res.status(404).render('not-found', {
    title: 'YouthHack | Not Found',
  });
};

// Homepage
router.get('/', (req, res) => {
  res.render('home', {
    title: 'YouthHack',
    isHomeActive: true,
  });
});

// About
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'YouthHack | About',
    isAboutActive: true,
  });
});

// Get involed
router.get('/get-involved', (req, res) => {
  res.render('get-involved', {
    title: 'YouthHack | Get Involved',
    isGetInvolvedActive: true,
  });
});

// Startup school
router.get('/startup-school', (req, res) => {
  res.render('startup-school', {
    title: 'YouthHack | Startup School',
    isStartupSchoolActive: true,
  });
});

// Ventures
router.get('/ventures', (req, res) => {
  res.render('ventures', {
    title: 'YouthHack | Ventures',
    isVenturesActive: true,
  });
});

// Handle sending an email through the contact form
// router.post('/contact', (req, res) => {
//   // Ensure environment variables are in place
//   let error = '';
//   if (!process.env.EMAIL) error = 'EMAIL not found';
//   else if (!process.env.SENDGRID_API_KEY) error = 'SENDGRID_API_KEY not found';
//   if (error) {
//     res.send({success: false, error});
//     return;
//   }
//
//   // Parse variables from the body
//   const {
//     firstName,
//     lastName,
//     email,
//     subject,
//     body,
//   } = req.body;
//
//   // Error checking on parameters
//   if (!firstName) error = 'First name must be populated';
//   else if (!lastName) error = 'Last name must be populated';
//   else if (!email) error = 'Email must be populated';
//   else if (!body) error = 'Body must be populated';
//   else if (!subject) error = 'Subject must be populated';
//   else if (firstName.length > 100) error = 'First name limited to 100 characters';
//   else if (lastName.length > 100) error = 'Last name limited to 100 characters';
//   else if (email.length > 150) error = 'Email limited to 150 characters';
//   else if (subject.length > 200) error = 'Subject limited to 200 characters';
//   else if (body.length > 10000) error = 'Body limited to 10,000 characters';
//
//   // Relay information back to the website
//   if (error) {
//     res.send({success: false, error});
//     return;
//   }
//
//   // Construct the message
//   const msg = {
//     to: process.env.EMAIL,
//     from: email,
//     subject,
//     text: body,
//     html: body,
//   };
//
//   // Send the message
//   sgMail.send(msg)
//     .then(() => res.send({success: true}))
//     .catch(sendgridError => {
//       res.send({success: false, error: sendgridError.message});
//     });
// });

// Handle 404 error
// NOTE this is reached if no other route above was matched
router.get('*', (req, res) => renderNotFound(res));

// Export the router
module.exports = router;
