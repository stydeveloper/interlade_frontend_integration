import { Suspense } from "react";

function withSuspense(Component) {
  return function WithSuspense(props) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </Suspense>
    );
  };
}

export default withSuspense;
