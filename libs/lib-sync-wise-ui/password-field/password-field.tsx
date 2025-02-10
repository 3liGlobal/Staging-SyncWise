import { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';
import { classNames } from '../../lib-sync-wise-utils';
export type TextFieldProps = {
  label?: string;
  error?: string;
  showError?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function PasswordField({
                                  id,
                                  label,
                                  error,
                                  showError = false,
                                  ...otherProps
                                }: TextFieldProps) {
  const className =
    'block w-full rounded-lg border py-2.5 px-5 focus-visible:border border-blue-950 text-sm text-blue-950 outline-none placeholder:text-grey-600 placeholder:font-medium  ';

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={classNames(
            'block text-lg text-blue-950 mb-1 lg:mb-1.5 2xl:mb-2.5'
          )}
        >
          {label}
          {otherProps.required && (
            <span className="text-blue-950 ml-1">*</span>
          )}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          {...otherProps}
          type={showPassword ? 'text' : 'password'}
          className={ className}
        />
        <div className="absolute h-full top-0 right-2 lg:right-3 xl:right-4 cursor-pointer flex items-center">
          
        <svg
            className={'w-5'}
            onClick={() => setShowPassword(!showPassword)}
            width="24"
            height="24"
            viewBox="0 0 50 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            { showPassword ? (
                <>
                    <path d="M4.16699 4.18152L45.8337 45.8482" stroke="#4A445C" strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.9853 14.0203C7.6353 18.3383 4.16699 25.0149 4.16699 25.0149C4.16699 25.0149 11.7427 39.5982 25.0003 39.5982C29.2718 39.5982 32.9532 38.0844 35.9818 36.0324M22.917 10.5528C23.5949 10.4735 24.2895 10.4315 25.0003 10.4315C38.2578 10.4315 45.8337 25.0149 45.8337 25.0149C45.8337 25.0149 44.3924 27.7892 41.667 30.918" stroke="#4A445C" strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M29.1667 29.6724C28.0608 30.662 26.6008 31.2638 25 31.2638C21.5481 31.2638 18.75 28.4657 18.75 25.0138C18.75 23.2978 19.4415 21.7434 20.5611 20.614" stroke="#4A445C" strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round" />
                </>
            ) : (
                <>
                  <path d="M13.9853 14.0203C7.6353 18.3383 4.16699 25.0149 4.16699 25.0149C4.16699 25.0149 11.7427 39.5982 25.0003 39.5982C29.2718 39.5982 32.9532 38.0844 35.9818 36.0324M22.917 10.5528C23.5949 10.4735 24.2895 10.4315 25.0003 10.4315C38.2578 10.4315 45.8337 25.0149 45.8337 25.0149C45.8337 25.0149 44.3924 27.7892 41.667 30.918" stroke="#4A445C" strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="25" cy="25" r="6" stroke="#4A445C" strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </>
            ) }
        </svg>


           


        </div>
      </div>

      {showError && Boolean(error) && (
        <span className="text-red-500 text-xs 2xl:text-sm font-light 2xl:font-normal">
          {error}
        </span>
      )}
    </div>
  );
}