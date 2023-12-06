type ToastProps = {
  message: string;
};

const CustomToast = ({ message }: ToastProps) => {
  return (
    <div className="fixed top-0 bottom-4 rounded-md z-[100] bg-white flex max-h-screen w-full flex-col-reverse p-4  sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] text-sm opacity-90 shadow-lg">
      {message}
    </div>
  );
};

export default CustomToast;
