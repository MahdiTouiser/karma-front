export const UserStatuses = {
    AWAITING_COMPLETION: "AwaitingCompletion",
    PENDING: "Pending",
    ACTIVE: "Active",
    INACTIVE: "Inactive",
};
export const UserStatusesPersianMap = new Map([
    [UserStatuses.AWAITING_COMPLETION, "در انتظار تکمیل"],
    [UserStatuses.PENDING, "در انتظار تأیید"],
    [UserStatuses.ACTIVE, "فعال "],
    [UserStatuses.INACTIVE, "غیر فعال"],
]);
export const EventStatuses = {
    HELD: "Held",
    PENDING: "Pending",
    ACTIVE: "Active",
    INACTIVE: "Inactive",
};
export const EventStatusesPersianMap = new Map([
    [EventStatuses.HELD, "برگزار شده"],
    [EventStatuses.PENDING, "لغو شده"],
    [EventStatuses.ACTIVE, "آماده رزرو "],
    [EventStatuses.INACTIVE, "غیر قابل رزرو"],
]);
