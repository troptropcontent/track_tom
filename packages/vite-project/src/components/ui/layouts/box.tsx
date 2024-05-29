import { Classes } from "../constants";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  as?:
    | "ul"
    | "li"
    | "div"
    | "section"
    | "article"
    | "main"
    | "aside"
    | "footer"
    | "header"
    | "nav"
    | "section"
    | "span"
    | "template"
    | "textarea"
    | "video";
};

type FlexProps =
  | {
      flex: true;
      flexDirection: keyof typeof Classes.flex.flexDirection;
      items?: keyof typeof Classes.flex.items;
      justify?: keyof typeof Classes.flex.justify;
      gap?: keyof typeof Classes.gap;
    }
  | {
      flex?: false;
      flexDirection?: never;
      items?: never;
      justify?: never;
      gap?: never;
    };

type StyleProps = FlexProps & {
  height?: keyof typeof Classes.height;
  background?: keyof typeof Classes.colors;
  padding?: keyof typeof Classes.padding;
};

type BoxProps = BaseProps & StyleProps;

const loadClasses = (props: StyleProps) => {
  const classes = [];
  if (props.flex) {
    classes.push("flex");
    props.flex &&
      props.flexDirection &&
      classes.push(Classes.flex.flexDirection[props.flexDirection]);
    props.flex && props.items && classes.push(Classes.flex.items[props.items]);
    props.flex &&
      props.justify &&
      classes.push(Classes.flex.justify[props.justify]);
    props.flex && props.gap && classes.push(Classes.gap[props.gap]);
  }

  props.height && classes.push(Classes.height[props.height]);

  props.background && classes.push(Classes.colors[props.background]);

  props.padding && classes.push(Classes.padding[props.padding]);

  return classes.join(" ");
};

const Box = ({ children, className, as = "div", ...props }: BoxProps) => {
  let classes = loadClasses(props);
  const Tag = as;
  if (className) {
    classes += ` ${className}`;
  }
  return <Tag className={classes}>{children}</Tag>;
};

export { Box };
