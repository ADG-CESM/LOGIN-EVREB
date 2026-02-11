"use client";

import React from "react";

type Props = {
    children: React.ReactNode;
};

export default function Providers({ children }: Props) {
    // No-op provider: removed session handling and login logic
    return <>{children}</>;
}
