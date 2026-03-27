import { getTranslations } from "next-intl/server";
import LoginComponent from "./login";

export default async function Login({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getTranslations((await params).locale);
  return (
    <LoginComponent />
  );
}
