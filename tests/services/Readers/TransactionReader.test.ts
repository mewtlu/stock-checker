import { resolve } from 'path'
import StockReader from '../../../src/services/Readers/StockReader'


test('should throw an error for an invalid input file', () => {
    expect(() => {
        StockReader.parseInputFiles(resolve(__dirname, './fake-file.json'))
    })
        .toThrow(Error)
})

test('should throw an error for an input file containing invalid JSON', () => {
    expect(() => {
        StockReader.parseInputFiles(resolve(__dirname, '../../../data/invalid-json.json'))
    })
        .toThrow(Error)
})
