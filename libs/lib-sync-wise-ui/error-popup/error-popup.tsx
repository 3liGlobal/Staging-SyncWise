import {useState} from "react";
import {Dialog} from "../dialog/dialog.tsx";
import errorIcon from "../../../src/assets/images/error.svg";
import {Button} from "../button/button.tsx";

export type Error = {
    message: string
};

export function ErrorPopup({message}: Error) {
    const [showDialog, setShowDialog] = useState(true);
    return (
        <Dialog show={showDialog} onClose={() => setShowDialog(false)} maxWidth="max-w-[500px]">
            <div className="w-full flex flex-col justify-center items-center gap-6 p-12">
                <img src={errorIcon} alt="error" className="w-20 h-20"/>
                <p>{message}</p>
                <Button
                    type='submit'
                    variant='primary'
                    onClick={() => setShowDialog(false)}
                    extraClasses="w-fit px-16 py-1"
                >
                    Ok
                </Button>
            </div>
        </Dialog>
    );
}