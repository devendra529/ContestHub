// SignupForm.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import InputField from "../ui/InputField";

// signup form components with proper validation and error handling.
const SignupForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirm) {
      newErrors.confirm = "Please confirm your password";
    } else if (formData.password !== formData.confirm) {
      newErrors.confirm = "Passwords do not match";
    }

    return newErrors;
  };

  // handle form submission with validation, api call to signup end point.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    //try-catch block to handle success and error responses from the api call to signup endpoint.
    try {
      const response = await API.post("/auth/signup", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      const { token, user } = response.data.data;

      login(user, token);

      toast.success(`Welcome to ContestHub, ${user.name}! 🎉`);

      navigate("/dashboard");

    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Signup failed. Try again.";

      toast.error(message);

      if (message.toLowerCase().includes("email")) {
        setErrors((prev) => ({
          ...prev,
          email: message,
        }));
      }

    } finally {
      setIsLoading(false);
    }
  };

  // handle input cahnges and clear errors for the specific field  when user starts typing again.
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      <InputField
        label="Full Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Devendra Singh"
        error={errors.name}
        required
      />

      <InputField
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
        error={errors.email}
        required
        autoComplete="email"
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Minimum 6 characters"
        error={errors.password}
        required
        autoComplete="new-password"
      />

      <InputField
        label="Confirm Password"
        name="confirm"
        type="password"
        value={formData.confirm}
        onChange={handleChange}
        placeholder="Re-enter your password"
        error={errors.confirm}
        required
        autoComplete="new-password"
      />

      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        size="lg"
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary-500 hover:text-primary-400 font-medium transition-colors"
        >
          Sign in
        </Link>
      </p>

    </form>
  );
};

export default SignupForm;

