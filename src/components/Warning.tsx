import { useState } from "react";
import Badge from "./Badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Warning() {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen)
        return (
            <Badge
                onClick={() => setIsOpen(true)}
                title="⚠️"
                background="rgb(255, 244, 222)"
                border="#ffd659 2px solid"
            />
        );

    return (
        <>
            <Badge
                onClick={() => setIsOpen(true)}
                title="⚠️"
                background="rgb(255, 244, 222)"
                border="#ffd659 2px solid"
            />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Usage Warning</DialogTitle>
                    </DialogHeader>
                    <p>
                        This application was created in 48 hours. even though the application is
                        complete and algorithm is functional, it lacks up to date data and may not
                        be accurate.
                    </p>
                    <p>
                        Please use this application as a reference only and not as a primary source
                        of information. We are not responsible for any damages or losses caused by
                        the use of this application.
                    </p>
                </DialogContent>
            </Dialog>
        </>
    );
}
