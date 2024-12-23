import { ReactNode } from "react";

export default function Badges({ children }: { children: ReactNode }) {
    return <div className="fixed top-0 right-[15%] z-50 flex gap-2">{children}</div>;
}
