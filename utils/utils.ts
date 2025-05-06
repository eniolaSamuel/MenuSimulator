export function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ")
}


export function formatNaira(amount: number) {
    return `₦${amount.toLocaleString("en-NG")}`
}

export function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date)
}
