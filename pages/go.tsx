import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
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
import ArrowIcon from "@/components/ArrowIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmpty } from "lodash";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  AppearanceEnum,
  DeliveryMethodEnum,
  MaterialEnum,
  OrderInput,
  OrderStatusEnum,
  OrderTypeEnum,
  PaymentTypeEnum,
  ServiceCategoryEnum,
  TextureEnum,
} from "../src/generated/types";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useGoMutation } from "../src/hooks/useGraphQLHooks";

import ReactGA from "react-ga";
import Page from "@/components/Page";
import Title from "@/components/Title";
import PriceInput from "@/components/PriceInput";
import useScreenshot from "@/hooks/useScreenshot";
import UploadToS3WithNativeSdk from "@/components/UploadToS3WithNativeSdk";
import { OrderSuccessMessage } from "@/components/SuccessMessage";
import ErrorMessage from "@/components/ErrorMessage";

ReactGA.initialize("G-XWP9QKK70C");

function App() {
  const { locale } = useLanguage();
  const { indexTitle } = locale;

  return (
    <Page mainClassName="" title={indexTitle}>
      <GoForm />
    </Page>
  );
}

const serviceCategoryName = "category";
const orderTypeName = "type";
const materialName = "material";

const FORM_DATA_SCHEMA = z.object({
  title: z.string().nonempty("Title is required"),
  [orderTypeName]: z
    .nativeEnum(OrderTypeEnum)
    .optional()
    .default(OrderTypeEnum.Request),
  [serviceCategoryName]: z
    .nativeEnum(ServiceCategoryEnum)
    .optional()
    .default(ServiceCategoryEnum.Printer3D),
  [materialName]: z.nativeEnum(MaterialEnum).optional(),
  appearance: z.nativeEnum(AppearanceEnum).optional(),
  color: z.string().optional(),
  texture: z.nativeEnum(TextureEnum).optional(),
  estimatedPrice: z
    .number()
    .min(0, "Estimated price must be at least 0")
    .optional(),
  description: z.string().nonempty("Description is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
  deadline: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().refine((date) => !isNaN(date.getTime()), "Invalid date"),
  ),
  deliveryMethod: z
    .nativeEnum(DeliveryMethodEnum)
    .optional()
    .default(DeliveryMethodEnum.Postal),
  paymentType: z.nativeEnum(PaymentTypeEnum).optional(),
  status: z
    .nativeEnum(OrderStatusEnum)
    .optional()
    .default(OrderStatusEnum.Created),
});

const GoForm: React.FC<{}> = () => {
  const { locale } = useLanguage();
  const [fileId, setFileId] = useState<string>();
  const [go, { error, data, loading }] = useGoMutation();
  const isErrored = error || !isEmpty(data?.go?.reasons);

  const {
    titlePlaceholder,
    materialPlaceholder,
    materialRigidPlaceholder,
    materialSoftPlaceholder,
    materialElasticPlaceholder,
    appearancePlaceholder,
    appearanceGlossyPlaceholder,
    appearanceSatinPlaceholder,
    appearanceMattePlaceholder,
    texturePlaceholder,
    texturePorousPlaceholder,
    textureSmoothPlaceholder,
    textureRoughPlaceholder,
    descriptionPlaceholder,
    deliveryMethodPlaceholder,
    deliveryMethodPostalPlaceholder,
    deliveryMethodHandDeliveryPlaceholder,
    submitButtonLabelPlaceholder,
    paymentTypePlaceholder,
    paymentTypeCashPlaceholder,
    paymentTypeLydiaPlaceholder,
    paymentTypePayPalPlaceholder,
    paymentTypeSepaPlaceholder,
    goTitle,
    emailPlaceholder,
    colorPlaceHolder,
    stlFileHelperText,
  } = locale;

  const materialOptions = [
    { value: MaterialEnum.Rigid, label: `${materialRigidPlaceholder} 🧱` },
    { value: MaterialEnum.Soft, label: `${materialSoftPlaceholder} 🪶` },
    {
      value: MaterialEnum.Elastic,
      label: `${materialElasticPlaceholder} 🧶`,
    },
  ];

  const appearanceOptions = [
    { value: AppearanceEnum.Glossy, label: appearanceGlossyPlaceholder },
    { value: AppearanceEnum.Matte, label: appearanceMattePlaceholder },
    { value: AppearanceEnum.Satin, label: appearanceSatinPlaceholder },
  ];

  const textureOptions = [
    { value: TextureEnum.Smooth, label: textureSmoothPlaceholder },
    { value: TextureEnum.Porous, label: texturePorousPlaceholder },
    { value: TextureEnum.Rough, label: textureRoughPlaceholder },
  ];

  const deliveryMethodOptions = [
    {
      value: DeliveryMethodEnum.Postal,
      label: deliveryMethodPostalPlaceholder,
    },
    {
      value: DeliveryMethodEnum.HandDelivery,
      label: deliveryMethodHandDeliveryPlaceholder,
    },
  ];

  const paymentTypeOptions = [
    { value: PaymentTypeEnum.Cash, label: paymentTypeCashPlaceholder },
    { value: PaymentTypeEnum.Lydia, label: paymentTypeLydiaPlaceholder },
    { value: PaymentTypeEnum.PayPal, label: paymentTypePayPalPlaceholder },
    { value: PaymentTypeEnum.Sepa, label: paymentTypeSepaPlaceholder },
  ];

  const form = useForm<z.infer<typeof FORM_DATA_SCHEMA>>({
    resolver: zodResolver(FORM_DATA_SCHEMA),
    defaultValues: {
      email: undefined,
      status: OrderStatusEnum.Submitted,
      [serviceCategoryName]: undefined,
      [orderTypeName]: OrderTypeEnum.Request,
      [materialName]: undefined,
      deadline: new Date(),
    },
  });

  const selectedMaterialType = form.watch(materialName);

  const { captureAndUploadScreenshot } = useScreenshot();

  const handleSubmit: SubmitHandler<OrderInput> = useCallback(
    async (data) => {
      console.log("Form data before submission:", data); // Log the form data before submission

      // Validate required fields before proceeding
      if (!data.title || !data.email || !data.type) {
        console.error("Required fields are missing");
        return;
      }

      try {
        const result = await go({
          variables: { data: { ...data, fileId } },
        });
        await captureAndUploadScreenshot({
          fileId: fileId ?? "",
          orderId: result.data?.go?.result?.id ?? "",
        });
        // Handle successful submission, e.g., showing a message or resetting the form
      } catch (error) {
        // Handle error
        console.error("Error during order creation:", error);
      }
    },
    [go, fileId, captureAndUploadScreenshot],
  );

  if (!isErrored && data && data.go.result) {
    return <OrderSuccessMessage order={data?.go?.result} />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="rounded-lg px-1 py-4 shadow-md md:px-2"
      >
        <Title className="first">{goTitle}</Title>
        <div className="space-y-4">
          {isErrored && (
            <div className="mb-4">
              <ErrorMessage
                message={
                  data?.go?.reasons?.join("\n") ?? error?.message ?? "Error"
                }
              />
            </div>
          )}
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder={titlePlaceholder} required />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <p className="text-sm text-gray-600">{stlFileHelperText}</p>
            <div className="md:col-span-2">
              <UploadToS3WithNativeSdk
                onSuccess={setFileId}
                shouldDisplay
                big
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {
              <>
                <FormField
                  name="material"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} required>
                          <SelectTrigger className="w-full rounded-md border border-gray-300 p-2">
                            <SelectValue placeholder={materialPlaceholder} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {materialOptions.map((material) => (
                                <SelectItem
                                  key={material.value}
                                  value={material.value}
                                >
                                  {material.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                {selectedMaterialType === MaterialEnum.Rigid && (
                  <FormField
                    name="appearance"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-full rounded-md border border-gray-300 p-2">
                              <SelectValue
                                placeholder={appearancePlaceholder}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {appearanceOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        {...field}
                        className="w-full text-input"
                        value={field.value}
                        placeholder={colorPlaceHolder}
                        type="color"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  name="texture"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full rounded-md border border-gray-300 p-2">
                            <SelectValue placeholder={texturePlaceholder} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {textureOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <PriceInput name={"estimatedPrice"} />
              </>
            }
            <div className="md:col-span-2">
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
                        placeholder={descriptionPlaceholder}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          {
            <>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="rounded-md border border-gray-300 p-2"
                        placeholder={emailPlaceholder}
                        type="email"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="deadline"
                control={form.control}
                render={({ field: { value, ...field } }) => {
                  const formattedDate =
                    value instanceof Date
                      ? value.toISOString().split("T")[0]
                      : value;
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          value={formattedDate}
                          className="rounded-md border border-gray-300 p-2"
                          required
                          type="date"
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </>
          }

          <FormField
            name="deliveryMethod"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    required
                  >
                    <SelectTrigger className="w-full rounded-md border border-gray-300 p-2">
                      <SelectValue placeholder={deliveryMethodPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {deliveryMethodOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          {
            <FormField
              name="paymentType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full rounded-md border border-gray-300 p-2">
                        <SelectValue placeholder={paymentTypePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {paymentTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          }
          <div className="flex justify-end pt-4">
            <div className="wrapper scale-50 justify-end">
              <Button
                type="submit"
                className="submit-button cta h-full !pr-0"
                ariaLabel="Create order now"
                disabled={loading}
              >
                {}
                <span className="pr-8 font-sans italic">
                  {submitButtonLabelPlaceholder}
                </span>

                <span>
                  <ArrowIcon />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default App;
