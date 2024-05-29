const Classes = {
  padding: {
    sm: "p-2",
    md: "p-4",
    lg: "p-8",
  },
  colors: {
    text: {
      black: "text-black",
      white: "text-white",
      primary: "text-sky-500",
      error: "text-red-500",
    },
    background: {
      primary: {
        "50": "bg-sky-50",
        "100": "bg-sky-100",
        "200": "bg-sky-200",
        "300": "bg-sky-300",
        "400": "bg-sky-400",
        "500": "bg-sky-500",
        "600": "bg-sky-600",
        "700": "bg-sky-700",
        "800": "bg-sky-800",
        "900": "bg-sky-900",
      },
    },
  },
  gap: {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-8",
  },
  height: {
    auto: "h-auto",
    screen: "h-screen",
    full: "h-full",
  },
  flex: {
    flex: "flex",
    flexDirection: {
      row: "flex-row",
      col: "flex-col",
    },
    items: {
      center: "items-center",
      start: "items-start",
      end: "items-end",
      between: "items-between",
      stretch: "items-stretch",
    },
    justify: {
      center: "justify-center",
      start: "justify-start",
      end: "justify-end",
      between: "justify-between",
      stretch: "justify-stretch",
    },
  },
  fontSize: {
    text: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
    },
    heading: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    },
  },
  weight: {
    light: "font-light",
    medium: "font-medium",
    bold: "font-bold",
  },
} as const;

export { Classes };
