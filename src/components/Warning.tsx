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
                        <DialogTitle>Beta Information</DialogTitle>
                    </DialogHeader>
                    <p>This application is currently in Beta. Please expect potential issues.</p>
                </DialogContent>
            </Dialog>
        </>
    );
}
