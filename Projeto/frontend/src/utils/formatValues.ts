export function formatDateForInput(date: string) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    let month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    let day = dateObj.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function convertDateToBrazilianTime(date: string) {
    const dateObj = new Date(date);
    const options = {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric' as const,
        month: '2-digit' as const,
        day: '2-digit' as const
    };
    return dateObj.toLocaleDateString('pt-BR', options);
}

export function formatDocument(document: string) {

    document = document.replace(/\D/g, '');

    if (document.length === 11) {
        return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (document.length === 14) {
        return document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    } else {
        return document;
    }
}