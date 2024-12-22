"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "../contexts/UserContext";
import { ContactTypeEnum, ServiceCategoryEnum } from "../generated/types";
import { useLanguage } from "../i18n/LanguageProvider";
import Title from "./Title";
import { useSendContactMessageMutation } from "@/hooks/useGraphQLHooks";
import { isEmpty } from "lodash";
import ErrorMessage from "./ErrorMessage";

const FORM_DATA_SCHEMA = z.object({
  subject: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  email: z.string().email("Invalid email address"),
  type: z.nativeEnum(ContactTypeEnum),
  category: z.string(),
});

type FormData = z.infer<typeof FORM_DATA_SCHEMA>;

const ContactForm: React.FC = () => {
  const user = useCurrentUser();
  const { locale } = useLanguage();
  const [sendContact, { loading, error, data }] =
    useSendContactMessageMutation();

  const isErrored = error || !isEmpty(data?.contact?.reasons);

  const {
    subjectPlaceholder,
    typeContactPlaceholder,
    typeContactBugPlaceholder,
    typeContactAssistancePlaceholder,
    typeContactOtherPlaceholder,
    categoryPlaceholder,
    categoryPrinter3DPlaceholder,
    descriptionContactPlaceholder,
    submitContactButtonLabelPlaceholder,
    emailPlaceholder,
    navContact,
    contactSuccessTitle,
    contactSuccessDescription,
  } = locale;

  const contactTypeOptions = [
    { value: ContactTypeEnum.Bug, label: typeContactBugPlaceholder },
    {
      value: ContactTypeEnum.Assistance,
      label: typeContactAssistancePlaceholder,
    },
    { value: ContactTypeEnum.Other, label: typeContactOtherPlaceholder },
  ];

  const serviceCategoryOptions = [
    {
      value: ServiceCategoryEnum.Printer3D,
      label: categoryPrinter3DPlaceholder,
    },
  ];

  const form = useForm<FormData>({
    resolver: zodResolver(FORM_DATA_SCHEMA),
    defaultValues: {
      subject: "",
      description: "",
      type: ContactTypeEnum.Bug,
      category: ServiceCategoryEnum.Printer3D,
      email: user?.email ?? "",
    },
  });

  const handleSubmit = useCallback(
    async (data: FormData) => {
      const { type, subject, description, email } = data;

      try {
        await sendContact({
          variables: {
            data: {
              subject: subject,
              description: description,
              email: email ?? user?.email ?? "",
              type,
              category: data.category,
            },
          },
        });
      } catch (error) {
        console.error(error); // Handle or log the error appropriately
      }
    },
    [user?.email, sendContact],
  );

  if (!isErrored && data && data.contact.result)
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl">{contactSuccessTitle}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <div className="flex items-center justify-center">
            <Label>{contactSuccessDescription}</Label>
          </div>
        </CardContent>
      </Card>
    );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="rounded-lg p-5 shadow-md"
      >
        <Title className="first">{navContact}</Title>

        <div className="space-y-4">
          {isErrored && (
            <>
              <div className="mb-4">
                <ErrorMessage
                  message={
                    data?.contact?.reasons?.join("\n") ??
                    error?.message ??
                    "Error"
                  }
                />
              </div>
            </>
          )}
          <FormField
            name="subject"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder={subjectPlaceholder} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full rounded-md border border-gray-300 p-2">
                        <SelectValue placeholder={typeContactPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {contactTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full rounded-md border border-gray-300 p-2">
                        <SelectValue placeholder={categoryPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {serviceCategoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={emailPlaceholder}
                    preventSpace
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    className="w-full rounded-md border border-gray-300 p-2"
                    rows={4}
                    placeholder={descriptionContactPlaceholder}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="submit-button"
              ariaLabel="Send contact request"
              disabled={loading}
            >
              {submitContactButtonLabelPlaceholder}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
