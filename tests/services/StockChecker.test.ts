import { resolve } from 'path'
import StockCheckerService from '../../src/services/StockChecker'
import StockReader from '../../src/services/Readers/StockReader'
import TransactionReader from '../../src/services/Readers/TransactionReader'

let stockCheckerService

beforeEach(() => {
    stockCheckerService = new StockCheckerService(
        StockReader.parseInputFiles(resolve(__dirname, '../../data/stock.json')),
        TransactionReader.parseInputFiles(resolve(__dirname, '../../data/transactions.json')),
    )
})

test('should throw an error for a non-existant SKU', () => {
    expect(() => {
        stockCheckerService.fetchInitialStockLevel('fake-sku')
    }).toThrow(Error)
})

test('should return correct values for a valid SKU', async () => {
    const sku = 'LTV719449/39/39'
    const stockLevels = {
        sku,
        qty: 8540,
    }

    const actualStockLevel = await stockCheckerService.retrieve(sku)
    expect(actualStockLevel)
        .toStrictEqual(stockLevels)
})
