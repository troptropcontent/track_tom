import { Classes } from "../constants";

type HeadingProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: keyof typeof Classes.size;
  weight?: keyof typeof Classes.weight;
};

const DefaultStyles: {
  [key in NonNullable<HeadingProps["as"]>]: {
    size: keyof typeof Classes.size;
    weight: keyof typeof Classes.weight;
  };
} = {
  h1: {
    size: "4xl",
    weight: "bold",
  },
  h2: {
    size: "3xl",
    weight: "bold",
  },
  h3: {
    size: "2xl",
    weight: "bold",
  },
  h4: {
    size: "xl",
    weight: "bold",
  },
  h5: {
    size: "lg",
    weight: "bold",
  },
  h6: {
    size: "md",
    weight: "bold",
  },
} as const;

const Heading = ({ children, ...props }: HeadingProps) => {
  const Tag = props.as || "h1";
  const size = props.size || DefaultStyles[Tag].size;
  const weight = props.weight || DefaultStyles[Tag].weight;
  const classes = [Classes.size[size], Classes.weight[weight]];

  return <Tag className={classes.join(" ")}>{children}</Tag>;
};

export { Heading };
