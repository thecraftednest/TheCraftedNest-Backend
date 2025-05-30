const Testimonial = require('../models/testimonialModel');

exports.createTestimonial = async (req, res) => {
  try {
    const { name, text } = req.body;
    const testimonial = new Testimonial({ name, text });
    await testimonial.save();
    res.status(201).json({ success: true, message: 'Testimonial added successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
