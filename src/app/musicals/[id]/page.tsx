export default function MusicalDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Musical Detail: {params.id}</h1>
    </div>
  )
}
