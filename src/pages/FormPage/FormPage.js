import { jsx as _jsx } from "react/jsx-runtime";
import { ResponsivePageWrapper } from "../../utils/motionConfigurations";
import UserForm from "../../components/UserForm";
const FormPage = ({ page }) => {
  return _jsx(ResponsivePageWrapper, {
    children: _jsx(UserForm, { title: page }),
  });
};
export default FormPage;
