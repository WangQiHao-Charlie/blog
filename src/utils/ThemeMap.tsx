// utils/ThemeMap.ts
export function getThemeFromTemperature(temp: number): string {
  if (temp >= 30) return "summer";
  if (temp <= 10) return "winter";
  return "spring";
}

export const ThemeColorMap: Record<string, {
  bg: string;
  text: string;
  badge: string;
}> = {
  summer: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    badge: "badge-warning"
  },
  winter: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    badge: "badge-info"
  },
  spring: {
    bg: "bg-green-100",
    text: "text-green-700",
    badge: "badge-success"
  }
};
