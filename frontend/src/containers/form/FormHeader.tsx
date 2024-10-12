import {Typography} from "@material-tailwind/react";

function FormHeader({text}: { text: string }) {
  return (
    <Typography variant={'h2'} color={'white'} className={'w-fit p-1 font-normal my-8'}>
      {text}
    </Typography>
  )
}

export default FormHeader;