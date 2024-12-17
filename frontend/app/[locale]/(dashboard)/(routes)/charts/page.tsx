// "use client";
//
// import { useTranslations } from "next-intl";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Link } from "@/navigation";
// import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
//
// type CardData = {
//   id: number;
//   title: string;
//   description: string;
//   href: string;
// };
//
// const cardData: CardData[] = [
//
//   {
//     id: 1,
//     title: "messages",
//     description: "click here to view messages",
//     href: "/messages",
//   },
//   {
//     id: 2,
//     title: "students",
//     description: "click here to view students",
//     href: "/students",
//   },
//   {
//     id: 4,
//     title: "groups",
//     description: "click here to view groups",
//     href: "/groups",
//   },
//   {
//     id: 3,
//     title: "parents",
//     description: "click here to view parents",
//     href: "/parents",
//   },
//   {
//     id: 5,
//     title: "admins",
//     description: "click here to view admins",
//     href: "/admins",
//   },
//   {
//     id: 6,
//     title: "forms",
//     description: "click here to view forms",
//     href: "/forms",
//   },
// ];
//
// // Mock data for the charts
// const messageData = [
//   { name: "Jan", total: 234, unread: 45 },
//   { name: "Feb", total: 345, unread: 87 },
//   { name: "Mar", total: 289, unread: 56 },
//   { name: "Apr", total: 432, unread: 98 },
//   { name: "May", total: 387, unread: 65 },
//   { name: "Jun", total: 456, unread: 123 },
// ];
//
// const formData = [
//   { name: "Jan", pending: 13, completed: 45 },
//   { name: "Feb", pending: 18, completed: 67 },
//   { name: "Mar", pending: 24, completed: 89 },
//   { name: "Apr", pending: 15, completed: 76 },
//   { name: "May", pending: 19, completed: 92 },
//   { name: "Jun", pending: 22, completed: 105 },
// ];
//
// export default function ChartsPage() {
//   const t = useTranslations("nav");
//   const d = useTranslations("dashboard");
//   return (
//     <div className="space-y-4">
//       <div className="flex flex-row">
//         <h1 className="text-3xl w-2/4 font-bold">{t("charts")}</h1>
//       </div>
//
//       {/* Charts Section */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>{t("message-statistics")}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer
//               config={{
//                 total: {
//                   label: "Total Messages",
//                   color: "hsl(var(--chart-1))",
//                 },
//                 unread: {
//                   label: "Unread Messages",
//                   color: "hsl(var(--chart-2))",
//                 },
//               }}
//               className="h-[300px]"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={messageData}>
//                   <Line
//                     type="monotone"
//                     dataKey="total"
//                     strokeWidth={2}
//                     stroke="var(--color-total)"
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="unread"
//                     strokeWidth={2}
//                     stroke="var(--color-unread)"
//                   />
//                   <ChartTooltip content={<ChartTooltipContent />} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </CardContent>
//         </Card>
//
//         <Card>
//           <CardHeader>
//             <CardTitle>{t("form-statistics")}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer
//               config={{
//                 pending: {
//                   label: "Pending Forms",
//                   color: "hsl(var(--chart-3))",
//                 },
//                 completed: {
//                   label: "Completed Forms",
//                   color: "hsl(var(--chart-4))",
//                 },
//               }}
//               className="h-[300px]"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={formData}>
//                   <Bar
//                     dataKey="pending"
//                     fill="var(--color-pending)"
//                     radius={[4, 4, 0, 0]}
//                   />
//                   <Bar
//                     dataKey="completed"
//                     fill="var(--color-completed)"
//                     radius={[4, 4, 0, 0]}
//                   />
//                   <ChartTooltip content={<ChartTooltipContent />} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </CardContent>
//         </Card>
//       </div>
//
//       {/* Cards Grid Section */}
//       <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
//         {cardData.map((data, index) => (
//           <Link key={index} href={data.href} passHref>
//             <Card className="w-full h-full">
//               <CardHeader className="p-3">
//                 <CardTitle className="text-xl font-medium break-words">
//                   {t(data.title)}
//                 </CardTitle>
//               </CardHeader>
//               <CardFooter className="px-3">
//                 <p className="text-xs text-muted-foreground">
//                   {d(data.description)}
//                 </p>
//               </CardFooter>
//             </Card>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
//

"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/navigation";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type CardData = {
  id: number;
  title: string;
  description: string;
  href: string;
};

const cardData: CardData[] = [
  {
    id: 1,
    title: "messages",
    description: "click here to view messages",
    href: "/messages",
  },
  {
    id: 2,
    title: "students",
    description: "click here to view students",
    href: "/students",
  },
  {
    id: 4,
    title: "groups",
    description: "click here to view groups",
    href: "/groups",
  },
  {
    id: 3,
    title: "parents",
    description: "click here to view parents",
    href: "/parents",
  },
  {
    id: 5,
    title: "admins",
    description: "click here to view admins",
    href: "/admins",
  },
  {
    id: 6,
    title: "forms",
    description: "click here to view forms",
    href: "/forms",
  },
];

// Mock data for the charts
const messageData = [
  { name: "Jan", total: 234, unread: 45 },
  { name: "Feb", total: 345, unread: 87 },
  { name: "Mar", total: 289, unread: 56 },
  { name: "Apr", total: 432, unread: 98 },
  { name: "May", total: 387, unread: 65 },
  { name: "Jun", total: 456, unread: 123 },
];

const formData = [
  { name: "Jan", pending: 13, completed: 45 },
  { name: "Feb", pending: 18, completed: 67 },
  { name: "Mar", pending: 24, completed: 89 },
  { name: "Apr", pending: 15, completed: 76 },
  { name: "May", pending: 19, completed: 92 },
  { name: "Jun", pending: 22, completed: 105 },
];

export default function ChartsPage() {
  const t = useTranslations("nav");
  const d = useTranslations("dashboard");

  return (
    <div className="space-y-4">
      <div className="flex flex-row">
        <h1 className="text-3xl w-2/4 font-bold">{t("charts")}</h1>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("message-statistics")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                total: {
                  label: "Total Messages",
                  color: "hsl(var(--chart-1))",
                },
                unread: {
                  label: "Unread Messages",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={messageData}>
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    strokeWidth={2}
                    stroke="hsl(var(--chart-1))"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="unread"
                    strokeWidth={2}
                    stroke="hsl(var(--chart-2))"
                    dot={false}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Total
                                </span>
                                <span className="font-bold text-muted-foreground">
                                  {payload[0].value}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Unread
                                </span>
                                <span className="font-bold text-muted-foreground">
                                  {payload[1].value}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("form-statistics")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                pending: {
                  label: "Pending Forms",
                  color: "hsl(var(--chart-3))",
                },
                completed: {
                  label: "Completed Forms",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formData}>
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Bar
                    dataKey="pending"
                    fill="hsl(var(--chart-3))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="completed"
                    fill="hsl(var(--chart-4))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Pending
                                </span>
                                <span className="font-bold text-muted-foreground">
                                  {payload[0].value}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Completed
                                </span>
                                <span className="font-bold text-muted-foreground">
                                  {payload[1].value}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cards Grid Section */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
        {cardData.map((data, index) => (
          <Link key={index} href={data.href} passHref>
            <Card className="w-full h-full">
              <CardHeader className="p-3">
                <CardTitle className="text-xl font-medium break-words">
                  {t(data.title)}
                </CardTitle>
              </CardHeader>
              <CardFooter className="px-3">
                <p className="text-xs text-muted-foreground">
                  {d(data.description)}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}





