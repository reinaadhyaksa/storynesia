import { useState, useEffect } from "react";

export const usePWAInstall = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [canInstall, setCanInstall] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setCanInstall(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        window.addEventListener('appinstalled', () => {
            console.log("✅ Aplikasi berhasil diinstall");
            setDeferredPrompt(null);
            setCanInstall(false);
        });

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        try {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log("Pilihan user:", outcome);
            setDeferredPrompt(null);
            setCanInstall(false);
        } catch (error) {
            console.error("Error installing app:", error);
        }
    };

    return {
        deferredPrompt,
        canInstall,
        handleInstallClick
    };
};