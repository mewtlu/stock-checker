import fs from 'fs'
import StockLevels from '../../interfaces/StockLevels'
import ProductStockLevel from '../../interfaces/ProductStockLevel'

export default class StockReader {
    public static parseInputFiles (initialStockFilePath: string): StockLevels {
        let stockData
        try {
            stockData = fs.readFileSync(initialStockFilePath, 'utf-8')
        } catch {
            throw new Error('Error opening stock file, file may not exist?')
        }
        let stockLevels
        try {
            stockLevels = JSON.parse(stockData)
        } catch {
            throw new Error('Error parsing JSON in stock file.')
        }
        const initialStockLevels: StockLevels = {}

        for (let s = 0; s < stockLevels.length; s++) {
            const stockLevel: ProductStockLevel = stockLevels[s]

            initialStockLevels[stockLevel.sku] = stockLevel
        }

        return initialStockLevels
    }
}
