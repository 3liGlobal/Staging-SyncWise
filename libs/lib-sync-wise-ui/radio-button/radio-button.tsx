import {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import {classNames} from '../../lib-sync-wise-utils';

export type RadioButtonProps = {
    label?: string;
    error?: string;
    showError?: boolean;
    options?: string[];
    extraClasses?: string;
    parentClasses?: string;
    layout?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function RadioButton({
                                label,
                                options = [],
                                id,
                                error,
                                showError = false,
                                extraClasses = '',
                                parentClasses = 'min-w-[200px]',
                                layout = 'flex',
                                ...otherProps
                            }: RadioButtonProps) {
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
                        <span className="text-orange-600 ml-1">*</span>
                    )}
                </label>
            )}
            <div className={layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-12' : 'flex flex-wrap gap-4'}>
                {options.map((item, index) => (
                    <div
                        key={index}
                        className={`flex gap-3 items-center  ${parentClasses}`}
                    >
                        <input
                            type="radio"
                            className={classNames(
                                'radio accent-primary-normal w-5 h-5 cursor-pointer',
                                extraClasses
                            )}
                            id={item}
                            {...otherProps}
                            value={item}
                            checked={otherProps.value === item}
                        />
                        <label
                            className="text-xl text-black cursor-pointer"
                            htmlFor={item}
                        >
                            {item}
                        </label>
                    </div>
                ))}
            </div>
            {showError && Boolean(error) && (
                <span className="text-red-600 text-xs 2xl:text-sm font-light 2xl:font-normal">
          {error}
        </span>
            )}
        </div>
    );
}
