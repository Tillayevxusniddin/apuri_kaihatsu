import Image from "next/image"

interface Media {
  id: number
  imageUrl: string
  videoUrl: string
  title: string
  description: string
}

interface MediaCardProps {
  media: Media
  onUpdate: () => void
  onDelete: () => void
}

export default function MediaCard({ media, onUpdate, onDelete }: MediaCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={media.imageUrl || "/placeholder.svg"}
        alt={media.title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{media.title}</h3>
        <p className="text-gray-600 mb-4">{media.description}</p>
        <div className="flex justify-between">
          <button onClick={onUpdate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Update
          </button>
          <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

