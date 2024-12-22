import React, { ReactNode } from "react";
import { Order, User } from "../generated/types";
import { useLanguage } from "../i18n/LanguageProvider";
import { useConfettiAnimation } from "../hooks/useConfettiAnimation";

interface SuccessMessageProps {
  children?: ReactNode;
}

const RegistrationSuccessMessage: React.FC<{
  user: Pick<User, "email" | "username">;
}> = ({ user }) => {
  const { locale } = useLanguage();

  const {
    registrationSuccessMessage,
    registrationSuccessText,
    registrationSuccessInstructionText,
  } = locale;

  return (
    <SuccessMessage>
      <h1 className="my-4 text-center text-2xl font-bold text-primary md:text-4xl">
        {registrationSuccessMessage}🎉
      </h1>

      <p className="">
        {registrationSuccessText.replace("{username}", user.username)}
      </p>
      <p className="">
        {registrationSuccessInstructionText.replace("{email}", user.email)}
      </p>
    </SuccessMessage>
  );
};

const OrderSuccessMessage: React.FC<{
  order: Pick<Order, "title" | "email">;
}> = ({ order }) => {
  const { locale } = useLanguage();

  const { orderSuccessMessage, orderSuccessText, orderSuccessInstructionText } =
    locale;

  return (
    <SuccessMessage>
      <h1 className="my-4 text-center text-2xl font-bold text-primary md:text-4xl">
        {orderSuccessMessage}🎉
      </h1>

      <p>{orderSuccessText.replace("{orderTitle}", order.title)}</p>
      <p className="">
        {orderSuccessInstructionText.replace("{email}", order.email)}
      </p>
    </SuccessMessage>
  );
};

const SuccessMessage: React.FC<SuccessMessageProps> = ({ children }) => {
  useConfettiAnimation({
    duration: 2,
    initialParticleCount: 100,
    onAnimationEnd: () => {},
  });

  return <div className="h-full p-4 pb-8">{children}</div>;
};

export default SuccessMessage;

export { RegistrationSuccessMessage, OrderSuccessMessage };
