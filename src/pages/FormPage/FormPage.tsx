import { FC } from "react";
import { ResponsivePageWrapper } from "../../utils/motionConfigurations";
import UserForm from "../../components/UserForm/UserForm";

interface FormPageProps {
  page: "login" | "register" | "create-post";
}

const FormPage: FC<FormPageProps> = ({ page }) => {
  return (
    <ResponsivePageWrapper>
      <UserForm title={page} />
    </ResponsivePageWrapper>
  );
};

export default FormPage;
