import ContactForm from "@/components/ContactForm";
import Page from "@/components/Page";
import { useLanguage } from "@/i18n/LanguageProvider";

function Contact() {
  const { locale } = useLanguage();
  const { contactTitle, contactDescription, contactKeywords } = locale;
  return (
    <Page
      title={contactTitle}
      description={contactDescription}
      keywords={contactKeywords}
    >
      <ContactForm />
    </Page>
  );
}

export default Contact;
