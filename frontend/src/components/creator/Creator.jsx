import React, { useState } from 'react';
import Navbar from '../components_lite/Navbar';

const Creator = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [userExperienceRating, setUserExperienceRating] = useState(0);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackData = {
      name,
      email,
      message,
      userExperienceRating,
    };

    try {
      const response = await fetch('http://localhost:5011/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        setSubmitStatus('Feedback submitted successfully.');
        setName('');
        setEmail('');
        setMessage('');
        setUserExperienceRating(0);
      } else {
        setSubmitStatus('Failed to submit feedback.');
      }
    } catch (error) {
      setSubmitStatus('Error submitting feedback.');
    }
  };

  const renderStars = (rating, setRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => setRating(i)}
          style={{ cursor: 'pointer', color: i <= rating ? '#2563eb' : '#d1d5db', fontSize: '2.5rem', marginRight: '0.5rem' }}
          aria-label={`${i} star`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') setRating(i); }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">User Feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows={5}
            />
          </div>
          <div className="flex items-center space-x-4 justify-start">
            <label className="block text-sm font-medium text-gray-700 mb-0">
              User Experience Rating:
            </label>
            <div>{renderStars(userExperienceRating, setUserExperienceRating)}</div>
          </div>
          {submitStatus && (
            <div className="text-center text-sm font-medium text-gray-700">
              {submitStatus}
            </div>
          )}
          <div className="text-center">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-6 py-2 text-white font-semibold hover:bg-blue-700"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Creator;
