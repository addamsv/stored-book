import { Flex, IFlexProps } from "./Flex/Flex";

type IHFlexProps = Omit<IFlexProps, "direction">

export const HFlex = (props: IHFlexProps) => <Flex direction="row" {...props} />;
