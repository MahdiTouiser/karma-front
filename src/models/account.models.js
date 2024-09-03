export class City {
    constructor(id, state, provice, city) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: id
        });
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: state
        });
        Object.defineProperty(this, "provice", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: provice
        });
        Object.defineProperty(this, "city", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: city
        });
    }
    get locationString() {
        return `${this.state} - ${this.provice} - ${this.city}`;
    }
}
export const DocumentTitleMap = {
    medicalDocument: 'مدارک پزشکی',
    logBookDocument: "لاگ بوک",
    attorneyDocument: 'وکالت‌نامه محضری',
    nationalCardDocument: 'کارت ملی'
};
export const DocumentStatus = {
    NOT_LOADED: 'NotLoaded',
    PENDING: 'Pending',
    EXPIRED: 'Expired',
    CONFIRMED: 'Confirmed',
};
