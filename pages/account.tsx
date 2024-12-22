import Title from "@/components/Title";
import ErrorMessage from "@/components/ErrorMessage";
import Page from "@/components/Page";
import Spinner from "@/components/Spinner";
import { useCurrentUser, useLogout } from "../src/contexts/UserContext";
import { useLanguage } from "@/i18n/LanguageProvider"; // Adjust the import path according to your project structure
import { useGetCurrentUserQuery } from "../src/hooks/useGraphQLHooks";
import { gql, useMutation } from "@apollo/client";

const SEND_RESET_LINK = gql`
  mutation SendPasswordResetLink($email: String!) {
    sendPasswordResetLink(email: $email) {
      success
      resetLink
      error
    }
  }
`;

const AccountPage = () => {
  const user = useCurrentUser();
  const { data, loading, error } = useGetCurrentUserQuery();

  const logout = useLogout();

  // Use the useLanguage hook to get the current locale
  const { locale } = useLanguage();

  const {
    accountTitle,
    accountKeywords,
    description,
    usernameLabel,
    emailLabel,
    firstNameLabel,
    lastNameLabel,
    profileInfoLabel,
    socialMediaLinksLabel,
    discoverReasonLabel,
    referrerUserNameLabel,
    roleLabel,
    logoutLabel,
  } = locale;

  const userInfo: { [key: string]: any } = {
    username: data?.getCurrentUser.name || user?.displayName,
    email: data?.getCurrentUser.email || user?.email,
    firstName: data?.getCurrentUser.firstName,
    lastName: data?.getCurrentUser.lastName,
    profileInfo: data?.getCurrentUser.profileInfo,
    socialMediaLinks: data?.getCurrentUser.socialMediaLinks,
    discoverReason: data?.getCurrentUser.discoverReason,
    referrerUserName: data?.getCurrentUser.referrerUserName,
    role: data?.getCurrentUser.role,
    portfolioURL: data?.getCurrentUser.portFolioURL,
  };

  const labels = {
    usernameLabel,
    firstNameLabel,
    lastNameLabel,
    emailLabel,
    profileInfoLabel,
    socialMediaLinksLabel,
    discoverReasonLabel,
    referrerUserNameLabel,
    roleLabel,
  };

  const [sendResetLink] = useMutation(SEND_RESET_LINK);

  const handleResetPassword = async () => {
    if (!user?.email) return;

    try {
      const { data } = await sendResetLink({
        variables: { email: user.email },
      });

      if (data.sendPasswordResetLink.success) {
        // Redirect to the reset link
        window.location.href = data.sendPasswordResetLink.resetLink;
      } else {
        // Handle error
        console.error(
          "Failed to send reset link:",
          data.sendPasswordResetLink.error,
        );
      }
    } catch (error) {
      console.error("Error sending reset link:", error);
    }
  };

  return (
    <Page
      title={accountTitle}
      description={description}
      keywords={accountKeywords}
    >
      <article className="flex h-full flex-col items-center py-4">
        <Title className="first"> {accountTitle}</Title>

        {error && <ErrorMessage message={error.message ?? ""} />}
        {loading && <Spinner />}

        {Object.keys(labels).map((labelKey) => {
          const value = userInfo[labelKey.replace("Label", "")];
          return value ? (
            <p key={labelKey} className="mt-2 font-medium">
              <span className="italic text-gray-700">{locale[labelKey]}:</span>{" "}
              <span className="font-normal">{value}</span>
            </p>
          ) : null;
        })}
        <div className="mt-4 flex w-full justify-center gap-4">
          <button
            className="flex max-h-12 w-1/4 min-w-[16rem] items-center justify-center"
            onClick={() => {
              logout();
            }}
          >
            {logoutLabel}
          </button>
          <button
            onClick={handleResetPassword}
            className="flex max-h-12 min-w-[16rem] items-center justify-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Reset Password
          </button>
        </div>
      </article>
    </Page>
  );
};

export default AccountPage;
