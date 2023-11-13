"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Conditions {
    static queryWhereAnd(arrayValues) {
        return {
            where: {
                [sequelize_1.Op.and]: arrayValues
            }
        };
    }
    /**
     * Search for the value of the object passed as a parameter
     * @param values Search object { nameColum: value }
     * @returns Condition where
     */
    static queryWhere(values) {
        return {
            where: values
        };
    }
    static queryWhereAndAttributes(values, nameAttribute) {
        return {
            attributes: nameAttribute,
            where: values
        };
    }
    static inWhereSelect(arrayValues) {
        return {
            where: {
                id: arrayValues
            }
        };
    }
}
/**
   * Consulta general con cualquier valor de la BD
   * @param condition
   * @param value
   * @returns
   */
Conditions.buildCondition = (condition, value) => {
    const where = { [condition]: value };
    return {
        where: where
    };
};
exports.default = Conditions;
