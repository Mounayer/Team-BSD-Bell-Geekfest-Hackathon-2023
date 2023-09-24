"use client";

import { Auth, getUser } from "@/src/auth";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthGuard = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [canSeeContent, setCanSeeContent] = useState(false);
  const allowedRoutes = [
    '/'
  ];

  useEffect(() => {
    getUser().then((user) => {
      if (!user && allowedRoutes.contains(pathname)) {
        setCanSeeContent(true);
      }
      else if(!user && !allowedRoutes.contains(pathname)) {
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
