import { Router, type RouterProps } from "react-router-dom";

export interface IZRouterProps extends RouterProps {}

export function ZTestRouter(props: IZRouterProps) {
  return <Router {...props} />;
}
