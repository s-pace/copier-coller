"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmpty } from "lodash";
import React, { useCallback, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useCurrentUser } from "../contexts/UserContext";
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
} from "../generated/types";
import { useLanguage } from "../i18n/LanguageProvider";
import { useCreateOrderMutation } from "../hooks/useGraphQLHooks";
import ErrorMessage from "./ErrorMessage";
import PriceInput from "./PriceInput";
import { OrderSuccessMessage } from "./SuccessMessage";
import Title from "./Title";
import UploadToS3WithNativeSdk from "./UploadToS3WithNativeSdk";

import useScreenshot from "../hooks/useScreenshot";

const YOUR_GOOGLE_MAPS_API_KEY = "AIzaSyAo3fF8nEFIbNgWrOCq0Ds3Nwfd7H4WZW4";

const serviceCategoryName = "category";
const orderTypeName = "type";
const materialName = "material";

const FORM_DATA_SCHEMA = z.object({
  title: z.string().nonempty("Title is required"),
  [orderTypeName]: z.nativeEnum(OrderTypeEnum),
  [serviceCategoryName]: z.nativeEnum(ServiceCategoryEnum),
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
  deliveryMethod: z.nativeEnum(DeliveryMethodEnum),
  paymentType: z.nativeEnum(PaymentTypeEnum).optional(),
  status: z.nativeEnum(OrderStatusEnum),
});

const OrderForm: React.FC<{}> = () => {
  const user = useCurrentUser();
  const { locale } = useLanguage();
  const [fileId, setFileId] = useState<string>();
  const [createOrder, { error, data, loading }] = useCreateOrderMutation();
  const isErrored = error || !isEmpty(data?.createOrder?.reasons);

  const {
    titlePlaceholder,
    typePlaceholder,
    typeRequestPlaceholder,
    typeOfferPlaceholder,
    categoryPlaceholder,
    categoryPrinter3DPlaceholder,
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
    emailPlaceholder,
    addressPlaceholder,
    phoneNumberPlaceholder,
    deliveryMethodPlaceholder,
    deliveryMethodPostalPlaceholder,
    deliveryMethodHandDeliveryPlaceholder,
    submitButtonLabelPlaceholder,
    paymentTypePlaceholder,
    paymentTypeCashPlaceholder,
    paymentTypeLydiaPlaceholder,
    paymentTypePayPalPlaceholder,
    paymentTypeSepaPlaceholder,
    navOrder,
    categoryScannerPlaceholder,
    createOrderDescription,
  } = locale;

  const materialOptions = [
    { value: MaterialEnum.Rigid, label: `${materialRigidPlaceholder} 🧱` },
    { value: MaterialEnum.Soft, label: `${materialSoftPlaceholder} 🪶` },
    {
      value: MaterialEnum.Elastic,
      label: `${materialElasticPlaceholder} 🧶`,
    },
  ];

  const orderTypeOptions = [
    { value: OrderTypeEnum.Request, label: typeRequestPlaceholder },
    { value: OrderTypeEnum.Offer, label: typeOfferPlaceholder },
  ];

  const serviceCategoryOptions = [
    {
      value: ServiceCategoryEnum.Printer3D,
      label: categoryPrinter3DPlaceholder,
    },
    {
      value: ServiceCategoryEnum.Scanner,
      label: categoryScannerPlaceholder,
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
      phoneNumber: user?.phoneNumber ?? undefined,
      email: user?.email ?? undefined,
      status: OrderStatusEnum.Submitted,
      [serviceCategoryName]: undefined,
      [orderTypeName]: OrderTypeEnum.Request,
      [materialName]: undefined,
      deadline: new Date(),
    },
  });

  const selectedServiceCategory = form.watch(serviceCategoryName);
  const selectedOrderType = form.watch(orderTypeName);
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
        const result = await createOrder({
          variables: { data: { ...data, fileId } },
        });
        await captureAndUploadScreenshot({
          fileId: fileId ?? "",
          orderId: result.data?.createOrder?.result?.id ?? "",
        });
        // Handle successful submission, e.g., showing a message or resetting the form
      } catch (error) {
        // Handle error
        console.error("Error during order creation:", error);
      }
    },
    [createOrder, fileId, captureAndUploadScreenshot],
  );

  if (!isErrored && data && data.createOrder.result) {
    return <OrderSuccessMessage order={data?.createOrder?.result} />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="rounded-lg p-5 shadow-md"
      >
        <Title className="first">{navOrder}</Title>
        <div className="mb-4">
          <span className="font-sans italic">{createOrderDescription}</span>
        </div>
        <div className="space-y-4">
          {isErrored && (
            <div className="mb-4">
              <ErrorMessage
                message={
                  data?.createOrder?.reasons?.join("\n") ??
                  error?.message ??
                  "Error"
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
                  <Input
                    {...field}
                    placeholder={titlePlaceholder}
                    required
                    className="p-2"
                  />
                </FormControl>
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
                    <Select onValueChange={field.onChange} required>
                      <SelectTrigger className="w-full rounded-md border border-gray-300 p-2">
                        <SelectValue placeholder={typePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {orderTypeOptions.map((material) => (
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
            <FormField
              name={serviceCategoryName}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} required>
                      <SelectTrigger className="w-full rounded-md border border-gray-300 p-2">
                        <SelectValue placeholder={categoryPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {serviceCategoryOptions.map(
                            (serviceCategorySelected) => (
                              <SelectItem
                                key={serviceCategorySelected.value}
                                value={serviceCategorySelected.value}
                              >
                                {serviceCategorySelected.label}
                              </SelectItem>
                            ),
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            {selectedServiceCategory === ServiceCategoryEnum.Printer3D &&
              selectedOrderType === OrderTypeEnum.Request && (
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
              )}
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
          {selectedServiceCategory === ServiceCategoryEnum.Printer3D &&
            selectedOrderType === OrderTypeEnum.Request && (
              <>
                <div className="md:col-span-2">
                  <UploadToS3WithNativeSdk
                    onSuccess={setFileId}
                    shouldDisplay
                  />
                </div>
                <div className="md:col-span-2">
                  <Autocomplete
                    apiKey={YOUR_GOOGLE_MAPS_API_KEY}
                    name="address"
                    onPlaceSelected={(place) => {
                      console.log(place);
                    }}
                    options={{
                      types: ["address"],
                      componentRestrictions: { country: "fr" },
                    }}
                    placeholder={addressPlaceholder}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <FormField
                  name="phoneNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-md border border-gray-300 p-2"
                          placeholder={phoneNumberPlaceholder}
                          type="text"
                          defaultValue={user?.phoneNumber ?? undefined}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

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
                          defaultValue={user?.email ?? undefined}
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
            )}

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
          {selectedServiceCategory === ServiceCategoryEnum.Printer3D && (
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
          )}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="submit-button"
              ariaLabel="Create order"
              disabled={loading}
            >
              {submitButtonLabelPlaceholder}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default OrderForm;
