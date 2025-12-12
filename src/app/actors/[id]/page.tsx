export default function ActorDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Actor Detail: {params.id}</h1>
    </div>
  )
}
