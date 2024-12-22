import Title from "@/components/Title";
import { useLanguage } from "@/i18n/LanguageProvider";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  const { locale } = useLanguage();
  const { notfoundTitle, notfoundDescription } = locale;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Title>{notfoundTitle}</Title>
      <Link href="/" passHref>
        <Image
          src="/404.png"
          alt="Not Found"
          width={400}
          height={400}
          className="m-auto mb-4 cursor-pointer"
        />
      </Link>
      <p className="pb-8 text-center">{notfoundDescription}</p>
    </div>
  );
}
