import { z } from "zod";

// List of common disposable email domains
const DISPOSABLE_EMAIL_DOMAINS = [
  "tempmail.com",
  "throwaway.email",
  "guerrillamail.com",
  "mailinator.com",
  "10minutemail.com",
  "trashmail.com",
  "yopmail.com",
  "getnada.com",
  "maildrop.cc",
  "temp-mail.org",
  "fakeinbox.com",
  "sharklasers.com",
  "guerrillamailblock.com",
];

// Common profanity list (add more as needed)
const PROFANITY_LIST = [
  "spam",
  "fuck",
  "shit",
  "damn",
  "bitch",
  "asshole",
  // Add more profanity words
];

// Helper function to check for disposable email
const isDisposableEmail = (email) => {
  const domain = email.toLowerCase().split("@")[1];
  return DISPOSABLE_EMAIL_DOMAINS.some((disposable) =>
    domain?.includes(disposable)
  );
};

// Helper function to check for profanity
const containsProfanity = (text) => {
  const lowerText = text.toLowerCase();
  return PROFANITY_LIST.some((word) => lowerText.includes(word));
};

// Helper function to validate phone with country code
const validateInternationalPhone = (phone) => {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");
  
  // Check if starts with + and has 10-15 digits total
  if (cleaned.startsWith("+")) {
    return /^\+\d{10,15}$/.test(cleaned);
  }
  
  // Allow local format (10-15 digits)
  return /^\d{10,15}$/.test(cleaned);
};

// Helper function to check for suspicious patterns
const hasSuspiciousPattern = (text) => {
  // Check for excessive repeated characters (e.g., "aaaaaaa")
  if (/(.)\1{5,}/.test(text)) return true;
  
  // Check for too many numbers in name (e.g., "John123456")
  if (/\d{4,}/.test(text)) return true;
  
  // Check for excessive special characters
  if (/[!@#$%^&*()]{3,}/.test(text)) return true;
  
  return false;
};

// Helper function to validate realistic name
const isRealisticName = (name) => {
  // Check for common test/fake names
  const fakeName = /^(test|admin|user|guest|sample|demo|null|undefined|asdf)/i;
  if (fakeName.test(name)) return false;
  
  // Check for suspicious patterns
  if (hasSuspiciousPattern(name)) return false;
  
  // Name should have at least first and last name (2 words minimum)
  const words = name.trim().split(/\s+/);
  if (words.length < 2) return false;
  
  // Each word should be at least 2 characters
  if (words.some((word) => word.length < 2)) return false;
  
  return true;
};

// Advanced validation schema
const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes")
    .transform((val) => val.trim().replace(/\s+/g, " ")) // Normalize whitespace
    .refine((val) => isRealisticName(val), {
      message: "Please enter a valid full name (first and last name)",
    })
    .refine((val) => !containsProfanity(val), {
      message: "Name contains inappropriate language",
    }),

  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),

  nationality: z
    .string()
    .min(2, "Nationality must be at least 2 characters")
    .max(50, "Nationality cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s-]+$/, "Nationality can only contain letters")
    .transform((val) => val.trim())
    .refine((val) => !containsProfanity(val), {
      message: "Nationality contains inappropriate language",
    }),

  email: z
    .string()
    .email("Invalid email address")
    .transform((val) => val.toLowerCase().trim()) // Normalize email
    .refine((val) => val.length <= 254, {
      message: "Email address is too long",
    })
    .refine((val) => !isDisposableEmail(val), {
      message: "Disposable email addresses are not allowed",
    })
    .refine((val) => {
      // Check for valid TLD (at least 2 characters)
      const tld = val.split(".").pop();
      return tld && tld.length >= 2;
    }, {
      message: "Invalid email domain",
    })
    .refine((val) => {
      // Check for multiple @ symbols
      return (val.match(/@/g) || []).length === 1;
    }, {
      message: "Invalid email format",
    }),

  phone: z
    .string()
    .transform((val) => val.replace(/[\s()-]/g, "")) // Remove formatting
    .refine((val) => validateInternationalPhone(val), {
      message: "Invalid phone number. Use format: +1234567890 or 1234567890",
    })
    .refine((val) => {
      // Check for repeated digits (e.g., 1111111111)
      const cleaned = val.replace(/\D/g, "");
      return !/^(\d)\1+$/.test(cleaned);
    }, {
      message: "Phone number appears to be invalid",
    }),

  country: z
    .string()
    .min(1, "Country is required")
    .transform((val) => val.trim()),

  state: z
    .string()
    .min(1, "State is required")
    .transform((val) => val.trim()),

  city: z
    .string()
    .min(1, "City is required")
    .transform((val) => val.trim()),

  addressLine: z
    .string()
    .min(5, "Address Line must be at least 5 characters")
    .max(500, "Address Line cannot exceed 500 characters")
    .transform((val) => val.trim().replace(/\s+/g, " ")) // Normalize whitespace
    .refine((val) => !containsProfanity(val), {
      message: "Address contains inappropriate language",
    })
    .refine((val) => {
      // Should contain at least one number (street number)
      return /\d/.test(val);
    }, {
      message: "Address should include a street number",
    }),

  message: z
    .string()
    .max(500, "Message cannot exceed 500 characters")
    .min(10, "Message must be at least 10 characters")
    .transform((val) => val.trim())
    .refine((val) => {
      // Check word count (should have at least 3 words)
      const words = val.split(/\s+/).filter((word) => word.length > 0);
      return words.length >= 3;
    }, {
      message: "Message should contain at least 3 words",
    })
    .refine((val) => !containsProfanity(val), {
      message: "Message contains inappropriate language",
    })
    .refine((val) => !hasSuspiciousPattern(val), {
      message: "Message contains suspicious content",
    })
    .refine((val) => {
      // Check for excessive caps (more than 60% uppercase)
      const caps = (val.match(/[A-Z]/g) || []).length;
      const letters = (val.match(/[a-zA-Z]/g) || []).length;
      return letters === 0 || caps / letters <= 0.6;
    }, {
      message: "Please avoid excessive use of capital letters",
    })
    .optional(),

  honeypot: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 0, {
      message: "Spam detected",
    }),
});

export { schema };