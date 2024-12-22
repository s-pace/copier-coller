import { useCallback } from "react";
import Page from "../../src/components/Page";
import {
  useMyOrdersQuery,
  usePublishOrderMutation,
} from "../../src/hooks/useGraphQLHooks";

import Title from "@/components/Title";
import Image from "next/image";
import Link from "next/link";
import Button from "../../src/components/Button";
import ErrorMessage from "../../src/components/ErrorMessage";
import OrderItem from "../../src/components/OrderItem";
import Spinner from "../../src/components/Spinner";
import { useLanguage } from "../../src/i18n/LanguageProvider";
import { SmilePlus } from "lucide-react";

export const OrderPlaceholder = () => {
  const { locale } = useLanguage();

  const { noOrderTitle, missingOrderLabel, navOrderPage } = locale;
  return (
    <div className="text-center">
      <div className="flex items-center justify-center">
        <Image
          src="/empty-folder.webp"
          alt="Empty Folder"
          width={100}
          height={100}
        />
        <h5 className="mb-2 font-bold">{noOrderTitle}</h5>
      </div>
      <p className="mb-4">{missingOrderLabel}</p>
      <div className="flex items-center justify-center">
        <Link href="/order" className="text-purple-500 underline">
          {navOrderPage}
        </Link>
        <Image
          src="/new-order-heart.png"
          alt="New Order Heart"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
};

function MyOrders() {
  const { data: result, loading, error } = useMyOrdersQuery();
  const [publishOrder] = usePublishOrderMutation();

  const onPublishOrder = useCallback(
    async (orderId: string) => {
      try {
        console.log("Attempting to publish order:", orderId);
        await publishOrder({ variables: { orderId } });
        // Handle successful submission, e.g., showing a message or resetting the form
      } catch (error) {
        // Handle error
        console.error(error);
      }
    },
    [publishOrder],
  );

  const { locale } = useLanguage();

  const { myOrderTitle, publishOrderLabel, orderKeywords } = locale;

  return (
    <Page
      title={myOrderTitle}
      description={myOrderTitle}
      keywords={orderKeywords}
    >
      <article className="flex h-full flex-col items-center py-4">
        <Title className="first"> {myOrderTitle}</Title>
        {error && <ErrorMessage message={error.message ?? ""} />}
        {loading && <Spinner />}
        {result?.myOrders.result?.length === 0 && (
          <OrderPlaceholder key="placeholder" />
        )}
        <ul className="grid grid-cols-1 gap-4">
          {result?.myOrders.result?.map(({ order, screenshot }) => (
            <OrderItem
              order={{ ...order, interactions: [] }}
              screenshot={screenshot ?? undefined}
              key={order.id}
              cta={
                <>
                  {order.publishedAt && (
                    <div className="flex justify-end">
                      <Button onClick={() => onPublishOrder(order.id!)}>
                        <SmilePlus />
                      </Button>
                      <Button onClick={() => onPublishOrder(order.id!)}>
                        {publishOrderLabel}
                      </Button>
                    </div>
                  )}
                </>
              }
            />
          ))}
        </ul>
      </article>
    </Page>
  );
}

export default MyOrders;
