import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmpty } from "lodash";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RoleEnum } from "../generated/types";
import { useLanguage } from "../i18n/LanguageProvider";
import { useCreateUserMutation } from "../hooks/useGraphQLHooks";
import CreatorForm, { CreatorType } from "./CreatorForm";
import ErrorMessage from "./ErrorMessage";
import PrinterForm, { PrinterType } from "./PrinterForm";
import { RegistrationSuccessMessage } from "./SuccessMessage";
import Title from "./Title";
import UploadToS3WithNativeSdk from "./UploadToS3WithNativeSdk";
import { Toggle } from "@/components/ui/toggle";
import { EyeIcon, EyeOffIcon, Newspaper } from "lucide-react";

const initialPrinterState = {
  volume: "",
  speed: "",
  brand: "",
  quantity: 1,
};
const initialCreatorState: CreatorType = { urlProject: "" };

const YOUR_GOOGLE_MAPS_API_KEY = "your_google_maps_api_key";

const profileImages = {
  customer: "profile-place-holder-customer.png",
  printer: "profile-place-holder-printer.png",
  creator: "profile-place-holder-creator.png",
  default: "profile-place-holder-default.png",
};

const FORM_DATA_SCHEMA = z.object({
  username: z.string().min(1, "Username is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  repeatPassword: z.string().min(6, "Repeat password is required"),
  email: z.string().email("Email is invalid"),
  profileInfo: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  twitch: z.string().optional(),
  discoverReason: z.string().optional(),
  referrerUserName: z.string().optional(),
  subNewsletter: z.boolean().default(false).optional(),
});

const userTypeFormToRoleEnum = (userType: string | null) => {
  switch (userType) {
    case "customer":
      return RoleEnum.User;
    case "printer":
      return RoleEnum.Printer;
    case "creator":
      return RoleEnum.User;
    default:
      return RoleEnum.User;
  }
};

const UserForm: React.FC = () => {
  const [createUser, { loading, error, data }] = useCreateUserMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const { locale } = useLanguage();
  const [fileId, setFileId] = useState<string>();
  const [userType, setUserType] =
    useState<keyof typeof profileImages>("default");
  const [printerForms, setPrinterForms] = useState<PrinterType[]>([
    initialPrinterState,
  ]);
  const [creatorForms, setCreatorForms] = useState<CreatorType[]>([
    initialCreatorState,
  ]);

  const form = useForm({
    resolver: zodResolver(FORM_DATA_SCHEMA),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      repeatPassword: "",
      email: "",
      profileInfo: "",
      instagram: "",
      twitter: "",
      twitch: "",
      discoverReason: "",
      referrerUserName: "",
      subNewsletter: false,
    },
  });

  const isErrored = error || !isEmpty(data?.createUser?.reasons);

  const {
    formTitle,
    usernameLabel,
    firstNameLabel,
    lastNameLabel,
    passwordLabel,
    emailLabel,
    profileInfoLabel,
    submitButtonLabel,
    separator,
    addressLabel,
    referrerLabel,
    twitchLabel,
    instagramLabel,
    twitterLabel,
    discoverReasonLabel,
    firstNamePlaceHolder,
    lastNamePlaceHolder,
    usernamePlaceHolder,
    passwordPlaceHolder,
    repeatPasswordPlaceholder,
    emailPlaceHolder,
    instagramPlaceHolder,
    twitterPlaceHolder,
    twitchPlaceHolder,
    profileInfoPlaceHolder,
    discoverReasonPlaceHolder,
    referrerPlaceHolder,
    passwordSignInAlert,
    selectionUserTypePrinterLabel,
    selectionUserTypeCreatorLabel,
    selectionUserTypeLabel,
    addPrinterLabel,
    addPortfolioLabel,
    subNewsletterLabel,
    selectionUserTypeCustomerLabel,
  } = locale;

  const addPrinterForm = () => {
    setPrinterForms((prevPrinterForms) => [
      ...prevPrinterForms,
      { ...initialPrinterState },
    ]);
  };

  const userTypeOptions = [
    { value: "customer", label: selectionUserTypeCustomerLabel },
    { value: "printer", label: selectionUserTypePrinterLabel },
    { value: "creator", label: selectionUserTypeCreatorLabel },
  ];

  const addCreatorForm = () => {
    setCreatorForms((prevCreatorForms) => [
      ...prevCreatorForms,
      { ...initialCreatorState },
    ]);
  };

  const handleSetPrinter =
    (index: number) =>
    // eslint-disable-next-line no-unused-vars
    (updateFunction: (printer: PrinterType) => PrinterType) => {
      setPrinterForms((prevPrinterForms) => {
        const newPrinterForms = [...prevPrinterForms];
        const updatedPrinter = updateFunction(newPrinterForms[index]);
        newPrinterForms[index] = updatedPrinter;
        return newPrinterForms;
      });
    };

  const handleSetCreator =
    (index: number) =>
    // eslint-disable-next-line no-unused-vars
    (updateFunction: (creator: CreatorType) => CreatorType) => {
      setCreatorForms((prevCreatorForms) => {
        const newCreatorForms = [...prevCreatorForms];
        newCreatorForms[index] = updateFunction(newCreatorForms[index]);
        return newCreatorForms;
      });
    };

  const handleSubmit = useCallback(
    async (data: {
      [x: string]: any;
      password: any;
      repeatPassword: any;
      email: any;
      firstName: string;
      lastName: string;
      profileInfo: string;
      username: string;
    }) => {
      const {
        password,
        repeatPassword,
        email,
        twitter,
        twitch,
        instagram,
        ...userData
      } = data;
      if (password !== repeatPassword) {
        alert(passwordSignInAlert);
        return;
      }

      try {
        await createUser({
          variables: {
            data: {
              ...userData,
              email,
              password,
              profilePictureFileId: fileId,
              role: userTypeFormToRoleEnum(userType),
              location: { latitude: 12, longitude: 12 },
              socialMediaLinks: [twitter, twitch, instagram].filter(Boolean),
            },
          },
        });
      } catch (error) {
        console.error("Error creating user:", error);
      }
    },
    [fileId, userType, passwordSignInAlert, createUser],
  );

  if (!isErrored && data && data.createUser.result)
    return <RegistrationSuccessMessage user={data.createUser.result} />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="user-form py-5"
      >
        <Title>{formTitle}</Title>
        {isErrored && (
          <div className="mb-4">
            <ErrorMessage
              message={
                data?.createUser?.reasons?.join("\n") ??
                error?.message ??
                "Error"
              }
            />
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label className="form-label pt-4">
                    {usernameLabel + separator}
                  </Label>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder={usernamePlaceHolder}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <Label className="form-label pt-4">
                    {firstNameLabel + separator}
                  </Label>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder={firstNamePlaceHolder}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <Label className="form-label pt-4">
                    {lastNameLabel + separator}
                  </Label>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder={lastNamePlaceHolder}
                  />
                </FormItem>
              )}
            />
          </div>
          <div>
            <UploadToS3WithNativeSdk
              placeholder={
                <Image
                  src={
                    profileImages[userType ?? ""] || "/profile-place-holder.png"
                  }
                  alt="Profile Placeholder"
                  className="m-auto"
                  style={{ maxWidth: "20rem" }}
                  width={200}
                  height={200}
                />
              }
              isProfilePicture
              onSuccess={setFileId}
              shouldDisplay
              acceptedFileTypes={
                "image/jpeg, image/png, image/gif, image/bmp, image/webp"
              }
            />
          </div>
        </div>
        <div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label className="form-label pt-4">
                  {passwordLabel + separator}
                </Label>
                <div className="flex">
                  <Input
                    {...field}
                    className="w-full"
                    type={showPassword ? "text" : "password"}
                    placeholder={passwordPlaceHolder}
                  />
                  <Toggle
                    onPressedChange={() => {
                      setShowPassword((old) => !old);
                    }}
                    aria-label="Toggle show password"
                    // className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? (
                      <EyeIcon className="relative h-4 w-4" />
                    ) : (
                      <EyeOffIcon className="relative h-4 w-4" />
                    )}
                  </Toggle>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex py-2">
                  <Input
                    {...field}
                    className="w-full"
                    type={showRepeatPassword ? "text" : "password"}
                    placeholder={repeatPasswordPlaceholder}
                  />
                  <Toggle
                    onPressedChange={() => {
                      console.log("onPressedChange");
                      setShowRepeatPassword((old) => !old);
                    }}
                    aria-label="Toggle show password"
                    // className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showRepeatPassword ? (
                      <EyeIcon className="relative h-4 w-4" />
                    ) : (
                      <EyeOffIcon className="relative h-4 w-4" />
                    )}
                  </Toggle>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label className="form-label pt-4">
                  {emailLabel + separator}
                </Label>
                <Input
                  {...field}
                  className="w-full"
                  type="email"
                  placeholder={emailPlaceHolder}
                  preventSpace
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subNewsletter"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center rounded-md border p-2">
                <FormControl>
                  <Checkbox
                    className="my-2"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>

                <FormLabel className="flex items-center">
                  <figure>
                    <Newspaper />
                  </figure>
                  <figcaption className="ml-2">{subNewsletterLabel}</figcaption>
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
        <div className="opacity-30 hover:opacity-100">
          <Label className="form-label pt-4">{addressLabel + separator}</Label>
          <Autocomplete
            apiKey={YOUR_GOOGLE_MAPS_API_KEY}
            onPlaceSelected={() => {
              // setLocation(place);
            }}
            options={{
              types: ["address"],
              componentRestrictions: { country: "fr" },
            }}
            className="address-autocomplete min-w-full"
          />
        </div>
        <div className="opacity-30 hover:opacity-100">
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <Label className="form-label pt-4">
                  {instagramLabel + separator}
                </Label>
                <Input
                  {...field}
                  className="min-w-full"
                  placeholder={instagramPlaceHolder}
                />
              </FormItem>
            )}
          />
        </div>
        <div className="opacity-30 hover:opacity-100">
          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <Label className="form-label pt-4">
                  {twitterLabel + separator}
                </Label>
                <Input
                  {...field}
                  className="min-w-full"
                  placeholder={twitterPlaceHolder}
                />
              </FormItem>
            )}
          />
        </div>
        <div className="opacity-30 hover:opacity-100">
          <FormField
            control={form.control}
            name="twitch"
            render={({ field }) => (
              <FormItem>
                <Label className="form-label pt-4">
                  {twitchLabel + separator}
                </Label>
                <Input
                  {...field}
                  className="min-w-full"
                  placeholder={twitchPlaceHolder}
                />
              </FormItem>
            )}
          />
        </div>
        <div className="opacity-30 hover:opacity-100">
          <FormField
            control={form.control}
            name="profileInfo"
            render={({ field }) => (
              <FormItem>
                <Label className="form-label pt-4">
                  {profileInfoLabel + separator}
                </Label>
                <Textarea
                  {...field}
                  className="min-h-32 w-full"
                  placeholder={profileInfoPlaceHolder}
                />
              </FormItem>
            )}
          />
        </div>
        <div className="opacity-30 hover:opacity-100">
          <FormField
            control={form.control}
            name="discoverReason"
            render={({ field }) => (
              <FormItem>
                <Label className="form-label pt-4">
                  {discoverReasonLabel + separator}
                </Label>
                <Textarea
                  {...field}
                  className="h-40 w-11/12 resize-y rounded-md border border-[var(--border-color)] bg-white px-3.5 py-2.5 text-base"
                  placeholder={discoverReasonPlaceHolder}
                />
              </FormItem>
            )}
          />
        </div>
        <div className="opacity-30 hover:opacity-100">
          <FormField
            control={form.control}
            name="referrerUserName"
            render={({ field }) => (
              <FormItem className="mb-2">
                <Label className="form-label pt-4">
                  {referrerLabel + separator}
                </Label>
                <Input
                  {...field}
                  className="min-w-full"
                  placeholder={referrerPlaceHolder}
                />
              </FormItem>
            )}
          />
        </div>
        <Label className="form-label pt-4">
          {selectionUserTypeLabel + separator}
        </Label>
        <Select
          name="userType"
          onValueChange={(value) =>
            setUserType(value as keyof typeof profileImages)
          }
        >
          <SelectTrigger className="mb-4 w-[180px]">
            <SelectValue placeholder="Select user type" />
          </SelectTrigger>
          <SelectContent>
            {userTypeOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {userType === "customer" && (
          <div>{/* Customer specific fields go here */}</div>
        )}
        {userType === "printer" && (
          <>
            <div>
              {printerForms.map((printer, index) => (
                <PrinterForm
                  key={index}
                  printer={printer}
                  setPrinter={handleSetPrinter(index)}
                />
              ))}
            </div>
            <div className="flex items-center justify-end pb-4">
              <Button
                onClick={addPrinterForm}
                ariaLabel={"Add printer"}
                type="button"
              >
                {addPrinterLabel}
              </Button>
            </div>
          </>
        )}
        {userType === "creator" && (
          <>
            {creatorForms.map((creator, index) => (
              <CreatorForm
                key={index}
                creator={creator}
                setCreator={handleSetCreator(index)}
              />
            ))}
            <div className="flex items-center justify-center pb-4">
              <Button
                onClick={addCreatorForm}
                type="button"
                ariaLabel={"Add creator"}
              >
                {addPortfolioLabel}
              </Button>
            </div>
          </>
        )}
        <div className="flex items-center justify-end">
          <div>
            <Button
              ariaLabel={"Create user"}
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {submitButtonLabel}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
