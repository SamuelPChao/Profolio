import { forwardRef, type ComponentPropsWithRef } from "react";

interface InputProps extends ComponentPropsWithRef<"input"> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      className="h-[2.5rem] rounded bg-black-3 text-white-1 px-2"
      {...props}
    />
  );
});

export default Input;
