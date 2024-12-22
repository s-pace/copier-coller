import { Label } from "@/components/ui/label";
import React from "react";
import { useLanguage } from "../i18n/LanguageProvider";

export type PrinterType = {
  volume: string;
  speed: string;
  brand: string;
  quantity: number;
};

interface PrinterFormProps {
  printer: PrinterType;
  // eslint-disable-next-line no-unused-vars
  setPrinter: (updateFunction: (printer: PrinterType) => PrinterType) => void;
}

function PrinterForm({ printer, setPrinter }: PrinterFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrinter((prevPrinter) => ({
      ...prevPrinter,
      [name]: value,
    }));
  };

  const { locale } = useLanguage();

  const {
    printerBrandLabel,
    printerQuantityLabel,
    printerVolumeCapacityLabel,
    printerSpeedCapacityLabel,
    printerSpeedCapacityPlaceHolder,
    printerVolumeCapacityPlaceHolder,
    printerBrandPlaceHolder,
  } = locale;
  return (
    <div className="rounded bg-white p-6 shadow-md">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div>
          <Label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            {printerBrandLabel}
          </Label>
          <input
            type="text"
            name="brand"
            id="brand"
            value={printer.brand}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder={printerBrandPlaceHolder}
          />
        </div>
        <div>
          <Label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            {printerQuantityLabel}
          </Label>
          <Label
            htmlFor="volume"
            className="block text-sm font-medium text-gray-700"
          >
            {printerVolumeCapacityLabel}
          </Label>
          <input
            type="text"
            name="volume"
            id="volume"
            value={printer.volume}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder={printerVolumeCapacityPlaceHolder}
          />
        </div>
        <div>
          <Label
            htmlFor="speed"
            className="block text-sm font-medium text-gray-700"
          >
            {printerSpeedCapacityLabel}
          </Label>
          <input
            type="text"
            name="speed"
            id="speed"
            value={printer.speed}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder={printerSpeedCapacityPlaceHolder}
          />
        </div>
        <div>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={printer.quantity}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default PrinterForm;
