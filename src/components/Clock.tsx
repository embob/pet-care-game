export const Clock = ({value}: {value: Date}) => {
  return (
    <time className="text-9xl">{value.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</time>
  )
}