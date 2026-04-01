import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";

const LazyHomeComponent = dynamic(() => import("./home-component"), {
  ssr: true,
});

export default async function Login({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getTranslations((await params).locale);
  return (
    <LazyHomeComponent />
  );
}
