import { NativeModules } from "react-native";
export const getIP = async () => {
  const { SourceCode } = NativeModules;
  const { scriptURL } = SourceCode;
  const host = scriptURL?.split('://')[1].split(':')[0];
  console.log(host);
  return host;
};
export const IPAdd = async () => {
  return await getIP();
}
