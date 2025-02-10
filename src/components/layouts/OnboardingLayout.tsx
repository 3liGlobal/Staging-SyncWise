import {useState} from "react";
import {Outlet} from "react-router-dom";
import {Dialog} from "../../../libs/lib-sync-wise-ui";
import useProfileForm from "../../features/onboarding/hooks/useProfileForm.tsx";


export default function OnboardingLayout() {
    const formik= useProfileForm();
    const [showDialog] = useState(true);

    return (
        <Dialog show={showDialog}>
            <Outlet context={formik} />
        </Dialog>
    );
}
