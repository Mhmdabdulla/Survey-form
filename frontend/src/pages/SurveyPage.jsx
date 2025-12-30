import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { submitSurvey } from '../services/survey.service';

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
    } catch (error) {
      addToast(
        error?.response?.data?.message || 'Failed to submit survey',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
        <div className="flex justify-center">
            <div className="w-full" style={{ maxWidth: '600px' }}>
                <h1 className="text-center font-bold" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                    User Survey
                </h1>
                <p className="text-center" style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                    We value your feedback. Please fill out the form below.
                </p>

                <Card>
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Full Name"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                            placeholder="John Doe"
                        />

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: '0.5rem', display: 'block' }}>
                                Gender
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={formData.gender === 'Male'}
                                        onChange={handleChange}
                                    /> Male
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={formData.gender === 'Female'}
                                        onChange={handleChange}
                                    /> Female
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Other"
                                        checked={formData.gender === 'Other'}
                                        onChange={handleChange}
                                    /> Other
                                </label>
                            </div>
                            {errors.gender && <div style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.gender}</div>}
                        </div>

                        <Input
                            label="Nationality"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                            placeholder="e.g. American"
                        />

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

                        <Input
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="123 Main St, City, Country"
                        />

                        <div style={{ marginBottom: '1rem' }}>
                            <label htmlFor="message" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: '0.5rem', display: 'block' }}>
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border)',
                                    outline: 'none',
                                    fontFamily: 'inherit',
                                    resize: 'vertical'
                                }}
                                placeholder="Your feedback here..."
                            />
                        </div>

                        {/* Honeypot field - hidden */}
                        <input
                            type="text"
                            name="honeypot"
                            value={formData.honeypot}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                            autoComplete="off"
                        />

                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? 'Submitting...' : 'Submit Survey'}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default SurveyPage;
