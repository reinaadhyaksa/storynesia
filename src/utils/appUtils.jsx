import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const initializeAOS = () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
};

export const useAppData = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [minLoadingTimePassed, setMinLoadingTimePassed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinLoadingTimePassed(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const loadBooksData = async () => {
        const startTime = Date.now();

        try {
            const response = await fetch('/data/data.json');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            if (minLoadingTimePassed) {
                setIsLoading(false);
            } else {
                const remainingTime = 2000 - (Date.now() - startTime);
                if (remainingTime > 0) {
                    const timer = setTimeout(() => {
                        setIsLoading(false);
                    }, remainingTime);

                    return () => clearTimeout(timer);
                } else {
                    setIsLoading(false);
                }
            }
        }
    };

    return {
        books,
        isLoading,
        loadBooksData
    };
};