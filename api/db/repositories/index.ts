/**
 * @author: Monty Khanna
 */
export const _getList = async (table: any, query: any) => await table.findAll(query);

export const _getListWithCount = async (table: any, query: any) => await table.findAndCountAll(query);

export const _add = async (table: any, query: any) => await table.create(query);

export const _update = async (table: any, payload: any, queryString: any) => await table.update(payload, queryString);

export const _delete = async (table: any, queryString: any) => await table.destroy(queryString);