export declare class Deferred<ResolveType> {
    promise: Promise<ResolveType>;
    resolve: (result: ResolveType) => void;
    reject: (err: any) => void;
    constructor();
}
