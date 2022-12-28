/**
 * Pagination - paginate incoming data from a fetch request
 * @param page number
 * @param limit number
 * @param total number
 * @param data any
 * @returns Paginate
 * @example
 * const paginate = new Paginate(1, 10, 100, data)
 */
export default class Pagination {
  page: number
  limit: number
  total: number
  data: any
  constructor(page: number, limit: number, total: number, data: any) {
    this.page = page
    this.limit = limit
    this.total = total
    this.data = data
  }

  /**
   * getPagination - get pagination data
   * @returns Paginate
   * @example
   * paginate.getPaginate()
   * // returns { page: 1, limit: 10, total: 100, data: [] }
   */
  public getPagination() {
    return {
      page: this.page,
      limit: this.limit,
      total: this.total,
      data: this.data
    }
  }

  /**
   * setOffset - set offset
   * @param offset number
   * @returns Paginate
   */
  public setOffset(offset: number) {
    this.page = offset
    return this
  }
}
