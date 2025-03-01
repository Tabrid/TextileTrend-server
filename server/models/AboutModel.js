import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const About = mongoose.model('About', AboutSchema);

export default About;
