type BaseProps = {
  children: React.ReactNode;
};

type FlexProps =
  | {
      flex: true;
      flexDirection: keyof typeof Classes.flexDirection;
      items: keyof typeof Classes.items;
      justify: keyof typeof Classes.justify;
      gap?: keyof typeof Classes.gap;
    }
  | {
      flex?: false;
      flexDirection?: never;
      items?: never;
      justify?: never;
    };

type StyleProps = FlexProps & {
  height?: keyof typeof Classes.height;
  background?: keyof typeof Classes.background;
};

type BoxProps = BaseProps & StyleProps;

const Classes = {
  flexDirection: {
    row: "flex-row",
    col: "flex-col",
  },
  items: {
    center: "items-center",
    start: "items-start",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
  },
  justify: {
    center: "justify-center",
    start: "justify-start",
    end: "justify-end",
    spaceBetween: "justify-space-between",
    spaceAround: "justify-space-around",
    spaceEvenly: "justify-space-evenly",
  },
  height: {
    auto: "h-auto",
    full: "h-full",
    screen: "h-screen",
  },
  gap: {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-8",
  },
  background: {
    primary: "bg-sky-50",
  },
} as const;

const loadClasses = (props: StyleProps) => {
  const classes = [];
  if (props.flex) {
    classes.push("flex");
    props.flex &&
      props.flexDirection &&
      classes.push(Classes.flexDirection[props.flexDirection]);
    props.flex && props.items && classes.push(Classes.items[props.items]);
    props.flex && props.justify && classes.push(Classes.justify[props.justify]);
    props.flex && props.gap && classes.push(Classes.gap[props.gap]);
  }

  props.height && classes.push(Classes.height[props.height]);

  props.background && classes.push(Classes.background[props.background]);

  return classes.join(" ");
};

const Box = ({ children, ...props }: BoxProps) => {
  const classes = loadClasses(props);
  return <div className={classes}>{children}</div>;
};

export { Box };
