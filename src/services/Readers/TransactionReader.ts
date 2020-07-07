import fs from 'fs'
import Transaction from '../../interfaces/Transaction'

export default class TransactionReader {
    public static parseInputFiles (initialTransactionFilePath: string): Transaction[] {
        let transactionData
        try {
            transactionData = fs.readFileSync(initialTransactionFilePath, 'utf-8')
        } catch {
            throw new Error('Error opening transaction file, file may not exist?')
        }
        let parsedTransactionData
        try {
            parsedTransactionData = JSON.parse(transactionData)
        } catch {
            throw new Error('Error parsing JSON in transaction file.')
        }
        return parsedTransactionData
    }
}
