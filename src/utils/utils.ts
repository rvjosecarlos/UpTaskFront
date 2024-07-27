export const dateFormat = (dateStr: string) : string => {
    const date = new Date(dateStr);
    const formateador = new Intl.DateTimeFormat('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return formateador.format(date);
};