// "use client";
//
// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import {
//   createMedia,
//   deleteMedia,
//   updateMedia,
//   getMediaList,
//   getMediaDetail,
// } from "./action";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "@/components/ui/use-toast";
//
// export default function MediaPage() {
//   const { data: session } = useSession();
//   const [mediaList, setMediaList] = useState<any[]>([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [videoUrl, setVideoUrl] = useState("");
//   const [imageFiles, setImageFiles] = useState<File[]>([]);  // Bir nechta rasmni saqlash
//   const [editingMedia, setEditingMedia] = useState<any | null>(null);
//
//   useEffect(() => {
//     if (session?.sessionToken) fetchMediaList();
//   }, [session]);
//
//   const fetchMediaList = async () => {
//     try {
//       const media = await getMediaList(session?.sessionToken);
//       setMediaList(media);
//     } catch (error: any) {
//       toast({
//         title: "Xatolik",
//         description: error.message || "Media ro'yxatini olishda xatolik yuz berdi.",
//         variant: "destructive",
//       });
//     }
//   };
//
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!session?.sessionToken) {
//       toast({ title: "Xatolik", description: "Token mavjud emas.", variant: "destructive" });
//       return;
//     }
//
//     try {
//       if (editingMedia) {
//         await updateMedia(
//           session.sessionToken,
//           editingMedia.id,
//           imageFiles,
//           videoUrl,
//           title,
//           description
//         );
//         toast({ title: "Muvaffaqiyatli", description: "Media yangilandi." });
//       } else {
//         if (imageFiles.length === 0) throw new Error("Rasm tanlanmagan.");
//         await createMedia(session.sessionToken, imageFiles, videoUrl, title, description);
//         toast({ title: "Muvaffaqiyatli", description: "Yangi media yaratildi." });
//       }
//       fetchMediaList();
//       resetForm();
//     } catch (error: any) {
//       toast({
//         title: "Xatolik",
//         description: error.message || "Media bilan ishlashda xatolik yuz berdi.",
//         variant: "destructive",
//       });
//     }
//   };
//
//   const handleDelete = async (id: number) => {
//     if (!session?.sessionToken) {
//       toast({ title: "Xatolik", description: "Token mavjud emas.", variant: "destructive" });
//       return;
//     }
//
//     try {
//       await deleteMedia(session.sessionToken, id);
//       toast({ title: "Muvaffaqiyatli", description: "Media o'chirildi." });
//       fetchMediaList();
//     } catch (error: any) {
//       toast({
//         title: "Xatolik",
//         description: error.message || "Media o'chirishda xatolik yuz berdi.",
//         variant: "destructive",
//       });
//     }
//   };
//
//   const handleEdit = async (id: number) => {
//     if (!session?.sessionToken) {
//       toast({ title: "Xatolik", description: "Token mavjud emas.", variant: "destructive" });
//       return;
//     }
//
//     try {
//       const mediaDetail = await getMediaDetail(session.sessionToken, id);
//       setEditingMedia(mediaDetail?.media);
//       setTitle(mediaDetail.media.title);
//       setDescription(mediaDetail.media.description);
//       setVideoUrl(mediaDetail.media.videoUrl);
//       setImageFiles([]);  // Rasm fayllarini tozalash
//     } catch (error: any) {
//       toast({
//         title: "Xatolik",
//         description: error.message || "Media ma'lumotlarini olishda xatolik yuz berdi.",
//         variant: "destructive",
//       });
//     }
//   };
//
//   const resetForm = () => {
//     setTitle("");
//     setDescription("");
//     setVideoUrl("");
//     setImageFiles([]);
//     setEditingMedia(null);
//   };
//
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Tutorial Controller</h1>
//       <form onSubmit={handleSubmit} className="mb-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>{editingMedia ? "Cards Update" : "A New Card Create"}</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <Input
//               type="text"
//               placeholder="Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//             <Textarea
//               placeholder="Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//             <Input
//               type="url"
//               placeholder="Video URL"
//               value={videoUrl}
//               onChange={(e) => {setVideoUrl(e.target.value)}}
//               required
//             />
//             <Input
//               type="file"
//               accept="image/*"
//               multiple  // Bir nechta rasmni yuklash
//               onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
//               required={!editingMedia} // Yangi yaratish uchun majburiy, tahrirlashda emas
//             />
//           </CardContent>
//           <CardFooter>
//             <Button type="submit">{editingMedia ? "Update" : "Create"}</Button>
//             {editingMedia && (
//               <Button type="button" variant="outline" onClick={resetForm} className="ml-2">
//                 Cancel
//               </Button>
//             )}
//           </CardFooter>
//         </Card>
//       </form>
//
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {mediaList.map((media) => {
//           const images = media.imageUrl.split(",");
//           return(
//             <Card key={media.id}>
//               <CardHeader>
//                 <CardTitle>{media.title}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className={"grid grid-cols-2 gap-3"}>
//                   {
//                     images?.map((image:any) => (
//                       <img
//                         src={image || "/placeholder.svg"}
//                         alt={media.title}
//                         className="w-full h-48 object-cover mb-2"
//                       />
//                     ))
//                   }
//                 </div>
//                 <p className="text-sm text-gray-600">{media.description}</p>
//               </CardContent>
//               <CardFooter>
//                 <Button variant="outline" onClick={() => handleEdit(media.id)} className="mr-2">
//                   Edit
//                 </Button>
//                 <Button variant="destructive" onClick={() => handleDelete(media.id)}>
//                   Delete
//                 </Button>
//               </CardFooter>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// }



"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { createMedia, deleteMedia, updateMedia, getMediaList, getMediaDetail } from "./action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import {useTranslations} from "next-intl";

export default function MediaPage() {
  const { data: session } = useSession()
  const [mediaList, setMediaList] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [editingMedia, setEditingMedia] = useState<any | null>(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const i = useTranslations("tutor")

  useEffect(() => {
    if (session?.sessionToken) fetchMediaList()
  }, [session])

  const fetchMediaList = async () => {
    try {
      const media = await getMediaList(session?.sessionToken)
      setMediaList(media)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while fetching the media list.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.sessionToken) {
      toast({ title: "Error", description: "Token not found.", variant: "destructive" })
      return
    }

    try {
      if (editingMedia) {
        await updateMedia(session.sessionToken, editingMedia.id, imageFiles, videoUrl, title, description)
        toast({ title: "Success", description: "Media updated successfully." })
      } else {
        if (imageFiles.length === 0) throw new Error("No image selected.")
        await createMedia(session.sessionToken, imageFiles, videoUrl, title, description)
        toast({ title: "Success", description: "New media created successfully." })
      }
      fetchMediaList()
      resetForm()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while processing the media.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!session?.sessionToken) {
      toast({ title: "Error", description: "Token not found.", variant: "destructive" })
      return
    }

    try {
      await deleteMedia(session.sessionToken, id)
      toast({ title: "Success", description: "Media deleted successfully." })
      fetchMediaList()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while deleting the media.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = async (id: number) => {
    if (!session?.sessionToken) {
      toast({ title: "Error", description: "Token not found.", variant: "destructive" })
      return
    }

    try {
      const mediaDetail = await getMediaDetail(session.sessionToken, id)
      setEditingMedia(mediaDetail?.media)
      setTitle(mediaDetail.media.title)
      setDescription(mediaDetail.media.description)
      setVideoUrl(mediaDetail.media.videoUrl)
      setImageFiles([])
      setIsFormVisible(true)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while fetching media details.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setVideoUrl("")
    setImageFiles([])
    setEditingMedia(null)
    setIsFormVisible(false)
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{i("tutorialcontroller")}</h1>
        <Button onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible ? i("hideform") : i("addnewtutorial")}
        </Button>
      </div>

      {isFormVisible && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingMedia ? i("updatetutorial") : i("createnewtutorial")}</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  {i("title")}
                </label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  {i("description")}
                </label>
                <Textarea
                  id="description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="videoUrl" className="text-sm font-medium">
                  {i("videourl")}
                </label>
                <Input
                  id="videoUrl"
                  type="url"
                  placeholder="Enter video URL"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="images" className="text-sm font-medium">
                  {i("images")}
                </label>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
                  required={!editingMedia}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit">{editingMedia ? i("update") : i("create")}</Button>
              {editingMedia && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaList.map((media) => {
          const images = media.imageUrl.split(",")
          return (
            <Card key={media.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-semibold truncate">{media.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="aspect-video mb-4 overflow-hidden rounded-md">
                  <img src={images[0] || "/placeholder.svg"} alt={media.title} className="w-full h-full object-cover" />
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">{media.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleEdit(media.id)}>
                  <Edit className="w-4 h-4 mr-2" />
                  {i("edit")}
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(media.id)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  {i("delete")}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

