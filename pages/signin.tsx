import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import Page from "@/components/Page";
import RedirectLoggedUser from "@/components/RedirectLoggedUser";
import { useCurrentUser } from "../src/contexts/UserContext";
import { auth } from "../src/firebase";
import { useLanguage } from "@/i18n/LanguageProvider";
import Title from "@/components/Title";

import { Label } from "@/components/ui/label";

const SignIn = () => {
  const router = useRouter();
  const { locale } = useLanguage();
  const {
    signInTitle,
    emailAddressText,
    signInText,
    missAccountText,
    invalidCredentialsText,
    signUpText,
    emailLabel,
    passwordText,
    signInDescription,
    signInKeywords,
  } = locale;
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const user = useCurrentUser();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await signInWithEmailAndPassword(auth, email ?? "", password ?? "")
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-credential") {
          setErrorMessage(invalidCredentialsText);
        }
      });
  };

  return (
    <Page
      title={signInTitle}
      description={signInDescription}
      keywords={signInKeywords}
    >
      {user ? (
        <RedirectLoggedUser />
      ) : (
        <>
          <CardHeader>
            <Title>{signInTitle}</Title>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <>{errorMessage && <ErrorMessage message={errorMessage} />}</>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label className="py-2" htmlFor="email-address">
                  {emailAddressText}
                </Label>
                <Input
                  className="mt-2"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={emailLabel}
                />
              </div>

              <div>
                <Label className="py-2" htmlFor="password">
                  {passwordText}
                </Label>
                <Input
                  className="mt-2"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder={passwordText}
                />
              </div>
              <div className="flex justify-end md:pr-16 lg:pr-16">
                <Button type="submit" ariaLabel="Sign in">
                  {signInText}
                </Button>
              </div>
            </form>

            <p className="mt-4 text-sm text-gray-500">
              {missAccountText}{" "}
              <Link className="text-blue-600 hover:underline" href="/signup">
                {signUpText}
              </Link>
            </p>
          </CardContent>
        </>
      )}
    </Page>
  );
};

export default SignIn;
