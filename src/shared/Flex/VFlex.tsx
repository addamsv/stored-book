import { Flex, IFlexProps } from "./Flex/Flex";

type IVFlexProps = Omit<IFlexProps, "direction">

export const VFlex = (props: IVFlexProps) => {
  const { align = "start" } = props;
  return <Flex direction="column" {...props} align={align} />;
};
