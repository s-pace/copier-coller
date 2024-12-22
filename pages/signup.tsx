import { useLanguage } from "@/i18n/LanguageProvider";
import Page from "@/components/Page";
import UserForm from "@/components/UserForm";

function SignUp() {
  const { locale } = useLanguage();
  const { signupTitle, signupDescription, signupKeywords } = locale;
  return (
    <Page
      title={signupTitle}
      description={signupDescription}
      keywords={signupKeywords}
    >
      <article className="first flex h-full flex-col items-center">
        <UserForm />
      </article>
    </Page>
  );
}

export default SignUp;
