export default class SKUNotFound extends Error {
    constructor () {
        super()
        this.name = this.constructor.name
    }
}