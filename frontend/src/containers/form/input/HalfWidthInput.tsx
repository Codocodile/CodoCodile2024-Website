function HalfWidthInput({label, name, placeholder, id, type}: {
  label: string,
  name: string,
  placeholder: string,
  id: string,
  type: 'text' | 'password' | 'email'

}) {
  return (
    <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
      <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
             htmlFor={id}>
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        id={id} type={type} placeholder={placeholder} required={true} name={name}/>
    </div>
  )
}

export default HalfWidthInput;