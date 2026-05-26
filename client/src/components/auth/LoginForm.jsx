// LoginForm.jsx
//a clean and user-friendly login form components with proper validation.
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import InputField from "../ui/InputField";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    // make api call to login endpoint
    // try-catch block to handle sucess and error responses

    try {
      const response = await API.post("/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      const { token, user } = response.data.data;

      login(user, token);

      toast.success(`Welcome back, ${user.name}!`);

      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login failed. Try again.";

      toast.error(message);

      setErrors({
        email: "",
        password: "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = () => {
    setFormData({
      email: "devendra@test.com",
      password: "test1234",
    });

    setErrors({});
  };

  //rendder the form with input fields, submit button, and links to signup page.
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

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
        placeholder="Enter your password"
        error={errors.password}
        required
        autoComplete="current-password"
      />

      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        size="lg"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      <button
        type="button"
        onClick={fillDemo}
        className="text-sm text-center text-gray-400 hover:text-primary-400 transition-colors underline underline-offset-2"
      >
        Use demo credentials
      </button>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-primary-500 hover:text-primary-400 font-medium transition-colors"
        >
          Sign up free
        </Link>
      </p>

    </form>
  );
};

export default LoginForm;

