import { PicoPlaca } from './PicoPlaca';

describe('PicoPlaca', () => {
  describe('validatePlate', () => {
    const picoPlaca = new PicoPlaca();
    test('should return undefined if plate have 3 letter and 3 numbers', () => {
      expect(picoPlaca.validatePlate('ABC-123')).toBeUndefined();
    });

    test('should return undefined if plate have 3 letter and 4 numbers', () => {
      expect(picoPlaca.validatePlate('ABC-5093')).toBeUndefined();
    });

    test('should return undefined if plate is not separated by dash', () => {
      expect(picoPlaca.validatePlate('ABC5093')).toBeUndefined();
    });

    test('should return undefined if plate is pcp-2613', () => {
      expect(picoPlaca.validatePlate('pac-2613')).toBeUndefined();
    });

    test('should return undefined if plate is abc123', () => {
      expect(picoPlaca.validatePlate('abc123')).toBeUndefined();
    });

    test('should throw error if plate is not valid', () => {
      expect(() => picoPlaca.validatePlate('ABC50')).toThrowError();
    });
  });

  describe('getPlateLastDigit', () => {
    const picoPlaca = new PicoPlaca();
    test('should call validate plate format', () => {
      const validate = jest.spyOn(picoPlaca, 'validatePlate');
      picoPlaca.getPlateLastDigit('ABC-5093');
      expect(validate).toHaveBeenCalledWith('ABC-5093');
    });

    test('should return the last digit for ABC-5093', () => {
      const lastDigit = picoPlaca.getPlateLastDigit('ABC-5093');
      expect(lastDigit).toBe('3');
    });

    test('should return the last digit for ABC-5094', () => {
      const lastDigit = picoPlaca.getPlateLastDigit('ABC-5094');
      expect(lastDigit).toBe('4');
    });

    test('should return the last digit for ABC5094', () => {
      const lastDigit = picoPlaca.getPlateLastDigit('ABC5094');
      expect(lastDigit).toBe('4');
    });

    test('should return the last digit for ABC091', () => {
      const lastDigit = picoPlaca.getPlateLastDigit('ABC091');
      expect(lastDigit).toBe('1');
    });

    test('should return the last digit for abc091', () => {
      const lastDigit = picoPlaca.getPlateLastDigit('abc091');
      expect(lastDigit).toBe('1');
    });
  });

  describe('getDayOfTheWeek', () => {
    const picoPlaca = new PicoPlaca();

    test('should return 0 for 2022-01-16 (Sunday)', () => {
      expect(picoPlaca.getDayOfTheWeek('2022-01-16')).toBe(0);
    });

    test('should return 1 for 2022-01-17 (Monday)', () => {
      expect(picoPlaca.getDayOfTheWeek('2022-01-17')).toBe(1);
    });

    test('should return 2 for 2022-01-18 (Tuesday)', () => {
      expect(picoPlaca.getDayOfTheWeek('2022-01-18')).toBe(2);
    });

    test('should return 3 for 2022-01-19 (Wednesday)', () => {
      expect(picoPlaca.getDayOfTheWeek('2022-01-19')).toBe(3);
    });

    test('should return 4 for 2022-01-20 (Thursday)', () => {
      expect(picoPlaca.getDayOfTheWeek('2022-01-20')).toBe(4);
    });

    test('should return 5 for 2022-01-21 (Friday)', () => {
      expect(picoPlaca.getDayOfTheWeek('2022-01-21')).toBe(5);
    });

    test('should return 6 for 2022-01-22 (Saturday)', () => {
      expect(picoPlaca.getDayOfTheWeek('2022-01-22')).toBe(6);
    });
  });

  describe('isWeekend', () => {
    const picoPlaca = new PicoPlaca();
    test('should return true when day is Saturday', () => {
      expect(picoPlaca.isWeekend(6)).toBe(true);
    });

    test('should return true when day is Sunday', () => {
      expect(picoPlaca.isWeekend(0)).toBe(true);
    });

    test('should return true when day is Monday', () => {
      expect(picoPlaca.isWeekend(1)).toBe(false);
    });
  });

  describe('isPlateRestricted', () => {
    const picoPlaca = new PicoPlaca();
    test('should return false if it is Sunday', () => {
      expect(picoPlaca.isPlateRestricted('3', 0)).toBe(false);
    });

    test('should return false if it is Saturday', () => {
      expect(picoPlaca.isPlateRestricted('8', 6)).toBe(false);
    });

    test('should return true if it is Monday and plate is 1 or 2', () => {
      expect(picoPlaca.isPlateRestricted('1', 1)).toBe(true);
      expect(picoPlaca.isPlateRestricted('2', 1)).toBe(true);
      expect(picoPlaca.isPlateRestricted('6', 1)).toBe(false);
    });

    test('should return true if it is Tuesday and plate is 3 or 4', () => {
      expect(picoPlaca.isPlateRestricted('3', 2)).toBe(true);
      expect(picoPlaca.isPlateRestricted('4', 2)).toBe(true);
      expect(picoPlaca.isPlateRestricted('1', 2)).toBe(false);
    });

    test('should return true if it is Wednesday and plate is 5 or 6', () => {
      expect(picoPlaca.isPlateRestricted('5', 3)).toBe(true);
      expect(picoPlaca.isPlateRestricted('6', 3)).toBe(true);
      expect(picoPlaca.isPlateRestricted('9', 3)).toBe(false);
    });

    test('should return true if it is Thursday and plate is 7 or 8', () => {
      expect(picoPlaca.isPlateRestricted('7', 4)).toBe(true);
      expect(picoPlaca.isPlateRestricted('8', 4)).toBe(true);
      expect(picoPlaca.isPlateRestricted('2', 4)).toBe(false);
    });

    test('should return true if it is Friday and plate is 0 or 9', () => {
      expect(picoPlaca.isPlateRestricted('0', 5)).toBe(true);
      expect(picoPlaca.isPlateRestricted('9', 5)).toBe(true);
      expect(picoPlaca.isPlateRestricted('1', 5)).toBe(false);
    });
  });

  describe('isRestrictedByTime', () => {
    const picoPlaca = new PicoPlaca();
    test('should return true if time is between 7:00 and 9:30', () => {
      expect(picoPlaca.isRestrictedByTime('8:56')).toBe(true);
    });

    test('should return true if time is 7:00', () => {
      expect(picoPlaca.isRestrictedByTime('7:00')).toBe(true);
    });

    test('should return true if time is 9:30', () => {
      expect(picoPlaca.isRestrictedByTime('7:00')).toBe(true);
    });

    test('should return true if time is between 16:00 and 19:30', () => {
      expect(picoPlaca.isRestrictedByTime('17:45')).toBe(true);
    });

    test('should return true if time is 16:00', () => {
      expect(picoPlaca.isRestrictedByTime('16:00')).toBe(true);
    });

    test('should return true if time is 19:30', () => {
      expect(picoPlaca.isRestrictedByTime('19:30')).toBe(true);
    });

    test('should return false if time is before 7:00 and 9:30', () => {
      expect(picoPlaca.isRestrictedByTime('6:23')).toBe(false);
    });

    test('should return false if time is after 7:00 and 9:30', () => {
      expect(picoPlaca.isRestrictedByTime('13:48')).toBe(false);
    });

    test('should return false if time is before 16:00 and 19:30', () => {
      expect(picoPlaca.isRestrictedByTime('15:18')).toBe(false);
    });

    test('should return false if time is after 16:00 and 19:30', () => {
      expect(picoPlaca.isRestrictedByTime('19:36')).toBe(false);
    });
  });

  describe('canCirculate', () => {
    test('should call getPlateLastDigit', () => {
      const env = {
        plate: 'ABC-123',
        date: '2022-01-18',
        time: '18:32',
      };
      const picoPlaca = new PicoPlaca();
      const getLastDigit = jest.spyOn(picoPlaca, 'getPlateLastDigit');
      expect(picoPlaca.canCirculate(env)).toBe(false);
      expect(getLastDigit).toHaveBeenCalledWith('ABC-123');
    });

    test('should return true if it is Saturday', () => {
      const env = {
        plate: 'ABC-123',
        date: '2022-01-22',
        time: '18:32',
      };
      const picoPlaca = new PicoPlaca();
      expect(picoPlaca.canCirculate(env)).toBe(true);
    });
  });
});