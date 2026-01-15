import React, { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastContext";
import { submitSurvey } from "../services/survey.service";
import { Send, FileText, CheckCircle } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const SurveyPage = () => {
  const { addToast } = useToast();

  const schema = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name can contain only letters"),
    gender: z.enum(["Male", "Female", "Other"], {
      errorMap: () => ({ message: "Gender is required" }),
    }),
    nationality: z.string().min(2, "Nationality must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\d{10,15}$/, "Invalid phone number"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    addressLine: z
      .string()
      .min(5, "Address Line must be at least 5 characters")
      .max(500, "Address Line cannot exceed 500 characters"),
    message: z
      .string()
      .max(500, "Message cannot exceed 500 characters")
      .min(10, "Message must be at least 10 characters")
      .optional(),
    honeypot: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
    watch,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      gender: "",
      nationality: "",
      email: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      addressLine: "",
      message: "",
      honeypot: "", // Anti-spam
    },
    resolver: zodResolver(schema),
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const maxLength = 500;
  const messageValue = watch("message", "") || "";

  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);

  useEffect(() => {
    setValue("state", "");
    setValue("city", "");
    setStateId(0);
  }, [countryId, setValue]);

  useEffect(() => {
    setValue("city", "");
  }, [stateId, setValue]);

  const onSubmit = async (formData) => {
    const { honeypot, country, state, city, addressLine, ...rest } = formData;
    // Honeypot anti-spam
    if (honeypot) return;

    try {
      const address = `${addressLine}, ${city}, ${state}, ${country}`;
      console.log("Constructed address:", address);
      const payload = {
        ...rest,
        address,
      };
      await submitSurvey(payload);
      reset();
      console.log("Submitted data:", formData);
      setIsSuccess(true);
      addToast("Survey submitted successfully!", "success");

      // Reset success message after 5 seconds to show form again if needed
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      setError("apiError", {
        type: "manual",
        message: error?.response?.data?.message || "Failed to submit survey",
      });
      addToast(
        error?.response?.data?.message || "Failed to submit survey",
        "error"
      );
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
          <p className="text-gray-500 text-lg">
            Your feedback has been successfully submitted. We appreciate your
            time.
          </p>
          <Button
            onClick={() => setIsSuccess(false)}
            variant="primary"
            className="w-full mt-4"
          >
            Submit Another Response
          </Button>
        </div>
      </div>
    );
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
            We value your feedback. Please help us improve by filling out the
            form below.
          </p>
        </div>

        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-2 sm:p-4 space-y-8"
          >
            {/* Personal Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-4 flex items-center">
                <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded mr-2">
                  1
                </span>
                Personal Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="name"
                  id="name"
                  placeholder="e.g. John Doe"
                  {...register("name")}
                  error={errors.name?.message}
                />

                <Input
                  label="Nationality"
                  name="nationality"
                  placeholder="e.g. American"
                  {...register("nationality")}
                  error={errors.nationality?.message}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                  error={errors.email?.message}
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  {...register("phone")}
                  error={errors.phone?.message}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Gender
                </label>
                <div className="flex flex-wrap gap-4">
                  {["Male", "Female", "Other"].map((gender) => (
                    <label
                      key={gender}
                      className={`
                                            flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all
                                            ${
                                              errors.gender
                                                ? "border-red-300 bg-red-50/30 hover:border-red-400"
                                                : "bg-white hover:border-gray-400 border-gray-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100"
                                            }
                                        `}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        {...register("gender")}
                      />
                      <span className="text-sm text-gray-700">{gender}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && (
                  <div className="text-xs text-red-500 font-medium mt-1">
                    {errors.gender.message}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="space-y-6 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-4 flex items-center">
                <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded mr-2">
                  2
                </span>
                Additional Feedback
              </h3>

              {/* <Input
                label="Address"
                name="address"
                placeholder="123 Main St, City, Country"
                {...register("address")}
                error={errors.address?.message}
              /> */}

              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Country
                    </label>
                    <CountrySelect
                      value={countryId}
                      onChange={(country) => {
                        setCountryId(country?.id || 0);
                        field.onChange(country?.name || "");
                      }}
                      placeHolder="Select Country"
                    />
                    {errors.country && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      State
                    </label>
                    <StateSelect
                      countryid={countryId}
                      value={stateId}
                      onChange={(state) => {
                        setStateId(state?.id || 0);
                        field.onChange(state?.name || "");
                      }}
                      placeHolder="Select State"
                    />
                    {errors.state && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      City
                    </label>
                    <CitySelect
                      countryid={countryId}
                      stateid={stateId}
                      value={field.value}
                      onChange={(city) => field.onChange(city?.name || "")}
                      placeHolder="Select City"
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Input
                label="Address Line"
                placeholder="Street, building, area"
                {...register("addressLine")}
                error={errors.addressLine?.message}
              />

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={`
                                        w-full px-4 py-3 rounded-lg border text-sm transition-all duration-200 outline-none resize-y min-h-[120px]
                                        ${
                                          errors.message
                                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/30"
                                            : "border-gray-300 hover:border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white"
                                        }
                                    `}
                  placeholder="Share your thoughts with us..."
                  {...register("message")}
                />
                {/* Live character counter */}
                <span
                  className={`text-xs mt-1 ${
                    messageValue.length > maxLength
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {messageValue.length}/{maxLength} characters
                </span>
                {errors.message && (
                  <div className="text-xs text-red-500 font-medium">
                    {errors.message?.message}
                  </div>
                )}
              </div>
            </div>

            {/* Honeypot field - hidden */}
            <input
              type="text"
              name="honeypot"
              className="hidden"
              autoComplete="off"
              {...register("honeypot")}
            />

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 text-base shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transform active:scale-[0.99] transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
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
            {errors.apiError && (
              <div className="text-center text-red-600 font-medium mt-4">
                {errors.apiError.message}
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SurveyPage;
