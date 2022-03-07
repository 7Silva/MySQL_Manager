'use strict';

import { QueryTypes } from 'sequelize';

class QueryManager {
  static async selectValues(database, tableName, params)  {
    try {
      if (database == 'Error 1001') return 'Error 1001';
      if (!tableName || typeof tableName !== 'string') return 'Error 1003';
      
      if (!Object.keys(params).length) return await database.query(`SELECT * FROM \`${tableName}\``, { type: QueryTypes.SELECT });
      else return await database?.query(`SELECT * FROM \`${tableName}\` WHERE ${Object.entries(params)
        .map(([key, value]) => `\`${tableName}\`.\`${key}\` = '${value}'`)
        .join(' AND ')}`, { type: QueryTypes.SELECT });
    } catch (error) {
      if (error?.original?.code == 'ER_NO_SUCH_TABLE') return 'Error 1002';
      if (error?.original?.code == 'ER_BAD_FIELD_ERROR') return 'Error 1002';
      console.error(error);
    }
  }
  
  static async insertValues(database, tableName, columns, values) {
    if (database == 'Error 1001') return 'Error 1001';
    if (!tableName || typeof tableName !== 'string') return 'Error 1002';
    if ((!Array.isArray(columns) && !columns.length) || (!Array.isArray(values) && !values.length)) return 'Error 1003';
    if ((columns.length !== values.length) || (values.length !== columns.length)) return 'Error 1004';
    
    try {
      await database.query(
        `INSERT INTO \`${tableName}\``+
          `(${columns.map(i => String(`\`${i}\``)).join(',')}) ` +
          `VALUES (${values.map(i => String(`'${i}'`)).join(',')})`,
        { type: QueryTypes.INSERT });
        
      return 'Success';
    } catch(error) {
      switch(error?.original?.code) {
        case 'ER_NO_SUCH_TABLE': return 'Error 1002'; break;
        
        case 'ER_NO_DEFAULT_FOR_FIELD':
        case 'ER_WRONG_VALUE_COUNT_ON_ROW':
        case 'ER_DUP_ENTRY':
          return 'Error 1003'; break;
          
        default: console.error(error); break;
      }
    }
  }
  
  static async deleteValues(database, tableName, value) {
    if (database == 'Error 1001') return 'Error 1001';
    if (!tableName || typeof tableName !== 'string') return 'Error 1003';
    if (!value || !Object.keys(value).length) return 'Error 1003';
    
    try {
      await database.query(`DELETE FROM \`${tableName}\` WHERE ${Object.entries(value ?? {})
        .map(([key, value]) => `\`${tableName}\`.\`${key}\` = ${value}`)
        .join('')}`);
        
      return 'Success';
    } catch(error) {
      console.error(error);
      if (error?.original?.code == 'ER_NO_SUCH_TABLE') return 'Error 1002';
    }
  }
}

export default QueryManager;