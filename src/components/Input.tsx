import React from "react"


export const Input = ({name, type, value, onChange, id, required, placeholder}: {placeholder?: string, required: boolean, name: string, type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void, id: string}) => {
    return <input className="px-4 rounded-full shadow-inner w-80 border-primary-text bg-input-gray h-12" type={type} placeholder={placeholder} name={name} value={value} onChange={(e) => onChange(e)} id={id} required={required} />
}