"use client";

import { useTranslations } from "next-intl";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/navigation";

type IntroData = {
  id: number;
  title: string;
  description: string;
  href: string;
};

const introData: IntroData[] = [
  {
    id: 1,
    title: "Getting Started",
    description: "Learn the basics of the introduction",
    href: "/introduction/introduction/getting-started",
  },
  {
    id: 2,
    title: "Setup",
    description: "Set up your environment and tools",
    href: "/introduction/introduction/setup",
  },
  {
    id: 3,
    title: "Features",
    description: "Explore key features and functionalities",
    href: "/introduction/introduction/features",
  },
];

export default function IntroductionPage() {
  const t = useTranslations("introduction");

  return (
    <div className="space-y-4">
      <div className="flex flex-row">
        <h1 className="text-3xl w-2/4 font-bold">{t("Introduction")}</h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 2xl:grid-cols-6">
        {introData.map((data) => (
          <Link key={data.id} href={data.href} passHref>
            <Card className="w-full h-full">
              <CardHeader className="p-3">
                <CardTitle className="text-3xl font-medium break-words">
                  {t(data.title)}
                </CardTitle>
              </CardHeader>
              <CardFooter className="px-3">
                <p className="text-xs text-muted-foreground">
                  {t(data.description)}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
