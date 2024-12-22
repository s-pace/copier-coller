import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import Spinner from "./Spinner";

const REDIRECTING_DELAY = 2000;

const RedirectLoggedUser = () => {
  const router = useRouter();
  const { locale } = useLanguage();
  const { redirectingToAccountText } = locale;

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/account"); // Replace '/account' with the actual path to the account page
    }, REDIRECTING_DELAY); // Redirect after 2 seconds

    return () => clearTimeout(timer); // Clear the timer if the component is unmounted
  }, [router]);

  return (
    <div className="flex h-full w-full items-center py-8">
      <div className="flex items-center justify-center space-x-2">
        <Spinner />
        <p className="text-sm">{redirectingToAccountText}</p>
      </div>
    </div>
  );
};

export default RedirectLoggedUser;
