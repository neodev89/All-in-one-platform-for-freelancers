import { getTranslations } from "next-intl/server";
import HomeComponent from "./home-component";

export default async function Login({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getTranslations((await params).locale);
  return (
    <HomeComponent />
  );
}
