export function getFormattedDateWithTimeZone(unixTimestamp: number, timezoneOffset: number): string {
    const adjustedDate = convertUnixToDateWithTimeZone(unixTimestamp, timezoneOffset);
  
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    return `${daysOfWeek[adjustedDate.getUTCDay()]}, ${months[adjustedDate.getUTCMonth()]} ${adjustedDate.getUTCDate()}, ${adjustedDate.getUTCFullYear()}`;
}

export function convertUnixToDateWithTimeZone(unixTimestamp: number, timezoneOffset: number): Date {
    const adjustedTimestamp = unixTimestamp * 1000 + timezoneOffset * 1000; // Convertendo segundos para milissegundos
    return new Date(adjustedTimestamp);
  }