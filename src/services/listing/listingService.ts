interface ListingService {
    getListings(): Promise<Listing[]>;
    getListing(id: string): Promise<Listing>;
}