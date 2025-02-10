import {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import {classNames} from '../../lib-sync-wise-utils';

export type PasswordFieldProps = {
    label?: string;
    optional?: boolean;
    error?: string;
    showError?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function TextField({
                              id,
                              label,
                              error,
                              optional = false,
                              showError = false,
                              ...otherProps
                          }: PasswordFieldProps) {
    const className =
        'block w-full rounded-lg border border-blue-950 py-2.5 px-3 placeholder:text-grey-600 placeholder:font-medium text-sm text-blue-950 outline-none';

    return (
        <div>
            {label && (
                <label
                    htmlFor={id}
                    className={classNames(
                        'block text-lg text-black font-medium mb-1 lg:mb-1.5 2xl:mb-2.5'
                    )}
                >
                    {label}
                    {otherProps.required && (
                        <span className="text-blue-950 ml-1">*</span>
                    )}
                    {optional && (
                        <span className="text-xs text-gray-600 opacity-50 ml-2">
              (Optional)
            </span>
                    )}
                </label>
            )}

            <input
                id={id}
                {...otherProps}
                className={classNames(
                    otherProps.readOnly && 'bg-grey-100 opacity-50',
                    className
                )}
            />
            {showError && Boolean(error) && (
                <span className="text-red-500 text-xs 2xl:text-sm font-light 2xl:font-normal">
          {error}
        </span>
            )}
        </div>
    );
}

export default TextField;