import { getSummaryRepository } from "../repository/summary-repository";

export async function getSummaryService(document: string) { 
    try {
       
        const result = await getSummaryRepository(document)
        return result
        
    } catch (err) {
        throw err; 
    }
}