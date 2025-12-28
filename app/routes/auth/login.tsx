import { Form, redirect } from "react-router";
import type { Route } from "./+types/login";
import { createSupabaseClient } from "~/lib/supabase.server";

type ActionData = { error: string } | { success: true };

export async function action({ request }: Route.ActionArgs) {
  const { supabase, getHeaders } = createSupabaseClient(request);

  const formData = await request.formData();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString().trim();

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return { error: error?.message || "Login failed" };
  }

  // Get headers AFTER signInWithPassword so cookies are populated
  return redirect("/", { headers: getHeaders() });
}

const LoginPage = ({ actionData }: { actionData?: ActionData }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <Form className="space-y-6" method="post">
          {actionData && "error" in actionData && (
            <div className="p-3 rounded-lg bg-red-900/50 border border-red-500 text-red-300 text-sm">
              {actionData.error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="block w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              {/* <a
                href="#"
                className="text-sm text-blue-400 hover:text-blue-300 transition"
              >
                Forgot password?
              </a> */}
            </div>
            <input
              type="password"
              id="password"
              name="password"
              className="block w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="mx-auto block py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
          >
            Sign In
          </button>
        </Form>

        {/* <p className="text-center text-gray-400 mt-8">
          Don't have an account?{" "}
          { <a
            href="#"
            className="text-blue-400 font-medium hover:text-blue-300 transition"
          >
            Sign up
          </a> }
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;
