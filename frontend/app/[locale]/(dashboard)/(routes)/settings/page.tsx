// "use client"
//
// import { useState } from "react";
// import {deleteImage, uploadImage, updateImage} from "@/app/[locale]/(dashboard)/(routes)/settings/actions";
// import {useSession} from "next-auth/react";
// // import { uploadImage, updateImage, deleteImage } from "./action"; // action.ts dan import qilingan
//
// const Page = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [imageId, setImageId] = useState<number | null>(null); // Yangilanish uchun image ID
//   const [imageUrl, setImageUrl] = useState<string | null>(null); // Rasm URL si
//
//   const { data: session } = useSession();
//   // Yangi rasmni yuklash
//   const handleUpload = async () => {
//     if (!selectedFile) return;
//     try {
//       const uploadedImage = await uploadImage(session?.sessionToken ,selectedFile);
//       setImageUrl(uploadedImage.url); // Yuklangan rasmni ko'rsatish
//       alert("Rasm muvaffaqiyatli yuklandi.");
//     } catch (err) {
//       alert("Rasmni yuklashda xatolik yuz berdi.");
//     }
//   };
//
//   // Rasmni yangilash
//   const handleUpdate = async () => {
//     if (!selectedFile || !imageId) return;
//     try {
//       const updatedImage = await updateImage(session?.sessionToken ,imageId, selectedFile);
//       setImageUrl(updatedImage.url); // Yangilangan rasmni ko'rsatish
//       alert("Rasm muvaffaqiyatli yangilandi.");
//     } catch (err) {
//       alert("Rasmni yangilashda xatolik yuz berdi.");
//     }
//   };
//
//   // Rasmni o'chirish
//   const handleDelete = async () => {
//     if (!imageId) return;
//     try {
//       await deleteImage(session?.sessionToken ,imageId);
//       setImageUrl(null); // Rasmni o'chirish
//       setImageId(null); // ID ni bo'shatish
//       alert("Rasm muvaffaqiyatli o'chirildi.");
//     } catch (err) {
//       alert("Rasmni o'chirishda xatolik yuz berdi.");
//     }
//   };
//
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Rasmni boshqarish</h1>
//
//       {/* Rasmni ko'rsatish */}
//       {imageUrl && (
//         <div>
//           <img src={imageUrl} alt="Uploaded" style={{ width: "300px", marginBottom: "20px" }} />
//           <div>ID: {imageId}</div>
//         </div>
//       )}
//
//       {/* Rasmni yuklash */}
//       <div>
//         <input
//           type="file"
//           onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
//           accept="image/*"
//         />
//         <button onClick={handleUpload}>Rasmni yuklash</button>
//       </div>
//
//       {/* Yangilash uchun rasm IDni kiritish */}
//       {imageUrl && (
//         <div>
//           <h3>Rasmni yangilash</h3>
//           <input
//             type="number"
//             placeholder="Yangilamoqchi bo'lgan rasm ID"
//             onChange={(e) => setImageId(Number(e.target.value))}
//             value={imageId || ""}
//           />
//           <button onClick={handleUpdate}>Yangilash</button>
//         </div>
//       )}
//
//       {/* O'chirish */}
//       {imageUrl && (
//         <div style={{ marginTop: "20px" }}>
//           <button onClick={handleDelete} style={{ color: "red" }}>
//             O&apos;chirish
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default Page;
//
//


'use client'

import { useState, useEffect } from 'react'
// import { imageGetList, uploadImage, updateImage, deleteImage } from './action'
import {
  deleteImage,
  uploadImage,
  updateImage,
  getImageDetails,
  imageGetList
} from "@/app/[locale]/(dashboard)/(routes)/settings/actions";

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Upload, RefreshCw } from 'lucide-react'
import { useSession } from "next-auth/react"

export default function ImageGallery() {
  const [images, setImages] = useState<any>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.sessionToken) {
        await fetchImages();
      }
      setIsLoading(false); // Set loading to false after session and images are fetched
    }

    fetchData();
    console.log(images)
  }, [session]);


  if (isLoading) {
    return <div>Loading...</div>; // Show loading until session is available
  }



  // Rasmlarni olish
  const fetchImages = async () => {
    // if (!session?.sessionToken) return
    try {
      const imageList = await imageGetList(session?.sessionToken)
      setImages(imageList)
    } catch (error) {
      console.error("Rasmlarni olishda xatolik yuz berdi:", error)
    }
  }

  // const fetchImageDetails = async (imageId: number) => {
  //   try {
  //     const imageDetails = await getImageDetails(session?.sessionToken, imageId);
  //     console.log(imageDetails); // Rasm detallari konsolda ko'rsatiladi
  //   } catch (error) {
  //     console.error("Rasm detallari olishda xatolik yuz berdi:", error);
  //     alert("Rasm ma'lumotlarini olishda xatolik yuz berdi.");
  //   }
  // };


  // Rasm yuklash
  const handleUpload = async () => {
    if (!selectedFile || !session?.sessionToken) return
    try {
      await uploadImage(session.sessionToken, selectedFile)
      fetchImages()
      setSelectedFile(null)
      alert("Rasm muvaffaqiyatli yuklandi.")
    } catch (error) {
      console.error("Rasm yuklashda xatolik yuz berdi:", error)
      alert("Rasmni yuklashda xatolik yuz berdi.")
    }
  }

  // Rasmni yangilash
  const handleUpdate = async (imageId: number) => {
    if (!selectedFile || !session?.sessionToken) return
    try {
      await updateImage(session.sessionToken, imageId, selectedFile)
      fetchImages()
      setSelectedFile(null)
      alert("Rasm muvaffaqiyatli yangilandi.")
    } catch (error) {
      console.error("Rasm yangilashda xatolik yuz berdi:", error)
      alert("Rasmni yangilashda xatolik yuz berdi.")
    }
  }

  // Rasmni o'chirish
  const handleDelete = async (imageId: number) => {
    if (!session?.sessionToken) return
    try {
      await deleteImage(session.sessionToken, imageId)
      fetchImages()
      alert("Rasm muvaffaqiyatli o'chirildi.")
    } catch (error) {
      console.error("Rasm o'chirishda xatolik yuz berdi:", error)
      alert("Rasmni o'chirishda xatolik yuz berdi.")
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>

      {/* Rasm yuklash formasi */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Upload New Image</h2>
        <div className="flex items-center gap-4">
          <Input type="file" onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}/>
          <Button onClick={handleUpload} disabled={!selectedFile}>
            <Upload className="mr-2 h-4 w-4"/> Upload
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">All Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            images?.images && images?.images?.length > 0 ?
              images?.images?.map((image) => (
                <Card key={image.id}>
                  <img src={image.url} alt={`Image ${image.id}`} className="w-full h-auto"/>
                  <CardContent>
                    <h3 className="text-lg font-semibold">Image {image.id}</h3>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button onClick={() => handleUpdate(image.id)}><RefreshCw className="h-4 w-4"/> Update</Button>
                    <Button onClick={() => handleDelete(image.id)}><Trash2 className="h-4 w-4"/> Delete</Button>
                  </CardFooter>
                </Card>
              ))
              :
              <></>
          }
        </div>
      </div>
    </div>
  )
}



