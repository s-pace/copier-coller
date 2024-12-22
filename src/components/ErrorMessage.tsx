import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <Alert variant="destructive">
      <TriangleAlert className="mr-2" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;
