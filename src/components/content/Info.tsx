import { SlInfo } from "react-icons/sl";

export const Info = ({ message }: { message: string }) => {
  return (
    <div className="p-4 bg-surface rounded-md flex items-center gap-4">
      <SlInfo className="text-text-accent flex-shrink-0 w-5 h-5" />
      {message}
    </div>
  );
};

