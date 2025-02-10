import {Fragment, ReactNode} from 'react';
import {Dialog as HeadlessDialog, Transition} from '@headlessui/react';
import {classNames} from '../../lib-sync-wise-utils';

export type DialogProps = {
    show?: boolean;
    onClose?: () => void;
    dialogClass?: string;
    children?: ReactNode | ReactNode[];
    maxWidth?: string;
};

export function Dialog({
                           show,
                           onClose,
                           children,
                           dialogClass,
                           maxWidth = 'max-w-[1400px]',
                       }: DialogProps) {
    return (
        <Transition.Root show={show} as={Fragment}>
            <HeadlessDialog
                as="div"
                className="relative z-20"
                onClose={() => onClose?.()}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-[#F1F3FF] bg-opacity-80"/>
                </Transition.Child>

                <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <HeadlessDialog.Panel
                                className={classNames(
                                    dialogClass ?? '',
                                    `!overflow-visible relative ${maxWidth} bg-white text-left shadow-xl border border-primary-normal min-h-full transition-all w-full`
                                )}
                            >
                                {children}
                            </HeadlessDialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </HeadlessDialog>
        </Transition.Root>
    );
}
