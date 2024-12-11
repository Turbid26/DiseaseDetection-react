// Import necessary dependencies
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Frequently Asked Questions data
const faqs = [
  {
    question: 'How accurate is the plant disease detection?',
    answer: 'Our AI model has been trained on thousands of plant images and typically achieves 90-95% accuracy in identifying common plant diseases. However, for critical cases, we recommend consulting with agricultural experts for confirmation.',
  },
  {
    question: 'What types of plants can be diagnosed?',
    answer: 'Currently, our system can identify diseases in common crops including tomatoes, potatoes, corn, wheat, rice, and various fruit trees. We are continuously expanding our database to include more plant species.',
  },
  {
    question: 'How should I take photos for best results?',
    answer: 'For optimal results, take clear, well-lit photos of the affected plant parts (leaves, stems, or fruits) during daylight. Ensure the diseased area is in focus and try to capture both healthy and affected parts for comparison.',
  },
  {
    question: 'Is my data kept private?',
    answer: 'Yes, we take data privacy seriously. All uploaded images and diagnosis results are stored securely and are only accessible to you and any agricultural experts you choose to share them with.',
  },
  {
    question: 'Can I get expert consultation?',
    answer: 'Yes, agricultural scientists on our platform can provide additional consultation. After receiving your AI diagnosis, you can request expert review for more detailed analysis and recommendations.',
  },
];

// FAQ Component
const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-4 py-5 sm:p-6 text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                  <p className="text-gray-500">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
