import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Auth = ({ children }: any) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const hasUser = !!session?.user;
  const router = useRouter();

  useEffect(() => {
    if (!loading && !hasUser) {
      router.push("/api/auth/signin");
    }
  }, [loading, hasUser, router]);
  if (loading || !hasUser) {
    return <div>Waiting for session...</div>;
  }
  return children;
};

export default Auth