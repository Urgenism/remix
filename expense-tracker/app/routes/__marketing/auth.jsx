import authStyles from "~/styles/auth.css";
import AuthForm from "~/components/auth/AuthForm";

export default function AuthPage() {
  return <AuthForm />;
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}

export async function action({ request }) {
  const searchParams = new URL(request.URL).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  //validate user input

  if (authMode === "login") {
  } else {
  }
}
