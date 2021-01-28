import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();

  //redirect to login page if it's unauthenticated
  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [fetching, data, router]);
};
