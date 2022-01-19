import moment from 'moment';

interface Environment {
  plate: string,
  date: string,
  time: string,
}

const timeFormate = 'HH:mm';
const inclusivity = '[]';

export class PicoPlaca {

  validatePlate(plate: string) {
    if (!/^[A-Za-z]{3}(-?)\d{3,4}$/.test(plate))
      throw new Error(`Invalid plate formate ${plate}`);
    return;
  }

  getPlateLastDigit(plate: string) {
    this.validatePlate(plate);
    if (!plate.includes('-')) {
      return plate.substring(plate.length - 1);
    } 
    const [, numbers] = plate.split('-');
    return numbers.substring(numbers.length - 1);
  }

  getDayOfTheWeek(date: string) {
    return moment(date).day();
  }

  isWeekend(dayOfWeek: number) {
    return dayOfWeek === 0 || dayOfWeek === 6;
  }

  isPlateRestricted(lastDigit: string, dayOfWeek: number) {
    if (this.isWeekend(dayOfWeek)) {
      return false;
    }
    const mapping: {[dayOfWeek: number]: string[]} = {
      1: ['1', '2'],
      2: ['3', '4'],
      3: ['5', '6'],
      4: ['7', '8'],
      5: ['0', '9'],
    };
    return mapping[dayOfWeek].includes(lastDigit);
  }

  isRestrictedByTime(time: string) {
    const currentTime = moment(time, timeFormate);
    const morningStart = moment('07:00', timeFormate);
    const morningEnd = moment('09:30', timeFormate);
    const afternoonStart = moment('16:00', timeFormate);
    const afternoonEnd = moment('19:30', timeFormate);
    return currentTime.isBetween(morningStart, morningEnd, undefined, inclusivity) ||
      currentTime.isBetween(afternoonStart, afternoonEnd,  undefined, inclusivity);
  }

  canCirculate ({ plate, date, time }: Environment): boolean {
    const lastDigit = this.getPlateLastDigit(plate);
    const dayOfWeek = this.getDayOfTheWeek(date);
    if (this.isPlateRestricted(lastDigit, dayOfWeek)) {
      return !this.isRestrictedByTime(time);
    }
    return true;
  }

}
