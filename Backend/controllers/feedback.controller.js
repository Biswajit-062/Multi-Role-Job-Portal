import { sendEmail } from "../utils/email.js";

export const submitFeedback = async (req, res) => {
  try {
    const { name, email, message, userExperienceRating } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const subject = "New User Feedback Submission";
    const text = `
      You have received new feedback from a user:

      Name: ${name}
      Email: ${email}
      Message: ${message}
      User Experience Rating: ${userExperienceRating || "Not provided"}
    `;

    await sendEmail(
      "biswajitmoharana062@gmail.com",
      subject,
      text,
      `<p>You have received new feedback from a user:</p>
       <p><strong>Name:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Message:</strong> ${message}</p>
       <p><strong>User Experience Rating:</strong> ${userExperienceRating || "Not provided"}</p>`
    );

    return res.status(200).json({ message: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Error in submitFeedback:", error);
    return res.status(500).json({ error: "Failed to submit feedback." });
  }
};
