export class Numbers
{
  /**
   * Given a string or number, ensure that it is accurately converted
   * to a float value with no more than two decimal places.
   *
   * @param value
   */
  public static convertToDecimal(value: string | number, precision: number = 2): number
  {
    let floatValue: number;

    if (typeof value === 'string') {
      value = value.replace(/[^0-9\.]/g, '');
      floatValue = parseFloat(value);
    } else {
      floatValue = value;
    }

    const result: number = parseFloat(floatValue.toFixed(precision));

    return result;
  }
}
