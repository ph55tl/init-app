import { isPlainObject, isArray, camelCase, snakeCase } from 'lodash-es'
/**
 * 递归遍历
 * @param value
 * @param map 执行函数
 * @returns
 */
function deepMapKeys(value: unknown, map: (key: string) => string): unknown {
  if (isPlainObject(value)) {
    const obj = value as Record<string, unknown>
    const newObj: any = {}
    for (const [key, val] of Object.entries(obj)) {
      newObj[map(key)] = deepMapKeys(val, map)
    }
    return newObj
  } else if (isArray(value)) {
    const array = value
    return array.map((val: unknown) => deepMapKeys(val, map))
  } else {
    return value
  }
}
/**
 * 转化为驼峰
 * @param value
 * @returns
 */
function toCamelCase(value: unknown): any {
  return deepMapKeys(value, (key: string) => camelCase(key))
}
/**
 * 转化为蛇形
 * @param value
 * @returns
 */
function toSnakeCase(value: unknown): any {
  return deepMapKeys(value, (key: string) => snakeCase(key))
}

export { toCamelCase, toSnakeCase }
