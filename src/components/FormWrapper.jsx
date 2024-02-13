export function FormWrapper({ title, children }) {
  return (
    <>
      <div className="flex justify-center">
        <h2 className="text-center text-white mb-8 font-semibold text-xl bg-borderGrey rounded-md w-1/4">
          {title}
        </h2>
      </div>
      <div
        className="grid gap-x-2 gap-y-4 justify-center"
        style={{ gridTemplateColumns: "auto minmax(auto, 400px)" }}
      >
        {children}
      </div>
    </>
  );
}
