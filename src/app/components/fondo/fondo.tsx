import Image from 'next/image'
 
export default function Fondo() {
  return (
    <Image
          alt="fondo"
          src={"/imagenes/fondo_mine.jpg"}
          className="imagen blur-sm"
          // width={"560"}
          //height={"200"}
          fill={true}
        />
  )
}