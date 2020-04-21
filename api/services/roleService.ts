import { Role } from "../db/models/Role";
import { listFilter } from '../interface/common'; // eslint-disable-line
import { _getListWithCount } from '../repositories';

/**
 * getRoleList: Used to get roles with count
 * @param query
 */
export const getRoleList = async (query: listFilter) => {
  try {
    const { limit, sortBy, order } = query;
    const queryString = {
      where: { status: true, isDeleted: false },
      limit,
      order: [[sortBy, order]],
    };   
    return await _getListWithCount(Role, queryString);
  } catch (err) {
    return err;
  }
}
