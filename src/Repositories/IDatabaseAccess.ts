export interface IDatabaseAccess{
    getConnection(): Promise<any>
}