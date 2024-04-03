/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ArgumentUpdateFormInputValues = {
    title?: string;
    arguments?: string[];
    description?: string;
    aiarguments?: string;
    strength?: number;
    public?: boolean;
    image?: string;
};
export declare type ArgumentUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    arguments?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    aiarguments?: ValidationFunction<string>;
    strength?: ValidationFunction<number>;
    public?: ValidationFunction<boolean>;
    image?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ArgumentUpdateFormOverridesProps = {
    ArgumentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    arguments?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    aiarguments?: PrimitiveOverrideProps<TextFieldProps>;
    strength?: PrimitiveOverrideProps<TextFieldProps>;
    public?: PrimitiveOverrideProps<SwitchFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ArgumentUpdateFormProps = React.PropsWithChildren<{
    overrides?: ArgumentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    argument?: any;
    onSubmit?: (fields: ArgumentUpdateFormInputValues) => ArgumentUpdateFormInputValues;
    onSuccess?: (fields: ArgumentUpdateFormInputValues) => void;
    onError?: (fields: ArgumentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ArgumentUpdateFormInputValues) => ArgumentUpdateFormInputValues;
    onValidate?: ArgumentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ArgumentUpdateForm(props: ArgumentUpdateFormProps): React.ReactElement;
