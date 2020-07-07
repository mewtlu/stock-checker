import ProductStockLevel from '../interfaces/ProductStockLevel'
import StockLevels from '../interfaces/StockLevels'
import Transaction from '../interfaces/Transaction'
import SKUNotFound from '../errors/SKUNotFound'
import ProductInfo from '../interfaces/ProductInfo'

enum TransactionTypes {
    Order = 'order',
    Refund = 'refund',
}

export default class StockCheckerService {
    private stock: StockLevels
    private transactions: Transaction[]

    constructor (stock: StockLevels, transactions: Transaction[]) {
        this.stock = stock
        this.transactions = transactions
    }

    /**
     * Retrieves the stock level for a given SKU
     */
    public async retrieve (sku: string): Promise<ProductInfo> {
        let initialStockLevel = 0
        try {
            initialStockLevel = this.fetchInitialStockLevel(sku).stock
        } catch (err) {
            if (!(err instanceof SKUNotFound)) throw err
            // else ignore and default stock level to 0
        }

        return {
            sku: sku,
            qty: this.fetchProductStockDifference(initialStockLevel, sku),
        }
    }
    
    private fetchInitialStockLevel (sku: string): ProductStockLevel {
        const stockLevel: ProductStockLevel = this.stock[sku]
        if (!stockLevel) {
            throw new SKUNotFound()
        }
        return stockLevel
    }

    private fetchProductStockDifference (initialStockLevel: number, sku: string): number {
        return this.transactions.reduce((accum: number, transaction: Transaction) => {
            return this.calculateStockDifference(accum, transaction, sku)
        }, initialStockLevel)
    }
    
    private calculateStockDifference (stockDifference: number, transaction: Transaction, sku: string) {
        if (transaction.sku !== sku) {
            return stockDifference
        }
        switch (transaction.type) {
            case TransactionTypes.Order:
                return stockDifference + transaction.qty
            case TransactionTypes.Refund:
                return stockDifference - transaction.qty
        }
    }
}
