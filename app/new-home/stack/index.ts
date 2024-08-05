import Default, { Content, Header } from "./ui/stack";

type StackExtension = {
  Content: typeof Content;
  Header: typeof Header;
};
const Stack = Default as typeof Default & StackExtension;
Stack.Content = Content;
Stack.Header = Header;

export { Stack };
