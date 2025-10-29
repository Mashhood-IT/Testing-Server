import ContactForm from '../models/contactFormModel.js';  // Import the Mongoose model

// Controller to handle form submission
export const submitContactForm = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Validation: Check required fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    // Save the contact form data to the database
    const newContactForm = new ContactForm({
      name,
      email,
      phone,
      subject,
      message,
    });

    // Save the data to MongoDB
    await newContactForm.save();

    // Respond with success
    res.status(200).json({ message: 'Message saved successfully! We\'ll get back to you soon.' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Failed to save message. Please try again later.' });
  }
};
