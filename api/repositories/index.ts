/**
 * @author: Monty Khanna
 */
export const _getByPk = async (table: any, id: number) => await table.findByPk(id);

export const _getOne = async (table: any, query: any) => await table.findOne(query);

export const _getList = async (table: any, query: any) => await table.findAll(query);

export const _getListWithCount = async (table: any, query: any) => await table.findAndCountAll(query);

export const _add = async (table: any, payload: any, options: any) => await table.create(payload, options);

export const _update = async (table: any, payload: any, queryString: any) => await table.update(payload, queryString);

export const _delete = async (table: any, queryString: any) => await table.destroy(queryString);