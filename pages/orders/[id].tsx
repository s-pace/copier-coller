import { useRouter } from "next/router";
import OrderItemByItem from "@/components/OrderItemByItem";
import { algoliasearch } from "algoliasearch";
import { useEffect, useState } from "react";
import { Order } from "@/generated/types";
import { useLanguage } from "@/i18n/LanguageProvider";
import Page from "@/components/Page";

// Initialiser le client Algolia
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
);
const OrderDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [orderData, setOrderData] = useState<Order | null>(null);

  const { locale } = useLanguage();
  const {
    browseOrders,
    searchDescription,
    searchKeywords,
    loadingText,
    errorText,
    orderNotFoundText,
  } = locale;

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null); // Reset error state
        const response = await searchClient.getObject({
          indexName: "prod.art",
          objectID: id.toString(),
          attributesToRetrieve: ["*"],
        });
        setOrderData(response as Order);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <Page
      title={browseOrders}
      description={searchDescription}
      keywords={searchKeywords}
    >
      <div className="container mx-auto p-4">
        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            {loadingText}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{errorText}</div>
        ) : !orderData ? (
          <div className="text-center">{orderNotFoundText}</div>
        ) : (
          <OrderItemByItem
            order={orderData}
            interactions={[]}
            toggleShare={() => {}}
            isBlock
          />
        )}
      </div>
    </Page>
  );
};

export default OrderDetailsPage;

export async function getStaticPaths() {
  return {
    paths: [], // No pre-rendered paths - they'll be generated on-demand
    fallback: true, // Enable fallback for dynamic paths
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  return {
    props: {
      id: params.id,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}
