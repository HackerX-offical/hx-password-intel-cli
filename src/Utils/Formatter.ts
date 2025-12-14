export class Formatter {
  public static formatDuration(seconds: number): string {
    if (seconds < 1) return "Instantly";
    if (seconds === Infinity) return "Centuries";

    const years = seconds / (3600 * 24 * 365);
    if (years >= 100) return "Centuries";
    if (years >= 1) return `${years.toFixed(1)} years`;

    const days = seconds / (3600 * 24);
    if (days >= 1) return `${days.toFixed(1)} days`;

    const hours = seconds / 3600;
    if (hours >= 1) return `${hours.toFixed(1)} hours`;

    const minutes = seconds / 60;
    if (minutes >= 1) return `${minutes.toFixed(1)} minutes`;

    return `${seconds.toFixed(0)} seconds`;
  }
}
