"use client";
import { Button } from "@/components/ui/button";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/navigation";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useMakeZodI18nMap } from "@/lib/zodIntl";
import Student from "@/types/student";
import { toast } from "@/components/ui/use-toast";
import NotFound from "@/components/NotFound";
import useApiQuery from "@/lib/useApiQuery";
import useApiMutation from "@/lib/useApiMutation";

const formSchema = z.object({
  phone_number: z.string().min(10).max(20),
  given_name: z.string().min(2).max(50),
  family_name: z.string().min(2).max(50),
  student_number: z.string().min(1).max(10),
});

export default function CreateStudent({
  params: { studentId },
}: {
  params: { studentId: string };
}) {
  const zodErrors = useMakeZodI18nMap();
  z.setErrorMap(zodErrors);
  const t = useTranslations("CreateStudent");
  const tName = useTranslations("names");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone_number: "",
      given_name: "",
      family_name: "",
      student_number: "",
    },
  });
  const router = useRouter();
  const { data, isLoading, isError } = useApiQuery<{
    student: Student;
  }>(`student/${studentId}`, ["student", studentId]);
  const { mutate, isPending } = useApiMutation<{ student: Student }>(
    `student/${studentId}`,
    "PUT",
    ["editStudent", studentId],
    {
      onSuccess: (data) => {
        toast({
          title: t("StudentEdited"),
          description: tName("name", { ...data?.student, parents: "" }),
        });
        router.push("/students");
        form.reset();
      },
    }
  );

  useEffect(() => {
    if (data) {
      form.setValue("given_name", data.student.given_name);
      form.setValue("family_name", data.student.family_name);
      form.setValue("phone_number", data.student.phone_number);
      form.setValue("student_number", data.student.student_number);
    }
  }, [data, form]);

  if (isError) return <NotFound />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-3xl w-2/4 font-bold">{t("EditStudent")}</h1>
        <Link href={"/students"}>
          <Button variant={"secondary"}>{t("back")}</Button>
        </Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => mutate(values as any))}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="given_name"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{t("GivenName")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("GivenName")} {...field} />
                  </FormControl>
                  <FormMessage>
                    {formState.errors.given_name?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="family_name"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{t("FamilyName")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("FamilyName")} {...field} />
                  </FormControl>
                  <FormMessage>
                    {formState.errors.family_name?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{t("PhoneNumber")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("PhoneNumber")} {...field} />
                  </FormControl>
                  <FormMessage>
                    {formState.errors.phone_number?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="student_number"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{t("StudentNumber")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("StudentNumber")} {...field} />
                  </FormControl>
                  <FormMessage>
                    {formState.errors.student_number?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isLoading || isPending}>
            {isPending ? `${t("Submit")}...` : t("Submit")}
          </Button>
        </form>
      </Form>
    </div>
  );
}