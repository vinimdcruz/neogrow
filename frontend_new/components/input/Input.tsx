import { RegisterOptions, UseFormRegister } from 'react-hook-form'
interface InputProps{
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>
  errors?: string;
  rykes?: RegisterOptions;
}

export function Input({ name, placeholder, type, register, rules, error }: InputProps){
  return(
    <div>
      <input
        className="w-full border-1 rounded-md h-11 px-2"
        placeholder={placeholder}
        type={type}
        {...register(name, rules)}
        id={name}
        />
        {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}