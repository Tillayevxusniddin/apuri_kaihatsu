// "use client"
// import { useState, useEffect } from "react"
// import { useSession } from "next-auth/react"
// import { createMedia, deleteMedia, updateMedia, getMediaList, getMediaDetail } from "./action"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { toast } from "@/components/ui/use-toast"
//
// export default function MediaPage() {
//   const { data: session } = useSession()
//   const [mediaList, setMediaList] = useState<any[]>([])
//   const [title, setTitle] = useState("")
//   const [description, setDescription] = useState("")
//   const [videoUrl, setVideoUrl] = useState("")
//   const [imageFile, setImageFile] = useState<File | null>(null)
//   const [editingMedia, setEditingMedia] = useState<any | null>(null)
//
//   useEffect(() => {
//     fetchMediaList()
//   }, [session])
//
//   const fetchMediaList = async () => {
//     try {
//       const media = await getMediaList(session?.sessionToken)
//       setMediaList(media)
//     } catch (error) {
//       toast({
//         title: "Xatolik",
//         description: "Media ro'yxatini olishda xatolik yuz berdi.",
//         variant: "destructive",
//       })
//     }
//   }
//
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       if (editingMedia) {
//         await updateMedia(session?.sessionToken, editingMedia.id, imageFile, videoUrl, title, description)
//         toast({ title: "Muvaffaqiyatli", description: "Media yangilandi." })
//       } else {
//         if (!imageFile) throw new Error("Rasm tanlang")
//         await createMedia(session?.sessionToken, imageFile, videoUrl, title, description)
//         toast({ title: "Muvaffaqiyatli", description: "Yangi media yaratildi." })
//       }
//       fetchMediaList()
//       resetForm()
//     } catch (error: any) {
//       toast({
//         title: "Xatolik",
//         description: error.message || "Media bilan ishlashda xatolik yuz berdi.",
//         variant: "destructive",
//       })
//     }
//   }
//
//   const handleDelete = async (id: number) => {
//     try {
//       await deleteMedia(session?.sessionToken, id)
//       toast({ title: "Muvaffaqiyatli", description: "Media o'chirildi." })
//       fetchMediaList()
//     } catch (error) {
//       toast({
//         title: "Xatolik",
//         description: "Media o'chirishda xatolik yuz berdi.",
//         variant: "destructive",
//       })
//     }
//   }
//
//   const handleEdit = async (id: number) => {
//     try {
//       const mediaDetail = await getMediaDetail(session?.sessionToken, id)
//       setEditingMedia(mediaDetail?.media)
//       setTitle(mediaDetail.title)
//       setDescription(mediaDetail.description)
//       setVideoUrl(mediaDetail.videoUrl)
//     } catch (error) {
//       toast({
//         title: "Xatolik",
//         description: "Media ma'lumotlarini olishda xatolik yuz berdi.",
//         variant: "destructive",
//       })
//     }
//   }
//
//   const resetForm = () => {
//     setTitle("")
//     setDescription("")
//     setVideoUrl("")
//     setImageFile(null)
//     setEditingMedia(null)
//   }
//
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Media boshqaruvi</h1>
//
//       <form onSubmit={handleSubmit} className="mb-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>{editingMedia ? "Media yangilash" : "Yangi media yaratish"}</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <Input
//               type="text"
//               placeholder="Sarlavha"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//             <Textarea
//               placeholder="Tavsif"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//             <Input
//               type="url"
//               placeholder="Video URL"
//               value={videoUrl}
//               onChange={(e) => setVideoUrl(e.target.value)}
//               required
//             />
//             <Input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//               required={!editingMedia}
//             />
//           </CardContent>
//           <CardFooter>
//             <Button type="submit">{editingMedia ? "Yangilash" : "Yaratish"}</Button>
//             {editingMedia && (
//               <Button type="button" variant="outline" onClick={resetForm} className="ml-2">
//                 Bekor qilish
//               </Button>
//             )}
//           </CardFooter>
//         </Card>
//       </form>
//
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {mediaList.map((media) => (
//           <Card key={media.id}>
//             <CardHeader>
//               <CardTitle>{media.title}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <img
//                 src={media.imageUrl || "/placeholder.svg"}
//                 alt={media.title}
//                 className="w-full h-48 object-cover mb-2"
//               />
//               <p className="text-sm text-gray-600">{media.description}</p>
//             </CardContent>
//             <CardFooter>
//               <Button variant="outline" onClick={() => handleEdit(media.id)} className="mr-2">
//                 Tahrirlash
//               </Button>
//               <Button variant="destructive" onClick={() => handleDelete(media.id)}>
//                 O'chirish
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }
//

//
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
//   const [imageFile, setImageFile] = useState<File | null>(null);
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
//           imageFile,
//           videoUrl,
//           title,
//           description
//         );
//         toast({ title: "Muvaffaqiyatli", description: "Media yangilandi." });
//       } else {
//         if (!imageFile) throw new Error("Rasm tanlanmagan.");
//         await createMedia(session.sessionToken, imageFile, videoUrl, title, description);
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
//       setTitle(mediaDetail.title);
//       setDescription(mediaDetail.description);
//       setVideoUrl(mediaDetail.videoUrl);
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
//     setImageFile(null);
//     setEditingMedia(null);
//   };
//
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Media boshqaruvi</h1>
//
//       <form onSubmit={handleSubmit} className="mb-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>{editingMedia ? "Media yangilash" : "Yangi media yaratish"}</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <Input
//               type="text"
//               placeholder="Sarlavha"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//             <Textarea
//               placeholder="Tavsif"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//             <Input
//               type="url"
//               placeholder="Video URL"
//               value={videoUrl}
//               onChange={(e) => setVideoUrl(e.target.value)}
//               required
//             />
//             <Input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//               required={!editingMedia}
//             />
//           </CardContent>
//           <CardFooter>
//             <Button type="submit">{editingMedia ? "Yangilash" : "Yaratish"}</Button>
//             {editingMedia && (
//               <Button type="button" variant="outline" onClick={resetForm} className="ml-2">
//                 Bekor qilish
//               </Button>
//             )}
//           </CardFooter>
//         </Card>
//       </form>
//
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {mediaList.map((media) => (
//           <Card key={media.id}>
//             <CardHeader>
//               <CardTitle>{media.title}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <img
//                 src={media.imageUrl || "/placeholder.svg"}
//                 alt={media.title}
//                 className="w-full h-48 object-cover mb-2"
//               />
//               <p className="text-sm text-gray-600">{media.description}</p>
//             </CardContent>
//             <CardFooter>
//               <Button variant="outline" onClick={() => handleEdit(media.id)} className="mr-2">
//                 Tahrirlash
//               </Button>
//               <Button variant="destructive" onClick={() => handleDelete(media.id)}>
//                 O'chirish
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  createMedia,
  deleteMedia,
  updateMedia,
  getMediaList,
  getMediaDetail,
} from "./action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export default function MediaPage() {
  const { data: session } = useSession();
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingMedia, setEditingMedia] = useState<any | null>(null);

  useEffect(() => {
    if (session?.sessionToken) fetchMediaList();
  }, [session]);

  const fetchMediaList = async () => {
    try {
      const media = await getMediaList(session?.sessionToken);
      setMediaList(media);
    } catch (error: any) {
      toast({
        title: "Xatolik",
        description: error.message || "Media ro'yxatini olishda xatolik yuz berdi.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.sessionToken) {
      toast({ title: "Xatolik", description: "Token mavjud emas.", variant: "destructive" });
      return;
    }

    try {
      if (editingMedia) {
        await updateMedia(
          session.sessionToken,
          editingMedia.id,
          imageFile,
          videoUrl,
          title,
          description
        );
        toast({ title: "Muvaffaqiyatli", description: "Media yangilandi." });
      } else {
        if (!imageFile) throw new Error("Rasm tanlanmagan.");
        await createMedia(session.sessionToken, imageFile, videoUrl, title, description);
        toast({ title: "Muvaffaqiyatli", description: "Yangi media yaratildi." });
      }
      fetchMediaList();
      resetForm();
    } catch (error: any) {
      toast({
        title: "Xatolik",
        description: error.message || "Media bilan ishlashda xatolik yuz berdi.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!session?.sessionToken) {
      toast({ title: "Xatolik", description: "Token mavjud emas.", variant: "destructive" });
      return;
    }

    try {
      await deleteMedia(session.sessionToken, id);
      toast({ title: "Muvaffaqiyatli", description: "Media o'chirildi." });
      fetchMediaList();
    } catch (error: any) {
      toast({
        title: "Xatolik",
        description: error.message || "Media o'chirishda xatolik yuz berdi.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (id: number) => {
    if (!session?.sessionToken) {
      toast({ title: "Xatolik", description: "Token mavjud emas.", variant: "destructive" });
      return;
    }

    try {
      const mediaDetail = await getMediaDetail(session.sessionToken, id);
      setEditingMedia(mediaDetail?.media);
      setTitle(mediaDetail.media.title);
      setDescription(mediaDetail.media.description);
      setVideoUrl(mediaDetail.media.videoUrl);
      setImageFile(null); // Faylni bo'sh qoldiramiz
    } catch (error: any) {
      toast({
        title: "Xatolik",
        description: error.message || "Media ma'lumotlarini olishda xatolik yuz berdi.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setImageFile(null);
    setEditingMedia(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Media boshqaruvi</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{editingMedia ? "Media yangilash" : "Yangi media yaratish"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="Sarlavha"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="Tavsif"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Input
              type="url"
              placeholder="Video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              required={!editingMedia} // Yangi yaratishda majburiy, tahrirda emas
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">{editingMedia ? "Yangilash" : "Yaratish"}</Button>
            {editingMedia && (
              <Button type="button" variant="outline" onClick={resetForm} className="ml-2">
                Bekor qilish
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaList.map((media) => (
          <Card key={media.id}>
            <CardHeader>
              <CardTitle>{media.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={media.imageUrl || "/placeholder.svg"}
                alt={media.title}
                className="w-full h-48 object-cover mb-2"
              />
              <p className="text-sm text-gray-600">{media.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => handleEdit(media.id)} className="mr-2">
                Tahrirlash
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(media.id)}>
                O'chirish
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
