import { useRef, useEffect } from 'react';

export function useOnWindowResize(cb) {
    const cbRef = useRef();
    cbRef.current = cb;

    useEffect(() => {
        const onWindowResize = () => {
            cbRef.current();
        }
        window.addEventListener('resize', onWindowResize);
        return () => window.removeEventListener('resize', onWindowResize);
    }, []);
}