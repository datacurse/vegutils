export default function Separator({ vertical = false }: { vertical?: boolean }) {
  if (vertical)
    return <div className="border-r-[1px] border-border" />
  else
    return <div className="border-b-[1px] border-border" />
}

