import {ReactNode} from 'react';
import {Button} from '../../../../libs/lib-sync-wise-ui';
import {useLocation, useNavigate} from 'react-router-dom';

export type BaseOnboardingFormProps = {
  formik: any;
  children?: ReactNode | ReactNode[];
  nextStepURl: string;
};
export default function OnBoardingForm(props: BaseOnboardingFormProps) {
  const { children, formik, nextStepURl } = props;
  const isLastForm = useLocation().pathname === '/onboarding/role';
  const navigate = useNavigate();

  return (
    <form
      onSubmit={
        isLastForm
          ? formik.handleSubmit
          : () => {
              navigate(nextStepURl);
            }
      }
      className="flex w-full max-w-xl flex-col gap-12 justify-center items-center mx-auto px-5 pb-12 lg:p-5"
    >
      {children}
      <Button
        disabled={formik.isSubmitting || !formik.isValid}
        extraClasses="justify-center w-full md:w-fit md:px-12 ml-auto"
        variant="primary"
        type={isLastForm ? 'submit' : 'button'}
        onClick={() => {
          navigate(nextStepURl);
        }}
      >
        {isLastForm ? (formik.isSubmitting ? 'Saving...' : 'Save') : 'Next'}
      </Button>
    </form>
  );
}
