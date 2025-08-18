import Wrapper from "@/components/auth/card-wrap";

function ErrorCard() {
  return (
    <Wrapper
      headerLabel="Something went wrong!"
      backButtonLabel="Back to Sign-in page &rarr;"
      backButtonHref="/auth/sign-in"
      isErrorPage
    >
      <span className="flex justify-center w-full text-sm font-bold text-red-500">
        Authentication error.
      </span>
    </Wrapper>
  );
}

export default ErrorCard;
