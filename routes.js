// Import frameworks
const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

// Import data
const {
  people,
  partners,
  press,
} = require('./db');

// Set the API key for sendgrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Helper function to render a not found page
const renderNotFound = (res) => {
  res.status(404).render('not-found', {
    title: 'YouthHack | Not Found',
  });
};

// Homepage
router.get('/', (req, res) => {
  const {
    APPLICATIONS_LINK,
    VENTURES_LINK
  } = process.env;

  res.render('home', {
    APPLICATIONS_LINK,
    VENTURES_LINK,
    title: 'YouthHack',
    isHomeActive: true,
    partners,
    press,
  });
});

// Internal
router.get('/internal', (req, res) => {
  res.render('internal/home', {
    title: 'YouthHack | Internal',
    description: 'Documentation to streamline, inform, and connect certain YouthHack processes'
  });
});

// About
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'YouthHack | About',
    isAboutActive: true,
    people,
  });
});

// Get involed
router.get('/get-involved', (req, res) => {
  const {
    APPLICATIONS_LINK,
    VENTURES_LINK
  } = process.env;

  res.render('get-involved', {
    title: 'YouthHack | Get Involved',
    isGetInvolvedActive: true,
    APPLICATIONS_LINK,
    VENTURES_LINK
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
router.post('/contact', (req, res) => {
  // Ensure environment variables are in place
  let error = '';

  if (!process.env.EMAILS) error = 'EMAILS not found';
  else if (!process.env.SENDGRID_API_KEY) error = 'SENDGRID_API_KEY not found';
  if (error) {
    res.send({
      success: false,
      error
    });
    return;
  }

  // Parse variables from the body
  const {
    name,
    email,
    organization,
    location,
    subject,
    message,
    _gotcha
  } = req.body;

  // Error checking on parameters
  if (!name) error = 'Name must be populated';
  else if (!email) error = 'Email must be populated';
  else if (!subject) error = 'Subject must be populated';
  else if (!message) error = 'Message must be populated';
  else if (_gotcha) error = 'Please check the form and try again';

  if (!error) {
    const fields = [name, email, organization, location, subject, message];
    error = fields.forEach(val => {
      if (val && val.length > 10000) {
        error = 'Please shorten your message load';
      }
    });
  }

  // Relay information back to the website
  if (error) {
    res.send({
      success: false, error
    });
    return;
  }

  const text = `Name: ${name}\nOrganization: ${organization}\nLocation: ${location}\n\n${message}`;
  const html = `<p><strong>Name:</strong> ${name}</p><p><strong>Organiation:</strong> ${organization}</p><p><strong>Location:</strong> ${location}</p><br><p>${message}</p>`;

  // Construct the message
  const baseMsg = {
    from: email,
    subject,
    text,
    html,
  };

  const recipients = process.env.EMAILS.split(',');
  const awaitEmails = recipients.map(recipient => {
    const msg = Object.assign(baseMsg, { to: recipient });

    return sgMail.send(msg)
      .then(() => ({ success: true }))
      .catch(sendgridError => {
        ({ success: false, error: sendgridError.message });
      });
  });

  Promise.all(awaitEmails).then(results => {
    let i;

    for (i = 0; i < results.length; i++) {
      if (!results[i].success) {
        res.send(results[i]);
        return;
      }
    }

    res.send(results[0]);
  });
});

// Handle 404 error
// NOTE this is reached if no other route above was matched
router.get('*', (req, res) => renderNotFound(res));

// Export the router
module.exports = router;
