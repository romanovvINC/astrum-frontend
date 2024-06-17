export type CalendarEventCreate = {
    calendar: { label: string; value: string } | null;
    title: string;
    start: Date;
    end: Date;
    description: string;
};
