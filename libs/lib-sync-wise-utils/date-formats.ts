import { format } from 'date-fns';

export function formatTimeAgo(date: string): string {
    const now = new Date();
    const inputDate = new Date(date);
    const differenceInMinutes = (now.getTime() - inputDate.getTime()) / 1000 / 60;

    if (differenceInMinutes < 60) {
        const mins = Math.floor(differenceInMinutes);
        return `${mins} ${mins === 1 ? 'Min' : 'Mins'} Ago`;
    }

    const differenceInHours = differenceInMinutes / 60;
    if (differenceInHours < 24) {
        const hrs = Math.floor(differenceInHours);
        return `${hrs} ${hrs === 1 ? 'hr' : 'hrs'} Ago`;
    }

    const differenceInDays = differenceInHours / 24;
    if (differenceInDays < 30) {
        const days = Math.floor(differenceInDays);
        return `${days} ${days === 1 ? 'Day' : 'Days'} Ago`;
    }

    return format(date, 'dd MMM, yyyy');
}
