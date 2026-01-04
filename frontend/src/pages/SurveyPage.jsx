import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { submitSurvey } from '../services/survey.service';
import { Send, FileText, CheckCircle } from 'lucide-react';

const SurveyPage = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    nationality: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    honeypot: '' // Anti-spam
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name can contain only letters";
    }

    const email = formData.email.toLowerCase();

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }

    if (formData.message && formData.message.length > 500) {
      newErrors.message = "Message cannot exceed 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot anti-spam
    if (formData.honeypot) return;

    if (!validate()) {
      addToast('Please fix the errors in the form', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const { honeypot, ...payload } = formData;

      await submitSurvey(payload);
      setIsSuccess(true);
      addToast('Survey submitted successfully!', 'success');

      setFormData({
        name: '',
        gender: '',
        nationality: '',
        email: '',
        phone: '',
        address: '',
        message: '',
        honeypot: ''
      });
      // Reset success message after 5 seconds to show form again if needed
      setTimeout(() => setIsSuccess(false), 5000);

    } catch (error) {
      addToast(
        error?.response?.data?.message || 'Failed to submit survey',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6 animate-fade-in-up">
          <div className="mx-auto h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Thank You!</h2>
          <p className="text-gray-500 text-lg">Your feedback has been successfully submitted. We appreciate your time.</p>
          <Button onClick={() => setIsSuccess(false)} variant="primary" className="w-full mt-4">
            Submit Another Response
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-xl mb-4 group hover:bg-indigo-100 transition-colors">
            <FileText className="h-8 w-8 text-indigo-600 group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-3">
            User Survey
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We value your feedback. Please help us improve by filling out the form below.
          </p>
        </div>

        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <form onSubmit={handleSubmit} className="p-2 sm:p-4 space-y-8">

            {/* Personal Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-4 flex items-center">
                <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded mr-2">1</span>
                Personal Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="e.g. John Doe"
                />

                <Input
                  label="Nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  placeholder="e.g. American"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="john@example.com"
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Gender</label>
                <div className="flex flex-wrap gap-4">
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <label key={gender} className={`
                                            flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all
                                            ${formData.gender === gender
                        ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-100'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                                        `}>
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className={`text-sm ${formData.gender === gender ? 'font-medium text-indigo-900' : 'text-gray-700'}`}>
                        {gender}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.gender && <div className="text-xs text-red-500 font-medium mt-1">{errors.gender}</div>}
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="space-y-6 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-4 flex items-center">
                <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded mr-2">2</span>
                Additional Feedback
              </h3>

              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, City, Country"
              />

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium text-gray-700 block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`
                                        w-full px-4 py-3 rounded-lg border text-sm transition-all duration-200 outline-none resize-y min-h-[120px]
                                        ${errors.message
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/30'
                      : 'border-gray-300 hover:border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white'
                    }
                                    `}
                  placeholder="Share your thoughts with us..."
                />
                {errors.message && <div className="text-xs text-red-500 font-medium">{errors.message}</div>}
              </div>
            </div>

            {/* Honeypot field - hidden */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              className="hidden"
              autoComplete="off"
            />

            <div className="pt-4">
              <Button type="submit" disabled={isSubmitting} className="w-full py-3.5 text-base shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transform active:scale-[0.99] transition-all">
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Submit Survey <Send className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SurveyPage;
