import ProductStockLevel from './ProductStockLevel'

export default interface StockLevels {
    [sku: string]: ProductStockLevel
}