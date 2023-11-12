import { Op } from 'sequelize';

class Conditions {

  static queryWhereAnd(arrayValues: Array<Object>): Object {
    return {
      where: {
        [Op.and]: arrayValues
      }
    }
  }
  /**
   * Search for the value of the object passed as a parameter
   * @param values Search object { nameColum: value }
   * @returns Condition where
   */
  static queryWhere(values: Object): Object {
    return {
      where: values
    }
  }

  static queryWhereAndAttributes(values: Object, nameAttribute: string[]){
    return {
      attributes: nameAttribute,
      where: values
    }
  }
  /**
     * Consulta general con cualquier valor de la BD
     * @param condition
     * @param value
     * @returns
     */
  static buildCondition = (condition: string, value: number | string | any): Object => {
    const where: Object = { [condition]: value }
    return {
      where: where
    }
  }

  static inWhereSelect(arrayValues: Array<string | number>) {
    return {
      where: {
        id: arrayValues
      }
    }
  }

}
export default Conditions

