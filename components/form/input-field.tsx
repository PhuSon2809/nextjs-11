import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

// FieldValues là 1 obj sẽ nhận vào kiểu dữ liệu theo cặp key(string) - value(any)
export type InputFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
};

export function InputField<T extends FieldValues>({
  name,
  label,
  control,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  ref: externalRef,
  value: externalValue,
  ...rest
}: InputFieldProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      label={label}
      name={name}
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        externalOnChange?.(event);
      }}
      onBlur={onBlur}
      inputRef={ref}
      error={!!error}
      helperText={error?.message}
      {...rest}
    />
  );
}
