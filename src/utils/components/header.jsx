import { useState, useEffect } from "react";

export const usePWAInstall = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [canInstall, setCanInstall] = useState(false);
    const [installSuccess, setInstallSuccess] = useState(false);

    useEffect(() => {
        const beforeInstallHandler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setCanInstall(true);
        };

        const appInstalledHandler = () => {
            console.log("✅ Aplikasi berhasil diinstall");
            setDeferredPrompt(null);
            setCanInstall(false);
            setInstallSuccess(true);

            window.dispatchEvent(new CustomEvent('appInstalled'));
        };

        window.addEventListener('beforeinstallprompt', beforeInstallHandler);
        window.addEventListener('appinstalled', appInstalledHandler);

        return () => {
            window.removeEventListener('beforeinstallprompt', beforeInstallHandler);
            window.removeEventListener('appinstalled', appInstalledHandler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        try {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log("Pilihan user:", outcome);

            if (outcome === 'accepted') {
                console.log('User menerima instalasi');
            } else {
                console.log('User menolak instalasi');
                setDeferredPrompt(null);
                setCanInstall(false);
            }
        } catch (error) {
            console.error("Error installing app:", error);
            throw error;
        }
    };

    return {
        deferredPrompt,
        canInstall,
        installSuccess,
        handleInstallClick
    };
};