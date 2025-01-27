// 'use client';
//
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import {
//   imageGetList,
//   uploadImage,
//   deleteImage,
//   activateImage
// } from "@/app/[locale]/(dashboard)/(routes)/personalization/actions";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Upload, Trash2, CheckCircle } from "lucide-react";
//
// export default function ImageGallery() {
//   const [images, setImages] = useState<any[]>([]);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const { data: session } = useSession();
//
//   useEffect(() => {
//     if (session?.sessionToken) {
//       fetchImages();
//     }
//   }, [session]);
//
//   const fetchImages = async () => {
//     try {
//       const imageList = await imageGetList(session?.sessionToken);
//       setImages(imageList);
//     } catch (error) {
//       console.error("Rasmlarni olishda xatolik yuz berdi:", error);
//     }
//   };
//
//   const handleUpload = async () => {
//     if (!selectedFile || !session?.sessionToken) return;
//
//     try {
//       await uploadImage(session.sessionToken, selectedFile);
//       fetchImages();
//       setSelectedFile(null);
//     } catch (error) {
//       console.error("Rasm yuklashda xatolik yuz berdi:", error);
//     }
//   };
//
//   const handleDelete = async (imageId: number) => {
//     try {
//       await deleteImage(session?.sessionToken, imageId);
//       fetchImages();
//     } catch (error) {
//       console.error("Rasmni o'chirishda xatolik yuz berdi:", error);
//     }
//   };
//
//   const handleActivate = async (imageId: number) => {
//     try {
//       await activateImage(session?.sessionToken, imageId);
//       fetchImages();
//     } catch (error) {
//       console.error("Rasmni aktivatsiya qilishda xatolik yuz berdi:", error);
//     }
//   };
//
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>
//
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Upload New Image</h2>
//         <div className="flex items-center gap-4">
//           <Input
//             type="file"
//             onChange={(e) =>
//               setSelectedFile(e.target.files ? e.target.files[0] : null)
//             }
//           />
//           <Button onClick={handleUpload} disabled={!selectedFile}>
//             <Upload className="mr-2 h-4 w-4" /> Upload
//           </Button>
//         </div>
//       </div>
//
//       <div>
//         <h2 className="text-xl font-semibold mb-2">All Images</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {images.map((image) => {
//            return (
//               <Card key={image.id}>
//                 <img src={image.url} alt={`Image ${image.id}`} className="w-full h-auto"/>
//                 <CardContent>
//                   <h3 className="text-lg font-semibold">Image {image.id}</h3>
//                 </CardContent>
//                 <CardFooter className="flex gap-2">
//                   <Button
//                     onClick={() => handleActivate(image.id)}
//                     disabled={image.isActive !== 0}
//                   >
//                     <CheckCircle className="mr-2 h-4 w-4"/> {image.isActive === 0 ? "Active" : "Activate"}
//                   </Button>
//                   <Button onClick={() => handleDelete(image.id)} disabled={image.isActive !== 0}>
//
//                     <Trash2 className="mr-2 h-4 w-4"/> Delete
//                   </Button>
//                 </CardFooter>
//               </Card>
//           )})}
//         </div>
//       </div>
//     </div>
//   );
// }
//


"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import {
  imageGetList,
  uploadImage,
  deleteImage,
  activateImage,
} from "@/app/[locale]/(dashboard)/(routes)/personalization/actions"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Trash2, CheckCircle, ImageIcon } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { ImageSkeleton } from "@/components/image-skeleton"
import { useTranslations } from "next-intl"


export default function ImageGallery() {
  const [images, setImages] = useState<any[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { data: session } = useSession()
  const i = useTranslations("tutor")

  useEffect(() => {
    if (session?.sessionToken) {
      fetchImages()
    }
  }, [session])

  const fetchImages = async () => {
    setIsLoading(true)
    try {
      const imageList = await imageGetList(session?.sessionToken)
      setImages(imageList)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch images. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !session?.sessionToken) return

    try {
      await uploadImage(session.sessionToken, selectedFile)
      await fetchImages()
      setSelectedFile(null)
      toast({
        title: "Success",
        description: "Image uploaded successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (imageId: number) => {
    try {
      await deleteImage(session?.sessionToken, imageId)
      await fetchImages()
      toast({
        title: "Success",
        description: "Image deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete image. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleActivate = async (imageId: number) => {
    try {
      await activateImage(session?.sessionToken, imageId)
      await fetchImages()
      toast({
        title: "Success",
        description: "Image activated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to activate image. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6">{i("imagegallery")}</h1>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">{i("uploadnewimage")}</h2>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
            className="flex-grow"
          />
          <Button onClick={handleUpload} disabled={!selectedFile}>
            <Upload className="mr-2 h-4 w-4" /> {i("upload")}
          </Button>
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-4">{i("allimages")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => <ImageSkeleton key={index} />)
            : images.map((image) => (
              <Card key={image.id} className="flex flex-col overflow-hidden">
                <div className="relative aspect-square">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={`Image ${image.id}`}
                    className="w-full h-full object-cover"
                  />
                  {image.isActive !== 0 && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      {i("active")}
                    </div>
                  )}
                </div>
                <CardContent className="flex-grow p-4">
                  {/*<h3 className="text-lg font-semibold mb-2">Image {image.id}</h3>*/}
                  <p className="text-sm text-gray-600 truncate">{image.url}</p>
                </CardContent>
                <CardFooter className="flex justify-between p-4 bg-gray-50">
                  <Button
                    onClick={() => handleActivate(image.id)}
                    disabled={image.isActive !== 0}
                    variant={image.isActive !== 0 ? "outline" : "default"}
                    size="sm"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    {image.isActive === 0 ? i("activate") : i("active")}
                  </Button>
                  <Button
                    onClick={() => handleDelete(image.id)}
                    disabled={image.isActive !== 0}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> {i("delete")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
        {!isLoading && images.length === 0 && (
          <div className="text-center p-8 bg-gray-100 rounded-lg">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No images found</h3>
            <p className="text-gray-600">Upload your first image to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}

