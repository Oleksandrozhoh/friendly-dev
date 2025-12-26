import type { Route } from "./+types/index";
import { Form } from "react-router";
import { supabase } from "~/lib/supabase.server";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  const { data, error } = await supabase.from("contact_messages").insert([
    {
      name,
      email,
      subject,
      message,
    },
  ]);

  if (error) {
    console.log("Supabase error:", error);
    return { message: error.message };
  }

  return {
    message: "Form submitted successfully",
    data: data,
  };
}

const ContactPage = ({ actionData }: Route.ComponentProps) => {
  return (
    <>
      <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900 text-center text-md">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          📬 Contact Me
        </h2>
        {actionData ? (
          <p className="mb-6 text-green-400"> {actionData.message} </p>
        ) : null}
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-md font-medium text-gray-300"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className="w-full mt-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-300"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
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
              className="w-full mt-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-md font-medium text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
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
