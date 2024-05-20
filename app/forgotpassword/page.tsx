import getCurrentUser from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import PasswordForm from "./PasswordForm";

const ForgotPassword = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <PasswordForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default ForgotPassword;
