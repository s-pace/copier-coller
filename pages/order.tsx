import OrderForm from "@/components/OrderForm";
import Page from "@/components/Page";
import { useLanguage } from "@/i18n/LanguageProvider";

function Order() {
  const { locale } = useLanguage();
  const { orderTitle, orderDescription, orderKeywords } = locale;

  return (
    <Page
      title={orderTitle}
      description={orderDescription}
      keywords={orderKeywords}
    >
      <OrderForm />
    </Page>
  );
}

export default Order;
