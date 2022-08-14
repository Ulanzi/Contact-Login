export type FieldValidatorType = (value: string) => string | undefined

/*функция про обязательное поле*/
export const required: FieldValidatorType = (value) => {
    if (value) return undefined;
    return "Field is required";
}

