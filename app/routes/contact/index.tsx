import type { Route } from "./+types/index";
import { Form } from "react-router";
import { createSupabaseClient } from "~/lib/supabase.server";

export async function action({ request }: Route.ActionArgs) {
  const { supabase } = createSupabaseClient(request);
  const formData = await request.formData();

  // Extract and sanitize form data
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const subject = formData.get("subject")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  // Validation
  const errors: string[] = [];

  // Validate name
  if (!name) {
    errors.push("Name is required");
  } else if (name.length < 2) {
    errors.push("Name must be at least 2 characters");
  } else if (name.length > 100) {
    errors.push("Name must be less than 100 characters");
  } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    errors.push(
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    );
  }

  // Validate email
  if (!email) {
    errors.push("Email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please enter a valid email address");
  } else if (email.length > 254) {
    errors.push("Email is too long");
  }

  // Validate subject (optional field)
  if (subject && subject.length > 200) {
    errors.push("Subject must be less than 200 characters");
  }

  // Validate message
  if (!message) {
    errors.push("Message is required");
  } else if (message.length < 10) {
    errors.push("Message must be at least 10 characters");
  } else if (message.length > 2000) {
    errors.push("Message must be less than 2000 characters");
  }

  // Return validation errors if any
  if (errors.length > 0) {
    return {
      success: false,
      errors: errors,
    };
  }

  // Insert into database
  const { data, error } = await supabase.from("contact_messages").insert([
    {
      name,
      email,
      subject: subject || null,
      message,
    },
  ]);

  if (error) {
    return {
      success: false,
      errors: ["Failed to submit form. Please try again later."],
    };
  }

  return {
    success: true,
    message: "Thank you! Your message has been sent successfully.",
  };
}

const ContactPage = ({ actionData }: Route.ComponentProps) => {
  return (
    <>
      <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900 text-center text-md">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          📬 Contact Me
        </h2>

        {/* Success message */}
        {actionData?.success && (
          <div className="mb-6 p-4 bg-green-900/50 border border-green-500 rounded-lg">
            <p className="text-green-400">{actionData.message}</p>
          </div>
        )}

        {/* Error messages */}
        {actionData?.success === false && actionData.errors && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-left">
            <p className="text-red-400 font-semibold mb-2">
              Please fix the following errors:
            </p>
            <ul className="list-disc list-inside space-y-1">
              {actionData.errors.map((error: string, index: number) => (
                <li key={index} className="text-red-300">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-md font-medium text-gray-300"
            >
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              minLength={2}
              maxLength={100}
              placeholder="John Doe"
              className="w-full mt-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-300"
            >
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              maxLength={254}
              placeholder="john@example.com"
              className="w-full mt-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-md font-medium text-gray-300"
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              maxLength={200}
              placeholder="What would you like to discuss?"
              className="w-full mt-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-md font-medium text-gray-300"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              maxLength={2000}
              rows={6}
              placeholder="Your message here..."
              className="w-full mt-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition cursor-pointer"
          >
            Send Message
          </button>
        </Form>
      </div>
    </>
  );
};

export default ContactPage;
