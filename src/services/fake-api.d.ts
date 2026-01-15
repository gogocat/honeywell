export interface Location {
    name: string;
    id: string;
}

export interface Incident {
    name: string;
    id: number;
    priority: number;
    datetime: string;
    locationId: string;
}

declare const fakeApi: {
    getLocations: () => Promise<Location[]>;
    getIncidentsByLocationId: (locationId: string) => Promise<Incident[]>;
};

export default fakeApi;
