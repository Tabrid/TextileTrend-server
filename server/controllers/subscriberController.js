import Subscriber from "../models/Subscriber.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ error: "Email is already subscribed." });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "Subscription successful!" });
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().select("email subscribedAt");
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subscribers." });
  }
};
