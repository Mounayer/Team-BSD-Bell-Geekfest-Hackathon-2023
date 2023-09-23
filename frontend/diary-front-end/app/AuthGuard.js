"use client";

import { Auth, getUser } from "@/src/auth";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthGuard = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [canSeeContent, setCanSeeContent] = useState(false);

  useEffect(() => {
    getUser().then((user) => {
      if (!user && pathname == '/') {
        setCanSeeContent(true);
      }
      else if(!user && pathname !== '/') {
        router.push('/');
      }
      else {
        setCanSeeContent(true);
      }
    });
  }, [pathname]);

  return <>{canSeeContent && children}</>;
};

export default AuthGuard;
