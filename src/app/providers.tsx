"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

type Props = {
    children: React.ReactNode;
    basePath?: string;
};

export default function Providers({ children, basePath = "/evreb/api/auth" }: Props) {
    return <SessionProvider basePath={basePath}>{children}</SessionProvider>;
}
