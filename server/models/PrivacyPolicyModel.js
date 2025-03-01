import mongoose from 'mongoose';

const PrivacyPolicySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const PrivacyPolicy = mongoose.model('PrivacyPolicy', PrivacyPolicySchema);

export default PrivacyPolicy;
